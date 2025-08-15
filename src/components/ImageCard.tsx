"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

interface ImageCardProps {
  image: GeneratedImage;
  onLike: (id: string) => void;
  onComment: (id: string, comment: string) => void;
  onShare: (id: string) => void;
  onBookmark: (id: string) => void;
}

export default function ImageCard({
  image,
  onLike,
  onComment,
  onShare,
  onBookmark,
}: ImageCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(image.id, newComment.trim());
      setNewComment("");
    }
  };

  const formatTimeAgo = (date: Date) => {
    // Use a more stable approach for SSR compatibility
    try {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return "just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch {
      // Fallback for SSR compatibility
      return "recently";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square">
        <Image
          src={image.url}
          alt={image.prompt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(image.id)}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
            >
              {image.isLiked ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
              <span className="text-sm font-medium">{image.likes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
            >
              <ChatBubbleOvalLeftIcon className="h-6 w-6" />
              <span className="text-sm font-medium">
                {image.comments.length}
              </span>
            </button>

            <button
              onClick={() => onShare(image.id)}
              className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors"
              aria-label="Share image"
            >
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>

          <button
            onClick={() => onBookmark(image.id)}
            className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="Bookmark image"
          >
            {image.isBookmarked ? (
              <BookmarkSolidIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Prompt */}
        <div className="mb-2">
          <p className="text-sm text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Prompt:</span> {image.prompt}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {mounted ? formatTimeAgo(image.timestamp) : "recently"}
          </p>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-4 space-y-2">
            {image.comments.map(comment => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {comment.author}
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {comment.text}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {mounted ? formatTimeAgo(comment.timestamp) : "recently"}
                </p>
              </div>
            ))}

            {/* Add comment */}
            <form onSubmit={handleComment} className="flex gap-2 mt-3">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 text-sm p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
