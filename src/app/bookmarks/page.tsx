"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookmarkIcon,
  HeartIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface BookmarkedImage {
  id: string;
  url: string;
  prompt: string;
  likes: number;
  timestamp: Date;
  isLiked: boolean;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedImage[]>([
    {
      id: "1",
      url: "https://picsum.photos/400/400?random=1",
      prompt: "A magical forest with glowing mushrooms",
      likes: 42,
      timestamp: new Date("2025-01-15T10:30:00"),
      isLiked: true,
    },
    {
      id: "2",
      url: "https://picsum.photos/400/400?random=2",
      prompt: "Futuristic robot in neon cityscape",
      likes: 78,
      timestamp: new Date("2025-01-14T15:45:00"),
      isLiked: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const handleToggleLike = (id: string) => {
    setBookmarks(prev =>
      prev.map(bookmark =>
        bookmark.id === id
          ? {
              ...bookmark,
              isLiked: !bookmark.isLiked,
              likes: bookmark.isLiked ? bookmark.likes - 1 : bookmark.likes + 1,
            }
          : bookmark
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            My Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your saved AI-generated images
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <BookmarkIcon className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookmarks.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Bookmarks
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookmarks.filter(b => b.isLiked).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Liked
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <MagnifyingGlassIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredBookmarks.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Found
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-12">
            <BookmarkIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "No bookmarks found" : "No bookmarks yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Start bookmarking images to see them here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <div className="relative aspect-square">
                  <Image
                    src={bookmark.url}
                    alt={bookmark.prompt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-3 line-clamp-2">
                    <span className="font-semibold">Prompt:</span>{" "}
                    {bookmark.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleToggleLike(bookmark.id)}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                      >
                        {bookmark.isLiked ? (
                          <HeartSolidIcon className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                        <span className="text-sm">{bookmark.likes}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove bookmark"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
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
