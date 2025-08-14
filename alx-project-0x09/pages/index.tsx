import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    console.log("Generating Image");
    console.log(process.env.NEXT_PUBLIC_GPT_API_KEY);

    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const resp = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!resp.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await resp.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>Image Generator</h1>
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleGenerateImage} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Image"}
      </button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <img src={imageUrl} alt="Generated" width="512" height="512" />
        </div>
      )}
    </main>
  );
}
