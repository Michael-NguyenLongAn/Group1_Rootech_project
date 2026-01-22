import Image from "next/image"; //img
import Link from "next/link"; //btn

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Top Section: columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
        {/* Left Column: description & sign-up button */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-2 border-b-2 border-[#ba8358] inline-block">
              A body has been found.<br></br>
              The evidence doesn’t add up. <br></br>
            </h2>
            <div className="text-xl leading-relaxed italic">
              <p>☠️ DEATH BY DESIGN: A SUTD Murder Mystery ☠️</p>
              <p>📅 4 February</p>
              <p>🕝 2:30 – 4:30 PM</p>
              <p>📍 ROOTCove</p>
              <p>🍴 Snacks and drinks included!</p>
              <br />
              <p>This isn’t just a mystery — it’s a race against time. ⏳</p>
              <p>Team up with your friends and dive into FOUR immersive booths...</p>
              <p>The truth is buried in the ROOTCove on 4 February…</p>
              <p>Do you have what it takes? 🫆🗂️</p>
            </div>
          </div>
          <a href="#signup-form" className="btn-mystery inline-block text-center no-underline">
            Sign Up!
          </a>
        </div>

        {/* Right Column: poster */}
        <div className="border-4 border-[#ba8358] rounded shadow-2xl bg-white overflow-hidden">
          <img 
            src="/poster.jpg" 
            alt="Poster for Murder Mystery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Section: iframe form */}
      <div id="signup-form" className="w-full mb-20 bg-white p-2 border border-[#ba8358] shadow-lg">
        <iframe 
          src="https://forms.cloud.microsoft/r/sBNq0UJ0fQ" 
          width="100%" 
          height="800" 
          className="w-full"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}