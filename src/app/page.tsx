"use client";

import { useState, useEffect } from "react";
import SearchBar, { SearchFilters } from "@/components/SearchBar";
import ImageCard, { GeneratedImage, Comment } from "@/components/ImageCard";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [recommendations, setRecommendations] = useState<GeneratedImage[]>([]);

  // Load initial data and recommendations
  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences: ["landscape", "nature", "futuristic"],
          likedCategories: ["landscape", "urban"],
          limit: 6,
        }),
      });
      const data = await response.json();
      if (data.success) {
        const recommendedImages: GeneratedImage[] = data.recommendations.map(
          (img: {
            id: string;
            prompt: string;
            likes: number;
            timestamp: string;
          }) => ({
            id: img.id,
            url: `https://picsum.photos/400/400?random=${img.id}`, // Placeholder images
            prompt: img.prompt,
            likes: img.likes,
            comments: [],
            timestamp: new Date(img.timestamp),
            isLiked: false,
            isBookmarked: false,
          })
        );
        setRecommendations(recommendedImages);
        setFilteredImages(recommendedImages);
      }
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    }
  };

  const moderateContent = async (prompt: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/moderate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!data.success || !data.isAppropriate) {
        setError(data.message || "Content not appropriate for generation");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Content moderation failed:", error);
      return true; // Allow if moderation fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Content moderation check
    const isAppropriate = await moderateContent(inputText);
    if (!isAppropriate) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        const newImage: GeneratedImage = {
          id: Date.now().toString(),
          url: data.imageUrl,
          prompt: inputText,
          likes: 0,
          comments: [],
          timestamp: new Date(),
          isLiked: false,
          isBookmarked: false,
        };
        setImages(prev => [newImage, ...prev]);
        setFilteredImages(prev => [newImage, ...prev]);
        setInputText("");
        setShowCreateForm(false);
      } else {
        setError(data.error || "Failed to generate image.");
      }
    } catch (error) {
      setError("Error generating image.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string, filters: SearchFilters) => {
    let filtered = [...images, ...recommendations];

    if (query.trim()) {
      filtered = filtered.filter(img =>
        img.prompt.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filters
    if (filters.minLikes) {
      filtered = filtered.filter(img => img.likes >= filters.minLikes!);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "popular":
          return b.likes - a.likes;
        case "recent":
          return b.timestamp.getTime() - a.timestamp.getTime();
        default:
          return 0;
      }
    });

    setFilteredImages(filtered);
  };

  const handleLike = (id: string) => {
    const updateImages = (imgs: GeneratedImage[]) =>
      imgs.map(img =>
        img.id === id
          ? {
              ...img,
              likes: img.isLiked ? img.likes - 1 : img.likes + 1,
              isLiked: !img.isLiked,
            }
          : img
      );

    setImages(updateImages);
    setFilteredImages(updateImages);
    setRecommendations(updateImages);
  };

  const handleComment = (id: string, commentText: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      author: "User", // Replace with actual user name
      timestamp: new Date(),
    };

    const updateImages = (imgs: GeneratedImage[]) =>
      imgs.map(img =>
        img.id === id
          ? {
              ...img,
              comments: [...img.comments, newComment],
            }
          : img
      );

    setImages(updateImages);
    setFilteredImages(updateImages);
    setRecommendations(updateImages);
  };

  const handleShare = async (id: string) => {
    const image = [...images, ...recommendations].find(img => img.id === id);
    if (image && navigator.share) {
      try {
        await navigator.share({
          title: "Check out this AI-generated image!",
          text: `"${image.prompt}" - Generated on VisioGram`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Check out this AI-generated image: "${image?.prompt}" on VisioGram!`
      );
      alert("Link copied to clipboard!");
    }
  };

  const handleBookmark = (id: string) => {
    const updateImages = (imgs: GeneratedImage[]) =>
      imgs.map(img =>
        img.id === id
          ? {
              ...img,
              isBookmarked: !img.isBookmarked,
            }
          : img
      );

    setImages(updateImages);
    setFilteredImages(updateImages);
    setRecommendations(updateImages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Create. Share. Inspire.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your imagination into stunning visuals with AI-powered
            image generation. Join our creative community and discover amazing
            artwork.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Create Button */}
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-full hover:from-blue-500 hover:to-pink-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <PlusIcon className="h-6 w-6" />
            <span>Create New Image</span>
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="max-w-3xl mx-auto mb-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Describe your image
                </label>
                <textarea
                  id="prompt"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="A beautiful sunset over mountains, cinematic lighting, 4K..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="px-8 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg hover:from-blue-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Generating..." : "Generate Image"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 dark:text-gray-600 text-lg">
                {images.length === 0
                  ? "No images yet. Create your first masterpiece!"
                  : "No images match your search."}
              </div>
            </div>
          ) : (
            filteredImages.map(image => (
              <ImageCard
                key={image.id}
                image={image}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onBookmark={handleBookmark}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
