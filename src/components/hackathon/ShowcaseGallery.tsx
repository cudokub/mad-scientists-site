"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import type { HackathonShowcaseEntry } from "@/lib/hackathon/showcase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";

type FilterState = {
  award: "all" | "awarded" | "unawarded";
  projectType: string;
  cosmosArea: string;
  aiUse: string;
};

const initialFilters: FilterState = {
  award: "all",
  projectType: "all",
  cosmosArea: "all",
  aiUse: "all",
};

const winnerRevealGroups = [
  {
    eyebrow: "Winners Announced",
    title: "3rd, 4th, and 5th Place",
    entryIds: ["cosmos-arcade", "mad-lab", "carl"],
  },
  {
    eyebrow: "Next Results",
    title: "Top Two Reveal Coming Soon",
    entryIds: [],
    isLocked: true,
  },
];

function uniqueValues(entries: HackathonShowcaseEntry[], key: keyof HackathonShowcaseEntry) {
  return Array.from(new Set(entries.map((entry) => entry[key]).filter(Boolean) as string[])).sort();
}

function externalLinkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

function formatAwardLabel(award?: HackathonShowcaseEntry["award"]) {
  if (!award) return "Recorded Entry";
  if (award === "finalist") return "Finalist";
  if (award === "honorable") return "Honorable Mention";
  return `${award} Place`;
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[44px] shrink-0 border px-3 py-2 text-left font-display text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon ${
        active
          ? "border-hackathon bg-hackathon text-white"
          : "border-hackathon/40 bg-hackathon-bg text-hackathon-text-muted hover:border-hackathon hover:text-hackathon-cyan"
      }`}
    >
      {children}
    </button>
  );
}

function LinkButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const classes =
    variant === "primary"
      ? "border-hackathon bg-hackathon text-white hover:bg-white hover:text-hackathon"
      : "border-hackathon/60 bg-black text-hackathon-cyan hover:border-hackathon hover:text-white";

  return (
    <a
      href={href}
      {...externalLinkProps(href)}
      className={`flex min-h-[44px] items-center justify-center border px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon ${classes}`}
    >
      {children}
    </a>
  );
}

function AwardBadge({ award }: { award?: HackathonShowcaseEntry["award"] }) {
  if (!award) {
    return (
      <span className="border border-hackathon/30 px-2 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-hackathon-text-dim">
        Recorded
      </span>
    );
  }

  return (
    <span className="border border-hackathon bg-hackathon px-2 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-white">
      {formatAwardLabel(award)}
    </span>
  );
}

function WinnerRevealCard({
  entry,
  onOpen,
}: {
  entry: HackathonShowcaseEntry;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex min-h-[260px] flex-col border border-hackathon/60 bg-hackathon-bg-light text-left transition-colors hover:border-hackathon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
    >
      <div className="flex items-center justify-between gap-3 border-b border-hackathon/50 bg-black px-4 py-3">
        <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
          {formatAwardLabel(entry.award)}
        </p>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-hackathon-text-dim">
          {entry.catalogNumber}
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-hackathon/50 bg-black">
        <Image
          src={entry.thumbnail}
          alt={entry.mediaAlt}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover opacity-85 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h4 className="break-words font-display text-xl font-bold uppercase leading-tight tracking-wider text-white">
          {entry.projectName}
        </h4>
        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
          Team / {entry.teamName}
        </p>
        <p className="mt-3 line-clamp-3 font-mono text-sm leading-relaxed text-hackathon-text-muted">
          {entry.summary}
        </p>
      </div>
    </button>
  );
}

function WinnerRevealSection({
  entries,
  onOpen,
}: {
  entries: HackathonShowcaseEntry[];
  onOpen: (id: string) => void;
}) {
  const groups = winnerRevealGroups.map((group) => ({
    ...group,
    entries: group.entryIds
      .map((id) => entries.find((entry) => entry.id === id))
      .filter(Boolean) as HackathonShowcaseEntry[],
  }));

  const hasWinners = groups.some((group) => group.entries.length > 0);
  if (!hasWinners) return null;

  return (
    <div className="border-b border-hackathon bg-black" data-layer="hackathon-showcase-winners">
      <div className="grid grid-cols-1 border-b border-hackathon lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="border-b border-hackathon p-6 lg:border-b-0 lg:border-r lg:p-8">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
            Results Board
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
            Winners Announced
          </h2>
          <p className="mt-3 font-mono text-sm leading-relaxed text-hackathon-text-muted">
            The first results are live: 3rd, 4th, and 5th place are marked below. The top two will
            be added here once the final reveal is public.
          </p>
        </div>

        <div className="grid grid-cols-1 bg-hackathon-bg-light">
          {groups.map((group, index) => (
            <article
              key={group.title}
              className={`border-hackathon ${index === 0 ? "border-b" : ""}`}
            >
              <div className="border-b border-hackathon bg-black p-5">
                <p className="font-display text-xs font-bold uppercase tracking-wider text-hackathon-cyan">
                  {group.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
              </div>
              <div
                className={`grid grid-cols-1 gap-px bg-hackathon/40 p-px ${
                  group.entries.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                }`}
              >
                {group.entries.length > 0 ? (
                  group.entries.map((entry) => (
                    <WinnerRevealCard
                      key={entry.id}
                      entry={entry}
                      onOpen={() => onOpen(entry.id)}
                    />
                  ))
                ) : (
                  <div className="border border-hackathon/60 bg-hackathon-bg-light p-6 md:col-span-3">
                    <p className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                      Top Two Coming Soon
                    </p>
                    <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-hackathon-text-muted">
                      1st and 2nd place will appear here after the final reveal. Until then, every
                      submitted project remains available in the archive below.
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  onOpen,
}: {
  entry: HackathonShowcaseEntry;
  onOpen: () => void;
}) {
  const linkCount =
    [entry.demoUrl, entry.repoUrl, entry.videoUrl].filter(Boolean).length +
    (entry.extraLinks?.length ?? 0);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full min-h-[520px] flex-col border border-hackathon/60 bg-hackathon-bg-light text-left transition-colors hover:border-hackathon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
    >
      <div className="flex items-center justify-between gap-3 border-b border-hackathon/50 bg-black px-4 py-3">
        <span className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
          {entry.catalogNumber}
        </span>
        <AwardBadge award={entry.award} />
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-hackathon/50 bg-black">
        <Image
          src={entry.thumbnail}
          alt={entry.mediaAlt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-hackathon-text-dim">
          {entry.teamName}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-wider text-white">
          {entry.projectName}
        </h3>
        <p className="mt-3 flex-1 font-mono text-sm leading-relaxed text-hackathon-text-muted">
          {entry.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border border-hackathon/30 bg-hackathon-bg px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-hackathon-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-hackathon/50">
        <div className="border-r border-hackathon/50 px-3 py-3">
          <p className="font-display text-[11px] uppercase tracking-wider text-hackathon-cyan">
            Type
          </p>
          <p className="mt-1 truncate font-mono text-xs text-hackathon-text-muted">
            {entry.projectType}
          </p>
        </div>
        <div className="border-r border-hackathon/50 px-3 py-3">
          <p className="font-display text-[11px] uppercase tracking-wider text-hackathon-cyan">
            Cosmos
          </p>
          <p className="mt-1 truncate font-mono text-xs text-hackathon-text-muted">
            {entry.cosmosArea}
          </p>
        </div>
        <div className="px-3 py-3">
          <p className="font-display text-[11px] uppercase tracking-wider text-hackathon-cyan">
            Links
          </p>
          <p className="mt-1 truncate font-mono text-xs text-hackathon-text-muted">
            {linkCount > 0 ? `${linkCount} ready` : "TBD"}
          </p>
        </div>
      </div>
    </button>
  );
}

function EntryFacts({ entry }: { entry: HackathonShowcaseEntry }) {
  const facts = [
    ["Project Type", entry.projectType],
    ["Cosmos Area", entry.cosmosArea],
    ["AI Use", entry.aiUse],
    ["Result", formatAwardLabel(entry.award)],
  ];

  return (
    <div className="grid grid-cols-2 border border-hackathon/40">
      {facts.map(([label, value], index) => (
        <div
          key={label}
          className={`p-3 ${index < 2 ? "border-b" : ""} ${
            index % 2 === 0 ? "border-r" : ""
          } border-hackathon/40`}
        >
          <p className="font-display text-[11px] font-bold uppercase tracking-wider text-hackathon-cyan">
            {label}
          </p>
          <p className="mt-1 font-mono text-sm text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}

function EntryLinks({ entry }: { entry: HackathonShowcaseEntry }) {
  const links = [
    entry.demoUrl ? ["View Demo", entry.demoUrl, "primary" as const] : null,
    entry.repoUrl ? ["GitHub", entry.repoUrl, "secondary" as const] : null,
    entry.videoUrl ? ["Demo Video", entry.videoUrl, "secondary" as const] : null,
    ...(entry.extraLinks?.map(
      (link) => [link.label, link.href, "secondary" as const] as const,
    ) ?? []),
  ].filter(Boolean) as Array<[string, string, "primary" | "secondary"]>;

  if (links.length === 0) {
    return (
      <div className="border border-hackathon/40 bg-hackathon-bg p-4">
        <p className="font-mono text-sm leading-relaxed text-hackathon-text-muted">
          Demo, repository, and video links will appear here when the submission packet is
          finalized.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {links.map(([label, href, variant]) => (
        <LinkButton key={`${label}-${href}`} href={href} variant={variant}>
          {label}
        </LinkButton>
      ))}
    </div>
  );
}

function EntryCopy({ entry }: { entry: HackathonShowcaseEntry }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-base leading-relaxed text-hackathon-text-muted">
        {entry.description}
      </p>

      <EntryFacts entry={entry} />

      <div>
        <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
          Tags
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="border border-hackathon/40 bg-hackathon-bg px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-hackathon-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {entry.teamMembers && entry.teamMembers.length > 0 ? (
        <div className="border-t border-hackathon/40 pt-5">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
            Team
          </p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-hackathon-text-muted">
            {entry.teamMembers.join(", ")}
          </p>
        </div>
      ) : null}

      {entry.curatorNote ? (
        <div className="border border-hackathon/40 bg-black p-4">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
            Curator Note
          </p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-hackathon-text-muted">
            {entry.curatorNote}
          </p>
        </div>
      ) : null}

      <EntryLinks entry={entry} />
    </div>
  );
}

function ShowcaseModal({
  entry,
  onClose,
  onPrev,
  onNext,
  positionLabel,
}: {
  entry: HackathonShowcaseEntry;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  positionLabel: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev]);

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent onClick={onClose}>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onPrev(); }}
            className="absolute left-2 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-hackathon bg-hackathon-bg/90 font-display text-lg text-hackathon-cyan transition-colors hover:bg-hackathon hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
            aria-label="Previous showcase entry"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onNext(); }}
            className="absolute right-2 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-hackathon bg-hackathon-bg/90 font-display text-lg text-hackathon-cyan transition-colors hover:bg-hackathon hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
            aria-label="Next showcase entry"
          >
            &rarr;
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden border border-hackathon bg-hackathon-bg-light shadow-lg animate-[dialogIn_300ms_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-[110] flex h-11 w-11 items-center justify-center border border-hackathon bg-hackathon-bg/90 font-display text-sm text-hackathon-cyan transition-colors hover:bg-hackathon hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="grid grid-cols-[minmax(0,1fr)_420px]">
              <div className="border-r border-hackathon bg-black">
                <div className="relative aspect-[4/3] h-full max-h-[90vh] w-full">
                  <Image
                    src={entry.thumbnail}
                    alt={entry.mediaAlt}
                    fill
                    sizes="60vw"
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              <div className="flex max-h-[90vh] flex-col gap-5 overflow-y-auto p-8">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
                    {entry.catalogNumber} / {positionLabel}
                  </p>
                  <DialogTitle className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-wider text-white">
                    {entry.projectName}
                  </DialogTitle>
                  <p className="mt-2 font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
                    Team / {entry.teamName}
                  </p>
                  <DialogDescription className="mt-3 font-mono text-base leading-relaxed text-hackathon-text-muted">
                    {entry.summary}
                  </DialogDescription>
                </div>
                <EntryCopy entry={entry} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DrawerContent
        className="h-[85vh] border-hackathon bg-hackathon-bg-light"
        handleClassName="bg-hackathon/60"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-hackathon bg-black">
            <Image
              src={entry.thumbnail}
              alt={entry.mediaAlt}
              width={1200}
              height={900}
              sizes="100vw"
              className="h-auto w-full object-contain"
              priority
              unoptimized
            />
          </div>

          <div className="flex flex-col gap-5 p-5">
            <div>
              <p className="text-center font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
                {entry.catalogNumber} / {positionLabel}
              </p>
              <DrawerTitle className="mt-2 text-center font-display text-3xl font-bold uppercase leading-tight tracking-wider text-white">
                {entry.projectName}
              </DrawerTitle>
              <p className="mt-2 text-center font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
                Team / {entry.teamName}
              </p>
              <DrawerDescription className="mt-3 text-center font-mono text-base leading-relaxed text-hackathon-text-muted">
                {entry.summary}
              </DrawerDescription>
            </div>

            <EntryCopy entry={entry} />

            <div className="flex items-center justify-between border-t border-hackathon/40 pt-4">
              <button
                type="button"
                onClick={onPrev}
                className="flex h-11 items-center gap-2 border border-hackathon bg-hackathon-bg px-3 font-display text-sm text-hackathon-cyan transition-colors hover:bg-hackathon hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
                aria-label="Previous showcase entry"
              >
                &larr;
                <span className="text-xs uppercase tracking-wider">Prev</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="flex h-11 items-center gap-2 border border-hackathon bg-hackathon-bg px-3 font-display text-sm text-hackathon-cyan transition-colors hover:bg-hackathon hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
                aria-label="Next showcase entry"
              >
                <span className="text-xs uppercase tracking-wider">Next</span>
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function ShowcaseGallery({ entries }: { entries: HackathonShowcaseEntry[] }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const projectTypes = useMemo(() => uniqueValues(entries, "projectType"), [entries]);
  const cosmosAreas = useMemo(() => uniqueValues(entries, "cosmosArea"), [entries]);
  const aiUses = useMemo(() => uniqueValues(entries, "aiUse"), [entries]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const haystack = [
        entry.projectName,
        entry.teamName,
        entry.summary,
        entry.description,
        entry.projectType,
        entry.cosmosArea,
        entry.aiUse,
        entry.tags.join(" "),
        entry.award ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
      const matchesAward =
        filters.award === "all" ||
        (filters.award === "awarded" && Boolean(entry.award)) ||
        (filters.award === "unawarded" && !entry.award);
      const matchesType = filters.projectType === "all" || entry.projectType === filters.projectType;
      const matchesCosmos = filters.cosmosArea === "all" || entry.cosmosArea === filters.cosmosArea;
      const matchesAi = filters.aiUse === "all" || entry.aiUse === filters.aiUse;

      return matchesQuery && matchesAward && matchesType && matchesCosmos && matchesAi;
    });
  }, [entries, filters, query]);

  const selectedEntry = selectedId ? entries.find((entry) => entry.id === selectedId) ?? null : null;
  const selectedIndex = selectedEntry ? entries.findIndex((entry) => entry.id === selectedEntry.id) : -1;
  const activeFilterCount = [
    filters.award !== "all",
    filters.projectType !== "all",
    filters.cosmosArea !== "all",
    filters.aiUse !== "all",
    query.trim().length > 0,
  ].filter(Boolean).length;

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setQuery("");
    setFilters(initialFilters);
  };

  const goPrev = () => {
    if (entries.length === 0 || selectedIndex < 0) return;
    const previousIndex = (selectedIndex - 1 + entries.length) % entries.length;
    setSelectedId(entries[previousIndex].id);
  };

  const goNext = () => {
    if (entries.length === 0 || selectedIndex < 0) return;
    const nextIndex = (selectedIndex + 1) % entries.length;
    setSelectedId(entries[nextIndex].id);
  };

  return (
    <section className="mx-auto max-w-[1440px]" data-layer="hackathon-showcase-gallery">
      <div className="border-x border-b border-hackathon bg-hackathon-bg-light">
        <WinnerRevealSection entries={entries} onOpen={setSelectedId} />

        <div className="grid grid-cols-1 border-b border-hackathon bg-black lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="border-b border-hackathon p-6 lg:border-b-0 lg:border-r lg:p-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
              Archive Wall
            </h2>
            <p className="mt-3 font-mono text-sm leading-relaxed text-hackathon-text-muted">
              Search the catalog, filter by signal, then open a record for demo links and
              submission notes.
            </p>
            <p className="mt-5 font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan">
              {filteredEntries.length} / {entries.length} Records Visible
            </p>
          </div>

          <div className="p-6 lg:p-8">
            <label
              htmlFor="showcase-search"
              className="font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan"
            >
              Search Archive
            </label>
            <input
              id="showcase-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Project, team, tag, AI use..."
              className="mt-3 min-h-[48px] w-full border border-hackathon/60 bg-hackathon-bg px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-hackathon-text-dim focus:border-hackathon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
            />

            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-4">
              <div className="min-w-0">
                <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-hackathon-text-dim">
                  Awards
                </p>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  <FilterChip
                    active={filters.award === "all"}
                    onClick={() => updateFilter("award", "all")}
                  >
                    All
                  </FilterChip>
                  <FilterChip
                    active={filters.award === "awarded"}
                    onClick={() => updateFilter("award", "awarded")}
                  >
                    Announced
                  </FilterChip>
                  <FilterChip
                    active={filters.award === "unawarded"}
                    onClick={() => updateFilter("award", "unawarded")}
                  >
                    Archive Entries
                  </FilterChip>
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-hackathon-text-dim">
                  Type
                </p>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  <FilterChip
                    active={filters.projectType === "all"}
                    onClick={() => updateFilter("projectType", "all")}
                  >
                    All
                  </FilterChip>
                  {projectTypes.map((type) => (
                    <FilterChip
                      key={type}
                      active={filters.projectType === type}
                      onClick={() => updateFilter("projectType", type)}
                    >
                      {type}
                    </FilterChip>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-hackathon-text-dim">
                  Cosmos
                </p>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  <FilterChip
                    active={filters.cosmosArea === "all"}
                    onClick={() => updateFilter("cosmosArea", "all")}
                  >
                    All
                  </FilterChip>
                  {cosmosAreas.map((area) => (
                    <FilterChip
                      key={area}
                      active={filters.cosmosArea === area}
                      onClick={() => updateFilter("cosmosArea", area)}
                    >
                      {area}
                    </FilterChip>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-hackathon-text-dim">
                  AI Use
                </p>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  <FilterChip
                    active={filters.aiUse === "all"}
                    onClick={() => updateFilter("aiUse", "all")}
                  >
                    All
                  </FilterChip>
                  {aiUses.map((aiUse) => (
                    <FilterChip
                      key={aiUse}
                      active={filters.aiUse === aiUse}
                      onClick={() => updateFilter("aiUse", aiUse)}
                    >
                      {aiUse}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </div>

            {activeFilterCount > 0 ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 min-h-[44px] border border-hackathon/60 bg-black px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-hackathon-cyan transition-colors hover:border-hackathon hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
              >
                Clear Filters ({activeFilterCount})
              </button>
            ) : null}
          </div>
        </div>

        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 gap-px bg-hackathon/40 p-px md:grid-cols-2 xl:grid-cols-3">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onOpen={() => setSelectedId(entry.id)}
              />
            ))}
          </div>
        ) : (
          <div className="border-b border-hackathon/40 bg-hackathon-bg-light p-8 text-center md:p-12">
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
              No Matching Records
            </h3>
            <p className="mx-auto mt-3 max-w-xl font-mono text-sm leading-relaxed text-hackathon-text-muted">
              Try a broader search or clear the active filters to return to the full archive wall.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 min-h-[44px] border border-hackathon bg-hackathon px-4 py-2 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-hackathon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hackathon"
            >
              Reset Archive
            </button>
          </div>
        )}
      </div>

      {selectedEntry ? (
        <ShowcaseModal
          entry={selectedEntry}
          onClose={() => setSelectedId(null)}
          onPrev={goPrev}
          onNext={goNext}
          positionLabel={`${selectedIndex + 1} of ${entries.length}`}
        />
      ) : null}
    </section>
  );
}
