"use client";
import { useState } from "react";

import Image from "next/image"; //img
import Link from "next/link"; //btn

const IMAGE_DIFFERENCES = [
	{ id: 1, x: 32, y: 118, radius: 28 },
	{ id: 2, x: 32, y: 178, radius: 24 },
	{ id: 3, x: 35, y: 286, radius: 20 },
	{ id: 4, x: 25, y: 394, radius: 23 },
	{ id: 5, x: 69, y: 401, radius: 20 },
	{ id: 6, x: 88, y: 292, radius: 10 },
	{ id: 7, x: 114, y: 316, radius: 10 },
	{ id: 8, x: 138, y: 42, radius: 15 },
	{ id: 9, x: 142, y: 209, radius: 12 },
	{ id: 10, x: 132, y: 267, radius: 26 },
	{ id: 11, x: 177, y: 267, radius: 18 },
	{ id: 12, x: 180, y: 400, radius: 20 },
	{ id: 13, x: 219, y: 372, radius: 20 },
	{ id: 14, x: 256, y: 53, radius: 15 },
	{ id: 15, x: 281, y: 200, radius: 12 },
  { id: 16, x: 310, y: 357, radius: 16 },
  { id: 17, x: 289, y: 472, radius: 20 },
  { id: 18, x: 340, y: 436, radius: 16 },
  { id: 19, x: 370, y: 49, radius: 17 },
  { id: 20, x: 377, y: 349, radius: 14 },
  { id: 21, x: 448, y: 136, radius: 30 },
  { id: 22, x: 448, y: 337, radius: 25 }
];

function whatthediff(
	x: number,
	y: number,
	spot: { x: number; y: number; radius: number }
) {
	const dx = x - spot.x;
	const dy = y - spot.y;
	return dx * dx + dy * dy <= spot.radius * spot.radius;
}


export default function SpotTheDifference() {
	const [foundids, setFoundIds] = useState<number[]>([]);
	const [gamestate, setGameState] = useState<"Start" | "Playing" | "Won">("Playing");

  //TODO error
	const handleClick = (x: number, y: number) => {
		const spot = IMAGE_DIFFERENCES.find(
			(s) => !foundids.includes(s.id) && whatthediff(x, y, s)
		);
	if (spot) {
		const newFound = [...foundids, spot.id];
		setFoundIds(newFound);
		if (newFound.length === 15) {
			setGameState("Won");
		}
	}
};

return (
  <main className = "min-h-screen bg-amber-100 text-slate-900 p-8">
    <div className = "bg-amber-100/95 px-6 py-4 rounded-2x1 mb-6 mx-auto max-w-2x1">
      {/* Header */}
      <h1 className = "text-4xl font-bold text-center text-orange-800 drop-shadow-lg">
        🕵️‍♂️ CRIME SCENE INVESTIGATION: TRACE THE CULPRIT!
      </h1>

      {/* Instructions */}
      <div className = "flex flex-col items-center justify-center min-h-[500px] bg-amber-50/95 border-2 border-amber-300 rounded-2x1 p-8 mb-8 shadow-2x1">
        <h2 className = "text-2xl font-bold mb-4 text-slate-900"> Your Mission, Detective:
	</h2>
        <p className = "italic text-black text-lg mb-3 text-center">
          Compare <strong>Image A</strong> with <strong>Image B</strong>.
      	</p>
        <p className = "italic text-black text-lg mb-4 text-center">
          There are a total of <strong>22</strong> differences. Look for at least <strong>15</strong> of them to win the game. Click on <strong>Image B</strong> to begin.
        </p>
        <p className = "italic text-black text-lg mb-4 text-center">
          Spot Clues- misplaced items... missing objects... details of suspect.
        </p>
        <div className = "text-xl font-mono bg-slate-200/80 p-3 rounded-lg text-slate-800">
          🔍 Clues: <span className = "text-green-400">{foundids.length}</span>/{IMAGE_DIFFERENCES.length} found
        </div>
      </div>

      {/* Images */}
      <div className = "flex gap-8 justify-center">
        {/* LEFT: Compare (non-clickable) */}
        <div>
          <h3 className = "text-xl font-bold mb-3 text-red-400">📸 Image A:
	  </h3>
          <Image
            src = "/spd before.png"
            alt = "Scene before crime"
            width = {500}
            height = {400}
            className = "rounded-2xl shadow-2xl border-4 border-red-900/70"
          />
        </div>

        {/* RIGHT: Answer (clickable) */}
        <div>
          <h3 className = "text-xl font-bold mb-3 text-blue-400">🔍 Image B:
	  </h3>
          <div
            className = "relative w-[500px] h-[400px] rounded-2xl shadow-2xl border-4 border-brown-900/70 cursor-crosshair hover: border-4 border-yellow-600/70 transition-all duration-300"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              //TODO error
              handleClick(x, y);
            }}
          >
            <Image
              src = "/spd after.png"
              alt = "Scene after crime"
	            width = {500}
	            height = {400}
              className = "rounded-2xl shadow-2xl border-4 border-blue-900/70"
            />
            
            {/* Found clues - pulsing circles */}
            {IMAGE_DIFFERENCES.filter((d) => foundids.includes(d.id)).map((d) => (
              <div
                key = {d.id}
                className = "absolute border-4 border-emerald-400 bg-emerald-400/50 rounded-full animate-pulse shadow-lg pointer-events-none"
                style = {{
                  left: `${d.x - d.radius}px`,
                  top: `${d.y - d.radius}px`,
                  width: `${d.radius * 2}px`,
                  height: `${d.radius * 2}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Win screen */}
      {gamestate === "Won" && (
        <div className = "mt-12 text-center p-12 bg-gradient-to-r from-emerald-900/80 to-green-900/80 border-4 border-emerald-400 rounded-3xl backdrop-blur-md shadow-2xl">
          <h2 className = "text-4xl font-bold mb-6 text-emerald-400">🎉 Case Closed!
	  </h2>
          <p className = "text-2xl mb-8">Suspect profile generated from your clues.
	  </p>
          <button
            className = "px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-xl font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-emerald-400"
            onClick = {() => {
              setFoundIds([]);
              setGameState("Playing");
            }}
          >
            🔄 New Investigation
          </button>
        </div>
      )}
    </div>
  </main>
);

}