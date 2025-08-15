"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SparklesIcon,
  LightBulbIcon,
  ShareIcon,
  HeartIcon,
  UserGroupIcon,
  BoltIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Generation",
      description:
        "Transform your ideas into stunning visuals using state-of-the-art AI technology.",
    },
    {
      icon: BoltIcon,
      title: "Lightning Fast",
      description:
        "Generate high-quality images in seconds with our optimized GPU infrastructure.",
    },
    {
      icon: ShareIcon,
      title: "Social Features",
      description:
        "Share your creations, get likes and comments, and discover amazing artwork.",
    },
    {
      icon: UserGroupIcon,
      title: "Creative Community",
      description:
        "Join thousands of artists and creators sharing their AI-generated masterpieces.",
    },
  ];

  const showcaseImages = [
    {
      prompt: "A majestic dragon soaring over a mystical forest",
      category: "Fantasy",
    },
    { prompt: "Futuristic cyberpunk cityscape at night", category: "Sci-Fi" },
    { prompt: "Beautiful sunset over rolling hills", category: "Landscape" },
    {
      prompt: "Cute robot making coffee in a cozy kitchen",
      category: "Whimsical",
    },
    {
      prompt: "Abstract geometric patterns in vibrant colors",
      category: "Abstract",
    },
    {
      prompt: "Elegant portrait of a person in Renaissance style",
      category: "Portrait",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % showcaseImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showcaseImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Create Magic
                </span>
                <br />
                <span className="text-gray-800 dark:text-white">with AI</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Transform your imagination into stunning visuals instantly. Join
                millions of creators using AI to bring their wildest ideas to
                life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/create"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Start Creating Free
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </Link>
                <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <HeartIcon className="h-4 w-4 mr-1 text-red-500" />
                  <span>1M+ images created</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1 text-blue-500" />
                  <span>50K+ active creators</span>
                </div>
              </div>
            </div>

            {/* Showcase Carousel */}
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className={`flex transition-transform duration-500 ease-in-out h-full`}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {showcaseImages.map((image, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <Image
                        src={`https://picsum.photos/600/400?random=${index}`}
                        alt={image.prompt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-2">
                          {image.category}
                        </span>
                        <p className="text-white font-medium">{image.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {showcaseImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose VisioGram?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of creative expression with our cutting-edge
              AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                1M+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Images Generated
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Active Creators
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                99%
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of creators and start bringing your ideas to life
            today.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <LightBulbIcon className="h-5 w-5 mr-2" />
            Get Started Now
            <ChevronRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
