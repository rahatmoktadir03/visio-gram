import { NextResponse } from "next/server";

// List of inappropriate keywords and phrases
const INAPPROPRIATE_KEYWORDS = [
  "violence",
  "gore",
  "blood",
  "murder",
  "kill",
  "death",
  "weapon",
  "gun",
  "knife",
  "sexual",
  "nude",
  "naked",
  "porn",
  "sex",
  "erotic",
  "adult",
  "hate",
  "racist",
  "discrimination",
  "offensive",
  "slur",
  "drug",
  "cocaine",
  "heroin",
  "marijuana",
  "illegal",
  "self-harm",
  "suicide",
  "cutting",
  "depression",
];

// More sophisticated content patterns
const INAPPROPRIATE_PATTERNS = [
  /\b(kill|murder|die|death)\s+(someone|people|person)\b/i,
  /\b(naked|nude|topless|bottomless)\s+(person|people|woman|man|child)\b/i,
  /\b(make|create|generate)\s+(weapon|bomb|drug)\b/i,
  /\bhow\s+to\s+(kill|hurt|harm)\b/i,
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    const lowercasePrompt = prompt.toLowerCase();

    // Check for inappropriate keywords
    const foundKeywords = INAPPROPRIATE_KEYWORDS.filter(keyword =>
      lowercasePrompt.includes(keyword)
    );

    // Check for inappropriate patterns
    const foundPatterns = INAPPROPRIATE_PATTERNS.filter(pattern =>
      pattern.test(prompt)
    );

    if (foundKeywords.length > 0 || foundPatterns.length > 0) {
      return NextResponse.json({
        success: false,
        isAppropriate: false,
        reasons: [
          ...foundKeywords.map(
            keyword => `Contains inappropriate keyword: ${keyword}`
          ),
          ...foundPatterns.map(
            (_, index) => `Matches inappropriate pattern ${index + 1}`
          ),
        ],
        message:
          "This prompt contains inappropriate content and cannot be processed.",
      });
    }

    // Additional length and complexity checks
    if (prompt.length > 500) {
      return NextResponse.json({
        success: false,
        isAppropriate: false,
        reasons: ["Prompt is too long (max 500 characters)"],
        message: "Please shorten your prompt.",
      });
    }

    // Check for spam patterns (excessive punctuation, all caps, etc.)
    const excessivePunctuation = /[!?]{3,}/.test(prompt);
    const mostlyCapital =
      prompt.length > 10 &&
      (prompt.match(/[A-Z]/g) || []).length / prompt.length > 0.7;

    if (excessivePunctuation || mostlyCapital) {
      return NextResponse.json({
        success: false,
        isAppropriate: false,
        reasons: ["Prompt appears to be spam or excessive"],
        message: "Please use a more natural writing style.",
      });
    }

    return NextResponse.json({
      success: true,
      isAppropriate: true,
      message: "Prompt is appropriate for image generation.",
    });
  } catch (error) {
    console.error("Error in content moderation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to moderate content" },
      { status: 500 }
    );
  }
}
