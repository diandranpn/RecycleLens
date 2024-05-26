import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-4 left-4 p-2  hover:bg-gray-700 text-black bg-white rounded-full shadow-lg z-[1000] shadow-md"
    >
      <FaArrowLeft size={24} />
    </button>
  );
};

export default BackButton;
