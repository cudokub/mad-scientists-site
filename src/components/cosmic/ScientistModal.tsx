"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

export interface Scientist {
  id: number;
  name: string;
  src: string;
  fullSrc: string;
  tagline: string;
  lore: string;
}

function ScientistModalContent({
  scientist,
  onPrev,
  onNext,
  isDesktop,
}: {
  scientist: Scientist;
  onPrev: () => void;
  onNext: () => void;
  isDesktop: boolean;
}) {
  return (
    <>
      {isDesktop ? (
        <div className="grid grid-cols-[minmax(0,1fr)_360px]">
          <div className="border-r border-cosmic/30">
            <Image
              src={scientist.fullSrc}
              alt={scientist.name}
              width={900}
              height={900}
              sizes="60vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex max-h-[90vh] flex-col gap-5 overflow-y-auto p-8">
            <DialogTitle className="font-display text-3xl uppercase tracking-wide text-[#f4ecff]">
              {scientist.name}
            </DialogTitle>

            <DialogDescription className="font-mono text-base leading-relaxed text-[#d8d4e2]">
              {scientist.tagline}
            </DialogDescription>

            <div className="border-t border-cosmic/25 pt-5">
              <p className="font-mono text-sm leading-relaxed text-[#b4afc0]">
                {scientist.lore}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-cosmic/30">
            <Image
              src={scientist.fullSrc}
              alt={scientist.name}
              width={900}
              height={900}
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 p-5">
            <DrawerTitle className="font-display text-3xl uppercase tracking-wide text-[#f4ecff]">
              {scientist.name}
            </DrawerTitle>

            <DrawerDescription className="font-mono text-base leading-relaxed text-[#d8d4e2]">
              {scientist.tagline}
            </DrawerDescription>

            <div className="border-t border-cosmic/25 pt-5">
              <p className="font-mono text-sm leading-relaxed text-[#b4afc0]">
                {scientist.lore}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-cosmic/25 pt-4">
              <button
                onClick={onPrev}
                className="flex h-10 w-10 items-center justify-center border border-cosmic/40 bg-[#09081a]/70 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic"
                aria-label="Previous scientist"
              >
                &larr;
              </button>
              <button
                onClick={onNext}
                className="flex h-10 w-10 items-center justify-center border border-cosmic/40 bg-[#09081a]/70 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic"
                aria-label="Next scientist"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ScientistModal({
  scientist,
  onClose,
  onPrev,
  onNext,
}: {
  scientist: Scientist;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext]);

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent>
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-cosmic/40 bg-[#09081a]/80 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic"
            aria-label="Previous scientist"
          >
            &larr;
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-cosmic/40 bg-[#09081a]/80 font-display text-lg text-cosmic/70 transition-colors hover:text-cosmic"
            aria-label="Next scientist"
          >
            &rarr;
          </button>
          <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden border border-cosmic/40 bg-[#080612]/95 shadow-lg animate-[dialogIn_300ms_cubic-bezier(0.16,1,0.3,1)]">
            <ScientistModalContent
              scientist={scientist}
              onPrev={onPrev}
              onNext={onNext}
              isDesktop
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DrawerContent>
        <ScientistModalContent
          scientist={scientist}
          onPrev={onPrev}
          onNext={onNext}
          isDesktop={false}
        />
      </DrawerContent>
    </Drawer>
  );
}
