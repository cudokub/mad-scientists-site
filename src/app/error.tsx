"use client";

import Button from "@/components/Button";

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
        <p className="font-display text-lg md:text-xl text-text tracking-wider text-center">
          SOMETHING WENT WRONG
        </p>
        <p className="font-mono text-body text-base text-center">
          An unexpected reaction in the lab. Our scientists are investigating.
        </p>
        <Button onClick={reset} variant="primary" size="lg">
          TRY AGAIN
        </Button>
      </div>
    </main>
  );
}
