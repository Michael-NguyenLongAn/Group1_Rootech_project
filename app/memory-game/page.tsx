"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; //img
import Link from "next/link"; //btn

const WEAPONS = ["brick", "knife", "ruler", "screwdriver", "wrench"];

export default function MemoryGamePage() {
  const [cards, setCards] = useState<{ id: number; type: string; flipped: boolean; solved: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [murderWeapon, setMurderWeapon] = useState<string | null>(null);
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");

  // init
  const startGame = () => {
    // 1. Pick a random murder weapon
    const randomWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
    setMurderWeapon(randomWeapon);

    // 2. Create pairs for the 4 weapons & murder weapon
    const otherWeapons = WEAPONS.filter(w => w !== randomWeapon);
    const gameDeck = [
      ...otherWeapons.map(w => ({ type: w, flipped: false, solved: false })),
      ...otherWeapons.map(w => ({ type: w, flipped: false, solved: false })),
      { type: randomWeapon, flipped: false, solved: false } // The extra one
    ];

    // 3. Shuffle
    const shuffledDeck = gameDeck
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setCards(shuffledDeck);
    setFlippedIndices([]);
    setGameState("playing");
  };

  // Handle card clicked
  const handleCardClick = (index: number) => {
    if (gameState !== "playing" || flippedIndices.length === 2 || cards[index].flipped || cards[index].solved) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Check for match when 2 cards are flipped
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].type === cards[second].type) {
        // Match found!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].solved = true;
          matchedCards[second].solved = true;
          setCards(matchedCards);
          setFlippedIndices([]);
        }, 600);
      } else {
        // No match then flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Check for Win, only 1 card left
  useEffect(() => {
    const unsolved = cards.filter(c => !c.solved);
    if (gameState === "playing" && unsolved.length === 1) {
      // The game is over, the last card is the weapon
      setTimeout(() => {
        setGameState("finished");
      }, 500);
    }
  }, [cards, gameState]);

  return (
    //title & description
    <div className="max-w-4xl mx-auto px-6 text-center pb-20">
      <h2 className="text-2xl font-bold mb-4 uppercase text-[#ba8358]">Murder Method Investigation</h2>
      <p className="text-xl italic text-black max-w-2xl mx-auto">
        Every tool has a pair except for the one used in the murder. 
        Match the tools to find the remaining tool, the murder weapon.
      </p>
      <br></br>
    <div className="bg-white/30 p-8 rounded-xl border-2 border-[#ba8358] min-h-[500px] flex flex-col items-center justify-center">

        {/*game component start*/}
        {gameState === "start" && (
          <button onClick={startGame} className="btn-mystery text-2xl px-12 py-4">
            PLAY
          </button>
        )}

        {/*card style when playing*/}
        {gameState === "playing" && (
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`w-24 h-32 md:w-32 md:h-44 cursor-pointer transition-all duration-300 transform ${card.solved ? 'opacity-0 scale-50' : ''}`}>
                <img 
                  src={card.flipped ? `/${card.type}.jpg` : "/wback.jpg"} 
                  alt="card"
                  className="w-full h-full object-contain rounded-lg shadow-md border border-[#ba8358]"/>
              </div>
            ))}
          </div>
        )}

        {/*win condition*/}
        {gameState === "finished" && (
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-3xl font-bold text-[#a91c1b]">EVIDENCE FOUND!</h3>
            <div className="w-48 h-64 border-4 border-[#a91c1b] rounded-lg overflow-hidden bg-white">
              <img src={`/${murderWeapon}.jpg`} alt="Weapon" className="w-full h-full object-contain" />
            </div>
            <p className="text-2xl font-serif font-bold italic">Weapon used was {murderWeapon}</p>
            <button onClick={startGame} className="btn-mystery">REPLAY</button>
          </div>
        )}
      </div>
    </div>
  );
}