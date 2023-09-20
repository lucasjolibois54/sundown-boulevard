"use client";

import { useState } from "react";

export default function Basket() {
  console.log("I am in the basket");
  const [modalVisible, setModalVisible] = useState(false);

  function hideModal() {
    setModalVisible(false);
  }

  return (
    <div>
      {modalVisible && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex w-1/2 bg-white text-dark-purple shadow-md">
            <button
              className="h-8 w-24 rounded-lg border-2 border-gray-300 text-xs text-dark-purple"
              onClick={hideModal}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
