"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserIcon,
  CameraIcon,
  HeartIcon,
  BookmarkIcon,
  CalendarIcon,
  PencilIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

interface UserStats {
  imagesGenerated: number;
  totalLikes: number;
  totalBookmarks: number;
  joinDate: Date;
}

export default function ProfilePage() {
  const [user] = useState({
    name: "Alex Chen",
    username: "@alexchen",
    bio: "AI art enthusiast and digital creator. Love exploring the intersection of technology and creativity.",
    avatar: "https://picsum.photos/150/150?random=user",
    coverImage: "https://picsum.photos/800/200?random=cover",
    stats: {
      imagesGenerated: 127,
      totalLikes: 2849,
      totalBookmarks: 94,
      joinDate: new Date("2024-03-15"),
    } as UserStats,
  });

  const [recentImages] = useState([
    {
      id: "1",
      url: "https://picsum.photos/300/300?random=1",
      prompt: "Cyberpunk city with neon lights",
      likes: 45,
      timestamp: new Date("2025-01-15T10:30:00"),
    },
    {
      id: "2",
      url: "https://picsum.photos/300/300?random=2",
      prompt: "Magical forest with fairy lights",
      likes: 62,
      timestamp: new Date("2025-01-14T15:45:00"),
    },
    {
      id: "3",
      url: "https://picsum.photos/300/300?random=3",
      prompt: "Space station orbiting Earth",
      likes: 38,
      timestamp: new Date("2025-01-13T09:20:00"),
    },
    {
      id: "4",
      url: "https://picsum.photos/300/300?random=4",
      prompt: "Underwater coral garden",
      likes: 71,
      timestamp: new Date("2025-01-12T16:10:00"),
    },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mb-8 overflow-hidden">
          <Image
            src={user.coverImage}
            alt="Cover"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Edit Button */}
          <button
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            aria-label="Edit cover image"
          >
            <PencilIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <button
                className="absolute bottom-0 right-0 p-1.5 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                aria-label="Change profile picture"
              >
                <CameraIcon className="h-4 w-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-purple-600 dark:text-purple-400 font-medium">
                {user.username}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md">
                {user.bio}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Joined {formatDate(user.stats.joinDate)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <PencilIcon className="h-4 w-4 mr-2 inline" />
                Edit Profile
              </button>
              <button
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label="Settings"
              >
                <CogIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <CameraIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.stats.imagesGenerated}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Images</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <HeartIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.stats.totalLikes.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <BookmarkIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.stats.totalBookmarks}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bookmarks
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
            <UserIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              1.2K
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Followers
            </p>
          </div>
        </div>

        {/* Recent Images */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Creations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentImages.map(image => (
              <div key={image.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={image.url}
                    alt={image.prompt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <HeartIcon className="h-4 w-4" />
                    <span className="text-sm">{image.likes}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {image.prompt}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View All Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
