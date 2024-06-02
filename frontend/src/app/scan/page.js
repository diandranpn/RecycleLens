"use client";
import BackButton from "@/components/atom/backButton";
import FooterMobileView from "@/components/molekul/footerMobileView";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ResultModal from "@/components/molekul/resultModal";

const PhotoUpload = () => {
  const [imageData, setImageData] = useState(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const startVideo = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } catch (err) {
          setError(err);
          console.error("Error accessing camera: ", err);
        }
      } else {
        setError(new Error("Camera access is not supported on this device."));
      }
    };
    startVideo();
  }, [isVideoVisible]);

  const handleCapture = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    const context = canvasElement.getContext("2d");
    context.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    const dataUrl = canvasElement.toDataURL("image/png");
    setImageData(dataUrl);
    setIsVideoVisible(false);
  };

  const handleRetake = () => {
    setImageData(null);
    setIsVideoVisible(true);
    setPrediction(null);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    if (!imageData) {
      alert("Please capture an image first!");
      return;
    }

    try {
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append("image", blob, "photo.png");

      const response = await axios.post(process.env.NEXT_PUBLIC_FLASK_URL + "/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      setPrediction(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="photo-upload">
      <BackButton />
      {error && <div>Error: {error.message}</div>}
      <div className="w-full p-3">
        {isVideoVisible && (
          <video ref={videoRef} className="rounded-lg w-full h-[70vh]"></video>
        )}
      </div>
      {isVideoVisible && (
        <div className="w-full p-3 mb-[20vh]">
          <button
            onClick={handleCapture}
            className="bg-primary text-white py-2 w-full rounded-lg text-xs font-bold"
          >
            Capture
          </button>
        </div>
      )}
      {!isVideoVisible && imageData && (
        <div className="w-full p-3">
          <div className="w-full h-[70vh] flex flex-col justify-center">
            <img src={imageData} alt="Captured" className="rounded-lg w-full" />
          </div>
          <div className="flex justify-around mt-2 mb-[20vh]">
            <button
              onClick={handleRetake}
              className="bg-white text-primary py-2 w-full mx-3 rounded-lg text-xs font-bold border-primary border"
            >
              Retake
            </button>
            <button
              onClick={handleUpload}
              className="bg-primary text-white py-2 w-full mx-3 rounded-lg text-xs font-bold"
            >
              Use Photo
            </button>
          </div>
        </div>
      )}
      {prediction && (
        <ResultModal show={isModalOpen} onClose={closeModal} data={prediction}>
        <div className="w-full p-3">
          <h2>Prediction Results</h2>
          <p>Class: {prediction.predicted_class}</p>
          <p>Probability: {(prediction.probability * 100).toFixed(2)}%</p>
          <ul>
            {prediction.class_probs.map((class_prob) => (
              <li key={class_prob[0]}>
                {class_prob[0]}: {(class_prob[1] * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
        </ResultModal>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <FooterMobileView activePage={"recycleLens"} />
    </div>
  );
};

export default PhotoUpload;
