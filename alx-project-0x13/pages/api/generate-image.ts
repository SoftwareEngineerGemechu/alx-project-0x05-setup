import type { NextApiRequest, NextApiResponse } from "next";
import { HEIGHT, WIDTH } from "@/constants";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = request.body;

  if (!prompt) {
    return response.status(400).json({ message: "Prompt is required" });
  }

  try {
    const apiResponse = await fetch("https://api.example.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        width: WIDTH,
        height: HEIGHT,
      }),
    });

    if (!apiResponse.ok) {
      return response
        .status(apiResponse.status)
        .json({ message: "Image generation failed" });
    }

    const data = await apiResponse.json();

    return response.status(200).json({
      imageUrl:
        data?.generated_image ||
        "https://via.placeholder.com/600x400?text=Generated+Image",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
