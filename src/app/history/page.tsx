"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ClockIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface HistoryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: Date;
  isLiked: boolean;
  likes: number;
  downloads: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "liked">(
    "recent"
  );

  // Mock data - in a real app, this would come from your database
  useEffect(() => {
    const mockHistory: HistoryItem[] = [
      {
        id: "1",
        prompt: "A majestic dragon soaring over mountains",
        imageUrl: "https://picsum.photos/400/400?random=1",
        timestamp: new Date("2025-01-15T10:30:00"),
        isLiked: true,
        likes: 15,
        downloads: 3,
      },
      {
        id: "2",
        prompt: "Futuristic cyberpunk cityscape at night",
        imageUrl: "https://picsum.photos/400/400?random=2",
        timestamp: new Date("2025-01-14T15:45:00"),
        isLiked: false,
        likes: 8,
        downloads: 1,
      },
      {
        id: "3",
        prompt: "Beautiful sunset over rolling hills",
        imageUrl: "https://picsum.photos/400/400?random=3",
        timestamp: new Date("2025-01-13T09:15:00"),
        isLiked: true,
        likes: 22,
        downloads: 5,
      },
    ];
    setHistory(mockHistory);
    setFilteredHistory(mockHistory);
  }, []);

  // Filter and sort history
  useEffect(() => {
    const filtered = history.filter(item =>
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes - a.likes;
        case "liked":
          return (b.isLiked ? 1 : 0) - (a.isLiked ? 1 : 0);
        case "recent":
        default:
          return b.timestamp.getTime() - a.timestamp.getTime();
      }
    });

    setFilteredHistory(filtered);
  }, [history, searchQuery, sortBy]);

  const handleLike = (id: string) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (
      confirm("Are you sure you want to delete this image from your history?")
    ) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleShare = (item: HistoryItem) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out my AI-generated image!",
        text: `"${item.prompt}" - Created with VisioGram`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `Check out my AI-generated image: "${item.prompt}" - Created with VisioGram`
      );
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = (item: HistoryItem) => {
    // In a real app, this would download the actual image
    const link = document.createElement("a");
    link.href = item.imageUrl;
    link.download = `visiogram-${item.id}.jpg`;
    link.click();
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Creation History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all your AI-generated images
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search your prompts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sort images by"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="liked">Liked</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{history.length} total images</span>
              </div>
              <div className="flex items-center">
                <HeartIcon className="h-4 w-4 mr-1" />
                <span>{history.filter(item => item.isLiked).length} liked</span>
              </div>
              <div className="flex items-center">
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                <span>
                  {history.reduce((acc, item) => acc + item.downloads, 0)}{" "}
                  downloads
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* History Grid */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-16">
            <ClockIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchQuery
                ? "No matching images found"
                : "No images in your history yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start creating some amazing images!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHistory.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-square">
                  <Image
                    src={item.imageUrl}
                    alt={item.prompt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      aria-label={item.isLiked ? "Unlike" : "Like"}
                    >
                      {item.isLiked ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(item)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Share"
                    >
                      <ShareIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDownload(item)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Download"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-red-500/50 transition-colors"
                      aria-label="Delete"
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-gray-900 dark:text-white font-medium mb-2 line-clamp-2">
                    {item.prompt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatDate(item.timestamp)}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <HeartIcon className="h-3 w-3 mr-1" />
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
                        {item.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
