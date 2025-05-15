// MemeMint MVP - React Frontend (with basic Meme Editor)

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function MemeEditor() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
      };
    };
    if (file) reader.readAsDataURL(file);
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (image) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.font = "40px Impact";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";

      // Top text
      ctx.fillText(topText, canvas.width / 2, 50);
      ctx.strokeText(topText, canvas.width / 2, 50);

      // Bottom text
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    }
  };

  const handleDownload = () => {
    drawMeme();
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 MemeMint: Meme Generator</h1>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      <div className="mb-2">
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <Button onClick={handleDownload} className="my-4">Download Meme</Button>
      <canvas ref={canvasRef} className="w-full border rounded shadow" />
    </div>
  );
}
