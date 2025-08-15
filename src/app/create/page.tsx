"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SparklesIcon,
  PhotoIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const promptExamples = [
    "A magical forest with glowing mushrooms and fireflies",
    "Futuristic robot chef cooking in a high-tech kitchen",
    "Majestic dragon perched on a crystal mountain peak",
    "Underwater city with bioluminescent coral buildings",
    "Steampunk airship floating above Victorian London",
    "Abstract geometric pattern in vibrant neon colors",
  ];

  const moderateContent = async (inputPrompt: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/moderate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
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
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");
    setGeneratedImage(null);

    // Content moderation check
    const isAppropriate = await moderateContent(prompt);
    if (!isAppropriate) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setSuccess("Image generated successfully!");

        // Save to history (in a real app, this would save to database)
        const historyItem = {
          id: Date.now().toString(),
          prompt,
          imageUrl: data.imageUrl,
          timestamp: new Date(),
        };

        try {
          const existingHistory = JSON.parse(
            localStorage.getItem("visiogram-history") || "[]"
          );
          localStorage.setItem(
            "visiogram-history",
            JSON.stringify([historyItem, ...existingHistory])
          );
        } catch (error) {
          console.warn("Failed to save to localStorage:", error);
        }
      } else {
        setError(data.error || "Failed to generate image.");
      }
    } catch (error) {
      setError("Error generating image. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleTryAgain = () => {
    setGeneratedImage(null);
    setSuccess("");
    setError("");
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `visiogram-${Date.now()}.jpg`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Amazing Images
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Describe your vision and watch AI bring it to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
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
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="A majestic dragon soaring over a mystical forest..."
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={4}
                    disabled={isLoading}
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {prompt.length}/500 characters
                    </span>
                    {prompt.length > 400 && (
                      <span className="text-xs text-orange-500">
                        Approaching limit
                      </span>
                    )}
                  </div>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm text-red-700 dark:text-red-400">
                      {error}
                    </span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-700 dark:text-green-400">
                      {success}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Prompt Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Need inspiration? Try these prompts:
              </h3>
              <div className="space-y-2">
                {promptExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left p-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    &ldquo;{example}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Generated Image
              </h3>

              <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                {isLoading ? (
                  <div className="text-center">
                    <ArrowPathIcon className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Creating your masterpiece...
                    </p>
                    <div className="mt-4 flex items-center justify-center">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">
                        Usually takes 10-30 seconds
                      </span>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="w-full h-full relative">
                    <Image
                      src={generatedImage}
                      alt={prompt}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Your generated image will appear here
                    </p>
                  </div>
                )}
              </div>

              {/* Image Actions */}
              {generatedImage && (
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PhotoIcon className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button
                    onClick={handleTryAgain}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Be specific about details you want to see</li>
                <li>
                  • Include style keywords like &ldquo;photorealistic&rdquo;,
                  &ldquo;cartoon&rdquo;, or &ldquo;oil painting&rdquo;
                </li>
                <li>
                  • Mention lighting: &ldquo;dramatic lighting&rdquo;,
                  &ldquo;soft lighting&rdquo;, &ldquo;golden hour&rdquo;
                </li>
                <li>
                  • Add quality modifiers: &ldquo;4K&rdquo;, &ldquo;highly
                  detailed&rdquo;, &ldquo;masterpiece&rdquo;
                </li>
                <li>• Experiment with different artistic styles and mediums</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
