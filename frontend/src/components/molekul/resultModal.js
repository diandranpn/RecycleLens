import React from "react";
import { FaRecycle } from "react-icons/fa";

const ResultModal = ({ show, onClose, children, data }) => {
  if (!show) {
    return null;
  }

  const isRecyclable =
    data?.predicted_class === "Aluminium" ||
    data?.predicted_class === "Carton" ||
    data?.predicted_class === "E-waste" ||
    data?.predicted_class === "Glass" ||
    data?.predicted_class === "Paper_and_Cardboard" ||
    data?.predicted_class === "Plastics" ||
    data?.predicted_class === "Textiles";

  return (
    <div
      className={`${
        isRecyclable ? "bg-[#21744E]" : "bg-[#DB0000]"
      } absolute top-0 bottom-0 w-screen h-screen z-[950]`}
    >
      <div className="bg-white shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.3)] rounded-lg absolute bottom-0 min-h-[75vh] w-full">
        <div className="font-bold mx-auto text-black text-3xl text-center m-5">
          {data?.predicted_class}
        </div>
        <div className="flex w-full justify-center flex-col text-xl items-center">
          <div className="flex justify-center items-center">
            <FaRecycle />
            <p className="font-bold m-3">
              {isRecyclable ? "RECYCLABLE" : "UNRECYCLABLE"}
            </p>
          </div>
          <p className="text-black text-justify p-5">
            {isRecyclable
              ? "Sampah tersebut merupakan jenis sampah yang dapat didaur ulang. Jangan lupa untuk memilah sampah sesuai dengan kategorinya dan buang sampah sesuai pada tempatnya, ya!"
              : "Sampah tersebut merupakan jenis sampah yang tidak dapat didaur ulang. Jangan lupa untuk memilah sampah sesuai dengan kategorinya dan buang sampah sesuai pada tempatnya, ya!"}
          </p>
        </div>
        {data?.class_probs && (
          <div className="text-left p-5">
            <p className="font-bold">Details:</p>
            <ul className="list-disc pl-5">
              {data.class_probs.map((row, index) => (
                <li key={index}>
                  <span className="font-bold">{row[0]}:</span>{" "}
                  {parseFloat(row[1]).toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
