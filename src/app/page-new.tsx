"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  SparklesIcon,
  CameraIcon,
  HeartIcon,
  UserGroupIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const router = useRouter();
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    try {
      const visited = localStorage.getItem("visiogram-visited");
      if (visited) {
        setHasVisited(true);
        // If they've visited before, redirect to feed after a short delay
        setTimeout(() => {
          router.push("/feed");
        }, 1000);
      } else {
        // Mark as visited
        localStorage.setItem("visiogram-visited", "true");
      }
    } catch {
      // Handle localStorage errors in SSR
      console.log("localStorage not available");
    }
  }, [router]);

  const handleGetStarted = () => {
    router.push("/feed");
  };

  if (hasVisited) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Redirecting to your feed...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Create{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Amazing AI Art
              </span>
              <br />
              in Seconds
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your imagination into stunning visual art with our
              AI-powered image generation platform. Join thousands of creators
              sharing their masterpieces.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <SparklesIcon className="h-5 w-5 mr-2 inline" />
                Get Started Free
              </button>
              <Link
                href="/create"
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                <CameraIcon className="h-5 w-5 mr-2 inline" />
                Try It Now
              </Link>
            </div>

            {/* Demo Video/Image */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/800/450?random=2"
                  alt="AI Art Demo"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Play demo video"
                  >
                    <PlayIcon className="h-12 w-12 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose VisioGram?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The most powerful and user-friendly AI art creation platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered Creation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced AI models create stunning artwork from your text
                descriptions in seconds
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Social Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share, like, and discover amazing creations from artists
                worldwide
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No technical skills required. Just type your idea and watch the
                magic happen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Gallery */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              See What Others Are Creating
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get inspired by the amazing artwork our community creates daily
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden"
              >
                <Image
                  src={`https://picsum.photos/300/300?random=${i + 20}`}
                  alt={`Sample artwork ${i}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Creating Now
              <ArrowRightIcon className="h-5 w-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
