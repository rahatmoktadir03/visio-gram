import { NextResponse } from "next/server";

// Simulated user data and image database
// In a real app, this would come from your database
interface ImageData {
  id: string;
  prompt: string;
  likes: number;
  tags: string[];
  category: string;
  timestamp: Date;
}

// Sample data for demonstration
const sampleImages: ImageData[] = [
  {
    id: "1",
    prompt: "beautiful sunset over mountains",
    likes: 45,
    tags: ["landscape", "sunset", "mountains", "nature"],
    category: "landscape",
    timestamp: new Date("2025-01-10"),
  },
  {
    id: "2",
    prompt: "futuristic cityscape at night",
    likes: 78,
    tags: ["cityscape", "futuristic", "night", "cyberpunk"],
    category: "urban",
    timestamp: new Date("2025-01-12"),
  },
  {
    id: "3",
    prompt: "cute cat wearing sunglasses",
    likes: 92,
    tags: ["cat", "cute", "animal", "funny"],
    category: "animals",
    timestamp: new Date("2025-01-14"),
  },
];

function calculateSimilarity(tags1: string[], tags2: string[]): number {
  const intersection = tags1.filter(tag => tags2.includes(tag));
  const union = [...new Set([...tags1, ...tags2])];
  return intersection.length / union.length;
}

function getPopularityScore(likes: number, daysOld: number): number {
  // Decay factor for older content
  const decayFactor = Math.exp(-daysOld / 30); // 30-day half-life
  return likes * decayFactor;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userPreferences = [],
      recentPrompts = [],
      likedCategories = [],
      limit = 10,
    } = body;

    // In a real app, you'd fetch user's interaction history from database
    const userInterests = [
      ...userPreferences,
      ...recentPrompts,
      ...likedCategories,
    ];

    // Score each image based on multiple factors
    const scoredImages = sampleImages.map(image => {
      let score = 0;

      // 1. Category preference matching
      if (likedCategories.includes(image.category)) {
        score += 0.3;
      }

      // 2. Tag similarity to user interests
      if (userInterests.length > 0) {
        const similarity = calculateSimilarity(image.tags, userInterests);
        score += similarity * 0.4;
      }

      // 3. Popularity score (likes with time decay)
      const daysOld = Math.floor(
        (Date.now() - image.timestamp.getTime()) / (1000 * 60 * 60 * 24)
      );
      const popularityScore = getPopularityScore(image.likes, daysOld);
      score += Math.min(popularityScore / 100, 0.2); // Normalize and cap at 0.2

      // 4. Recency bonus
      if (daysOld < 7) {
        score += 0.1;
      }

      return {
        ...image,
        score: Math.round(score * 100) / 100,
      };
    });

    // Sort by score and apply diversity
    let recommendations = scoredImages
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Ensure category diversity (no more than 40% from same category)
    const categoryCount: { [key: string]: number } = {};
    const maxPerCategory = Math.ceil(limit * 0.4);

    recommendations = recommendations.filter(image => {
      const count = categoryCount[image.category] || 0;
      if (count < maxPerCategory) {
        categoryCount[image.category] = count + 1;
        return true;
      }
      return false;
    });

    // Fill remaining slots with popular content if needed
    if (recommendations.length < limit) {
      const remaining = sampleImages
        .filter(img => !recommendations.find(rec => rec.id === img.id))
        .sort((a, b) => b.likes - a.likes)
        .slice(0, limit - recommendations.length)
        .map(img => ({ ...img, score: 0 })); // Add default score

      recommendations = [...recommendations, ...remaining];
    }

    return NextResponse.json({
      success: true,
      recommendations: recommendations.map(({ score, ...image }) => ({
        ...image,
        recommendationScore: score,
      })),
      metadata: {
        totalRecommendations: recommendations.length,
        userInterests,
        diversityApplied: true,
      },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
