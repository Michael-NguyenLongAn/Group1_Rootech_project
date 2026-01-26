"use client";
import { useState } from "react";

import Image from "next/image"; //img
import Link from "next/link"; //btn

const IMAGE_DIFFERENCES = [
	{ id: 1, x: 4, y: 20, radius: 30 },
	{ id: 2, x: 120, y: 67, radius: 30 },
	{ id: 3, x: 78, y: 64, radius: 30},
	{ id: 4, x: 143, y: 163, radius: 30 },
	{ id: 5, x: 410, y: 330, radius: 30 },
	{ id: 6, x: 270, y: 170, radius: 30 },
	/*{ id: 7, x: },
	{ id: 8, x: },
	{ id: 9, x: },
	{ id: 10, x: },
	{ id: 11, x: },
	{ id: 12, x: },
	{ id: 13, x: },
	{ id: 14, x: },
	{ id: 15, x: }*/
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
	const [foundIds, setFoundIds] = useState<number[]>([]);
	const [gameState, setGameState] = useState<"Start" | "Playing" | "Won">("Playing");

	const handleClick = (x: number, y: number) => {
		const spot = IMAGE_DIFFERENCES.find(
			(s) => !foundIds.includes(s.id) && isInsideSpot(x, y, s)
		);
	if (spot) {
		const newFound = [...foundIds, spot.id];
		setFoundIds(newFound);
		if (newFound.length === IMAGE.DIFFERENCES.length) {
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
          Spot Clues- misplaced items... missing objects... details of suspect.
        </p>
        <div className = "text-xl font-mono bg-slate-200/80 p-3 rounded-lg text-slate-800">
          ⏱️ Timer: 3:00 |🔍 Clues: <span className = "text-green-400">{foundIds.length}</span>/{IMAGE_DIFFERENCES.length} found
        </div>
      </div>

      {/* Images */}
      <div className = "flex gap-8 justify-center">
        {/* LEFT: Compare (non-clickable) */}
        <div>
          <h3 className = "text-xl font-bold mb-3 text-red-400">📸 Image A
	  </h3>
          <Image
            src = "/spd before.png"
            alt = "Scene before crime"
            width = {450}
            height = {350}
            className = "rounded-2xl shadow-2xl border-4 border-red-900/70"
          />
        </div>

        {/* RIGHT: Answer (clickable) */}
        <div>
          <h3 className = "text-xl font-bold mb-3 text-blue-400">🔍 Image B
	  </h3>
          <div
            className = "relative w-[450px] h-[350px] rounded-2xl shadow-2xl border-4 border-brown-900/70 cursor-crosshair hover: border-4 border-yellow-600/70 transition-all duration-300"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              handleClick(x, y);
            }}
          >
            <Image
              src = "/spd after.png"
              alt = "Scene after crime"
	      width = {450}
	      height = {350}
              className = "rounded-2xl shadow-2xl border-4 border-blue-900/70"
            />
            
            {/* Found clues - pulsing circles */}
            {IMAGE_DIFFERENCES.filter((d) => foundIds.includes(d.id)).map((d) => (
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
      {gameState === "Won" && (
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
