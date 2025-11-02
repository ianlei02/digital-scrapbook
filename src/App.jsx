import React, { useState } from "react";
import BookContainer from "@/components/BookContainer";
import paperTexture from "@/assets/paper-texture.jpg";
import CustomLanyard from "@/components/CustomLanyard";

const App = () => {
  const [showLanyard, setShowLanyard] = useState(false);

  return (
    <div
      className="overflow-hidden min-h-screen bg-cover bg-right relative"
      style={{ backgroundImage: `url(${paperTexture})` }}
    >
      <BookContainer />

      <button
        onClick={() => setShowLanyard(prev => !prev)}
        className="fixed top-5 left-5 z-20 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-500 transition"
      >
        {showLanyard ? "Hide ID" : "Show ID"}
      </button>

      {showLanyard && <CustomLanyard />}
    </div>
  );
};

export default App;
