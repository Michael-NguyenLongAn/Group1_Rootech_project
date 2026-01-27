"use client";

import { useState, useEffect } from "react";

export default function KeepTalkingPage() {
  const SECRET_CODE = "1245"; // Code on images
  const INITIAL_TIME = 120; // timer

  const [gameState, setGameState] = useState<"start" | "playing" | "won" | "lost">("start");
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [input, setInput] = useState("");
  const [activeClue, setActiveClue] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Timer Logic
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("lost");
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1000 is the delay in ms

    return () => clearInterval(timer); // stop the timer from running
  }, [gameState]); // run only when gameState changes
    // Checking the answer
  const handleUnlock = () => {
    if (input === SECRET_CODE) {
      setGameState("won");
      setErrorMessage("");
    } else {
      setErrorMessage("ACCESS DENIED: INVALID CODE SEQUENCE");
      setInput("");
      setTimeout(() => setErrorMessage(""), 2000); // make error message disappear after 2s
    }
  };
    // Reset game
  const resetGame = () => {
    setGameState("start");
    setTimeLeft(INITIAL_TIME);
    setInput("");
    setActiveClue(null);
    setErrorMessage("");
  }; // tba

    // Clues to add
  const clues = [
    { id: 1, src: "/clue1.JPG", hint: "In a world of divided light, look where the sun cannot reach. Stand tall in the void before the first step is taken." },
    { id: 2, src: "/clue2.JPG", hint: "Nature mimics what we count. Follow the curve of the frozen reach where the white sky meets the wood." },
    { id: 3, src: "/clue3.JPG", hint: "A beacon in the dark reveals more than the path. Behind the leaves, the light holds a steady square." },
    { id: 4, src: "/clue4.JPG", hint: "The music plays on, but the rhythm is caught on the edge. Seek the pillar that stays still while the world spins by." },
  ];
    // Turn seconds into clock-like format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
    // Main
  return (
    <div className="max-w-4xl mx-auto px-6 text-center pb-20">
      <div className="mb-8 mt-10">
        <h2 className="text-2xl font-bold mb-4 uppercase text-[#ba8358]">
          {`Security Override: Open the door`}
        </h2>
        <p className="text-xl italic text-black max-w-2xl mx-auto">
          {`Identify the four hidden digits within the evidence photos to bypass the electronic lock.`}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[500px] bg-white/30 p-8 rounded-2xl border-2 border-[#ba8358] shadow-lg">
        
        {/* Start Screen */}
        {gameState === "start" && (
          <div className="flex flex-col items-center space-y-6">
            <div className="text-7xl font-mono text-[#ba8358] mb-4 drop-shadow-sm">02:00</div>
            <button 
              onClick={() => setGameState("playing")}
              className="btn-mystery text-2xl px-16 py-4 bg-[#ba8358] text-white rounded-full hover:bg-[#a06d45] transition-all shadow-lg active:scale-95"
            >
              {`INITIATE BYPASS`}
            </button>
          </div>
        )}

        {/* Play Screen */}
        {gameState === "playing" && ( // execute if in 'playing' state
          <div className="flex flex-col items-center w-full space-y-6 animate-in fade-in duration-500">
            <div className={`
              text-6xl font-mono font-bold px-8 py-2 rounded-lg bg-black border-4 
              ${timeLeft < 20 ? "text-red-600 border-red-900 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]" : "text-red-500 border-zinc-800 shadow-[0_0_15px_rgba(239,68,68,0.3)]"}
            `}>
              {formatTime(timeLeft)} 
            </div> 

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
              {clues.map((clue) => (
                <button
                  key={clue.id} 
                  onClick={() => setActiveClue(clue.id)}
                  className={`border-2 py-2 font-bold transition-all rounded-lg ${
                    activeClue === clue.id ? "bg-[#ba8358] text-white border-[#ba8358]" : "bg-white text-[#ba8358] border-[#ba8358] hover:bg-[#ba8358]/10"
                  }`}
                >
                  {`CLUE ${clue.id}`}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center w-full max-w-md">
              <div className="border-4 border-[#ba8358] rounded-t-lg overflow-hidden bg-white shadow-xl w-full aspect-square flex items-center justify-center relative">
                {activeClue ? (
                  <img 
                    src={clues[activeClue - 1].src} 
                    alt="Evidence" 
                    onClick={() => window.open(clues[activeClue - 1].src, '_blank')} 
                    className="max-w-full h-auto cursor-zoom-in" 
                  /> //Image run faster this way for me, fix if any know how
                ) : (
                  <p className="text-[#ba8358] italic font-serif px-4">{`Select a sector to scan for hidden digits...`}</p>
                )}
              </div>
              
              <div className="w-full bg-[#ba8358] p-3 rounded-b-lg border-x-4 border-b-4 border-[#ba8358] min-h-[60px] flex items-center justify-center">
                <p className="text-white text-sm italic font-medium">
                  {activeClue ? `HINT: ${clues[activeClue - 1].hint}` : "Awaiting selection..."}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="h-6">
                {errorMessage && (
                  <p className="text-red-600 font-bold text-sm animate-bounce">{errorMessage}</p>
                )}
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
                placeholder="0000"
                maxLength={4}
                className="text-5xl font-mono tracking-widest text-center bg-white border-2 border-[#ba8358] text-black w-64 p-3 shadow-md outline-none"
              />
              <button 
                onClick={handleUnlock} 
                className="btn-mystery text-2xl px-16 py-3 bg-[#ba8358] text-white rounded-full hover:bg-[#a06d45] shadow-lg"
              >
                {`OVERRIDE LOCK`}
              </button>
            </div>
          </div>
        )}

        {/* 3. Lost Screen */}
        {gameState === "lost" && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in duration-300">
            <div className="border-8 border-red-900 rounded-lg overflow-hidden w-full max-w-sm">
              <img src="/fail.gif" alt="Lockdown" className="w-full h-auto opacity-70 bg-white" />
            </div>
            <h3 className="text-4xl font-black text-red-600 uppercase tracking-tighter">
              {`SYSTEM LOCKDOWN`}
            </h3>
            <p className="text-black font-serif italic text-lg max-w-xs mx-auto">
              {`The security system has permanently engaged. You ran out of time.`}
            </p>
            <button 
              onClick={resetGame}
              className="px-12 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-800 transition-colors shadow-xl"
            >
              {`REBOOT SYSTEM`}
            </button>
          </div>
        )}

        {/* 4. Win Screen */}
        {gameState === "won" && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in duration-500">
            <div className="bg-white p-10 border-4 border-green-600 rounded-lg shadow-2xl">
              <div className="text-6xl mb-4">🔓</div>
              <h3 className="text-4xl font-bold text-green-600 mb-2 uppercase">{`Access Granted`}</h3>
              <p className="text-xl font-serif font-bold italic text-black">{`Can you do the same at the event?`}</p>
            </div>
            <button onClick={resetGame} className="text-[#ba8358] font-bold uppercase tracking-widest hover:underline">
              {`To Be Continue...`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// Ignore problems 