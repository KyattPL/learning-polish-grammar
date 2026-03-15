import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Episode } from "@/lib/content-schema";

type EpisodeNavProps = {
  previous: Episode | null;
  next: Episode | null;
};

export function EpisodeNav({ previous, next }: EpisodeNavProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
      {previous ? (
        <Button asChild variant="outline">
          <Link href={`/episodes/${previous.slug}`}>
            <ChevronLeft className="size-4" />
            Part {previous.part}
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {next ? (
        <Button asChild>
          <Link href={`/episodes/${next.slug}`}>
            Part {next.part}
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}

