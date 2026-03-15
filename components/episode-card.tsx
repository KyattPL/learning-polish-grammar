import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Episode } from "@/lib/content-schema";

type EpisodeCardProps = {
  episode: Episode;
};

function formatDuration(durationSec?: number) {
  if (!durationSec || durationSec <= 0) {
    return null;
  }
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const duration = formatDuration(episode.durationSec);

  return (
    <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge>Part {episode.part}</Badge>
          {!episode.published ? <Badge variant="outline">Draft</Badge> : null}
        </div>
        <CardTitle className="font-display text-lg leading-6">
          <Link className="group inline-flex items-start gap-1 hover:underline" href={`/episodes/${episode.slug}`}>
            {episode.title}
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
          </Link>
        </CardTitle>
        {episode.summary ? <CardDescription>{episode.summary}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {duration ? (
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            {duration}
          </div>
        ) : null}
        {episode.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {episode.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
