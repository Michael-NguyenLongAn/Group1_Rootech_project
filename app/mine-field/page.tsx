"use client";

import { useState } from "react";
import Image from "next/image"; //img
import Link from "next/link"; //btn

// The sequence of grid indices the user must click (1 to 13)
const CORRECT_PATH = [24, 23, 22, 21, 15, 10, 5, 6, 12, 13, 8, 9, 4];
/** correct path sequence
[ 0, 0, 0, 0,13,
  7, 8, 0,11,12,
  6, 0, 9,10, 0,
  5, 0, 0, 0, 0,
  0, 4, 3, 2, 1]
 */

export default function MinefieldPage() {
  const [gameState, setGameState] = useState<"start" | "playing" | "won" | "lost">("start");
  const [step, setStep] = useState(0); // Tracks progress in CORRECT_PATH
  const [correctIndices, setCorrectIndices] = useState<number[]>([]); // Indices to turn red

  const startGame = () => {
    setGameState("playing");
    setStep(0);
    setCorrectIndices([]);
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== "playing") return;

    if (index === CORRECT_PATH[step]) {
      // Correct click!
      const updatedCorrect = [...correctIndices, index];
      setCorrectIndices(updatedCorrect);
      
      if (step === CORRECT_PATH.length - 1) {
        setGameState("won");
      } else {
        setStep(step + 1);
      }
    } else {
      // Wrong click
      setGameState("lost");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 text-center pb-20">
      {/* Description Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold uppercase text-[#a91c1b] mb-4">
          Crime Scene Navigation
        </h2>
        <p className="text-xl italic text-black max-w-2xl mx-auto">
          Follow the path that the murderer took: memorise the path given then click on the boxes in order to escape.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[500px] bg-white/30 p-8 rounded-2xl border-2 border-[#ba8358] shadow-lg">
        
        {/* START PORTION */}
        {gameState === "start" && (
          <div className="flex flex-col items-center space-y-6">
            <div className="border-4 border-[#ba8358] rounded-lg overflow-hidden bg-white shadow-xl">
              {/* Ensure pathans.png is in your /public folder */}
              <img src="/pathans.png" alt="Path Answer" className="max-w-xs md:max-w-md h-auto" />
            </div>
            <button onClick={startGame} className="btn-mystery text-2xl px-12 py-4">
              START
            </button>
          </div>
        )}

        {/* PLAYING PORTION (5x5 GRID) */}
        {gameState === "playing" && (
          <div className="grid grid-cols-5 gap-2 w-full max-w-[400px]">
            {Array.from({ length: 25 }).map((_, i) => {
              const isMarkedCorrect = correctIndices.includes(i);
              
              return (
                <div
                  key={i}
                  onClick={() => handleSquareClick(i)}
                  className={`aspect-square border-2 border-[#ba8358] cursor-pointer transition-all duration-200 rounded-sm
                    ${isMarkedCorrect 
                      ? "bg-[#a91c1b] shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]" 
                      : "bg-[#ba8358]/20 hover:bg-[#ba8358]/40"
                    }
                  `}
                >
                </div>
              );
            })}
          </div>
        )}

        {/* LOSE CONDITION */}
        {gameState === "lost" && (
          <div className="flex flex-col items-center space-y-6 animate-pulse">
            <img src="/exploded.png" alt="Exploded" className="w-64 h-auto" />
            <h3 className="text-3xl font-bold text-[#a91c1b]">ALARM TRIGGERED!</h3>
            <button onClick={() => setGameState("start")} className="btn-mystery">
              REPLAY
            </button>
          </div>
        )}

        {/* WIN CONDITION */}
        {gameState === "won" && (
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white p-8 border-4 border-[#ba8358] rounded-lg shadow-2xl">
              <h3 className="text-4xl font-serif font-bold text-[#a91c1b] mb-4">
                EVIDENCE FOUND!
              </h3>
              <p className="text-xl font-bold text-black uppercase tracking-widest">
                Location & route of murder uncovered.
              </p>
            </div>
            <button onClick={() => setGameState("start")} className="btn-mystery mt-6">
              REPLAY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}