"use client"
import React, { useState, useRef, useEffect } from 'react';

const PhotoUpload = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };
    startVideo();
  }, []);

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setImageData(dataUrl);
  };

  const handleUpload = async () => {
    if (!imageData) {
      alert("Please capture an image first!");
      return;
    }

    const blob = await (await fetch(imageData)).blob();
    const formData = new FormData();
    formData.append('file', blob, 'photo.png');

    try {
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="photo-upload">
      <h2>Take a Photo</h2>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }}></video>
      <button onClick={handleCapture}>Capture</button>
      {imageData && (
        <div>
          <img src={imageData} alt="Captured" style={{ width: '100%', maxWidth: '400px' }} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300"></canvas>
    </div>
  );
};

export default PhotoUpload;
