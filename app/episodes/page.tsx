import { EpisodeCard } from "@/components/episode-card";
import { getAllEpisodes } from "@/lib/content";

export const metadata = {
  title: "Episodes"
};

export default async function EpisodesPage() {
  const episodes = await getAllEpisodes({ publishedOnly: false });
  const publishedCount = episodes.filter((episode) => episode.published).length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">Episodes</h1>
        <p className="text-muted-foreground">
          {publishedCount} published out of {episodes.length} total lessons.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
    </div>
  );
}
