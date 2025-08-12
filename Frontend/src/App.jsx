import React from "react";
import HomePage from "./HomePage";

function App() {
  return (
    <div>

      <HomePage />

      <div className="min-h-screen bg-blue-200 flex items-center justify-center">
        <p className="text-xl">Scroll down for more adventures...</p>
      </div>

      <div className="min-h-screen bg-green-200 flex items-center justify-center">
        <p className="text-xl">Final section here</p>
      </div>
    </div>
  );
}

export default App;
