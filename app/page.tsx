import Image from "next/image"; //img
import Link from "next/link"; //btn

export const metadata = {
  title: "Murder Mystery: Death by Design",
  description: "Bonding event for teams of 5. Can you solve the mystery?",
};

export default function Home() {
  return (
    /* 2. We wrap everything in a "Fragment" <> or a single <div> */
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-24 px-8 bg-white dark:bg-black sm:items-start text-black dark:text-white">
        
        {/* Your content goes here now */}
        <section className="text-center sm:text-left">
          <h1 className="text-5xl font-extrabold mb-4">Death by Design</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8">
            An elite architect has been found dead. The blueprint for murder is complex—are you sharp enough to solve it?
          </p>
          
          <div className="flex gap-4">
            <Link href="/sign-up" className="bg-red-600 px-6 py-3 rounded-md text-white font-bold">
              Sign Up
            </Link>
            <Link href="/find-out-more" className="border border-zinc-300 dark:border-zinc-700 px-6 py-3 rounded-md font-bold">
              Find Out More
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
