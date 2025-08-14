import React from "react";
import { GeneratedImageProps } from "@/interfaces";

const ImageCard: React.FC<GeneratedImageProps> = ({ imageUrl, prompt, width = "512px", height = "512px", action }) => {
    return (
        <div className="mt-6 text-center">
            <img
                src={imageUrl}
                alt={prompt}
                width={parseInt(width)}
                height={parseInt(height)}
                className="mx-auto rounded-lg shadow-lg"
            />
            <button
                onClick={() => action(imageUrl)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Use this image
            </button>
        </div>
    );
};

export default ImageCard;
