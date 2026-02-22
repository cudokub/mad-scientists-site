"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden flex items-center justify-center">
      <div className="border border-green p-6 md:p-8 flex flex-col items-center gap-6 max-w-md mx-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-green">
          ERROR
        </h1>
        <p className="font-display text-lg md:text-xl text-[#D2DFD4] tracking-wider text-center">
          SOMETHING WENT WRONG
        </p>
        <p className="font-mono text-[#C2C2C2] text-base text-center">
          An unexpected error occurred. Our scientists are investigating.
        </p>
        <button
          onClick={reset}
          className="flex items-center justify-center font-display font-bold tracking-[0.05em] text-center transition-all bg-green text-[#141414] hover:brightness-110 px-6 py-4 text-base md:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        >
          TRY AGAIN
        </button>
      </div>
    </main>
  );
}
