"use client";
import { useState } from "react";

import Image from "next/image"; //img
import Link from "next/link"; //btn


export default function SpotTheDifference() {
  // 1. Track which differences have been found (using their IDs)
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const totalDifferences = 3; // Change this based on your image

  // 2. Logic to handle clicking a difference
  const handleFound = (id: number) => {
    if (!foundItems.includes(id)) {
      setFoundItems([...foundItems, id]);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      {/* Navigation */}
      <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
        ← Back to Investigation
      </Link>

      <div className="max-w-6xl mx-auto mt-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-widest text-amber-500">
            Case #01: Spot the Flaw
          </h1>
          <p className="text-zinc-400">
            Found: <span className="text-white font-mono text-xl">{foundItems.length} / {totalDifferences}</span>
          </p>
        </header>

        {/* 3. The Game Board */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Side: Original Image */}
          <div className="relative border-2 border-zinc-800 rounded-lg overflow-hidden">
            <p className="absolute top-2 left-2 bg-black/50 px-2 py-1 text-xs uppercase">Original</p>
            <Image 
              src="/images/original.jpg" 
              alt="Original Room" 
              width={800} height={600} 
              className="w-full h-auto"
            />
          </div>

          {/* Right Side: Modified Image (Interactive) */}
          <div className="relative border-2 border-amber-900/30 rounded-lg overflow-hidden cursor-crosshair">
            <p className="absolute top-2 left-2 bg-black/50 px-2 py-1 text-xs uppercase">Find Differences</p>
            
            <Image 
              src="/images/modified.jpg" 
              alt="Modified Room" 
              width={800} height={600} 
              className="w-full h-auto"
            />

            {/* 4. Clickable Hidden Areas (Invisible Buttons) */}
            {/* You will adjust the 'top' and 'left' % to match your image */}
            
            {/* Example Difference 1: The Bloody Blueprint */}
            <button 
              onClick={() => handleFound(1)}
              style={{ top: '25%', left: '40%', width: '10%', height: '10%' }}
              className={`absolute border-2 rounded-full transition-all ${foundItems.includes(1) ? 'border-green-500 bg-green-500/20' : 'border-transparent'}`}
            />

            {/* Example Difference 2: The Missing Lamp */}
            <button 
              onClick={() => handleFound(2)}
              style={{ top: '60%', left: '75%', width: '12%', height: '15%' }}
              className={`absolute border-2 rounded-full transition-all ${foundItems.includes(2) ? 'border-green-500 bg-green-500/20' : 'border-transparent'}`}
            />

            {/* Example Difference 3: The Weapon */}
            <button 
              onClick={() => handleFound(3)}
              style={{ top: '80%', left: '15%', width: '8%', height: '8%' }}
              className={`absolute border-2 rounded-full transition-all ${foundItems.includes(3) ? 'border-green-500 bg-green-500/20' : 'border-transparent'}`}
            />
          </div>
        </div>

        {/* 5. Win Message */}
        {foundItems.length === totalDifferences && (
          <div className="mt-12 p-6 bg-green-900/20 border border-green-500 rounded-xl text-center animate-bounce">
            <h2 className="text-2xl font-bold text-green-400">Case Solved!</h2>
            <p>You found all the inconsistencies in the design.</p>
          </div>
        )}
      </div>
    </main>
  );
}