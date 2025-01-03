//import { NextResponse } from "next/server";
//import modal

//export async function POST(request: Request) {
//try {
//const body = await request.json();
//const { text } = body;

//if (!text) {
//return NextResponse.json(
//{ success: false, error: "Text prompt is required" },
//{ status: 400 }
//);
//}

// Call the Modal function for image generation
//const response = await modal.call("image-generation", { prompt: text });

//if (response.success) {
//return NextResponse.json({
//success: true,
//imageUrl: response.data.imageUrl,
//message: "Image generated successfully",
//});
//} else {
//return NextResponse.json(
//{ success: false, error: "Failed to generate image" },
//{ status: 500 }
//);
//}
//} catch (error) {
//console.error("Error generating image:", error);
//return NextResponse.json(
//{ success: false, error: "Failed to process request" },
//{ status: 500 }
//);
//}
//}
