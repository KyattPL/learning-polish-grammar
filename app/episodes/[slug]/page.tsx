import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EpisodeNav } from "@/components/episode-nav";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { getAllEpisodes, getEpisodeBySlug, getEpisodeSlugs } from "@/lib/content";
import { renderEpisodeMdx } from "@/lib/mdx";

type EpisodePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getEpisodeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return {
      title: "Episode Not Found"
    };
  }

  return {
    title: `Part ${episode.part} - ${episode.title}`,
    description:
      episode.summary ?? `Text lesson for Part ${episode.part}: ${episode.title}`
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const episodes = await getAllEpisodes({ publishedOnly: false });
  const currentIndex = episodes.findIndex((item) => item.slug === episode.slug);
  const previousEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < episodes.length - 1
      ? episodes[currentIndex + 1]
      : null;

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Part {episode.part}</Badge>
          {!episode.published ? <Badge variant="outline">Draft</Badge> : null}
          {episode.level ? <Badge variant="secondary">{episode.level}</Badge> : null}
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {episode.title}
        </h1>

        {episode.summary ? (
          <p className="max-w-3xl text-muted-foreground">{episode.summary}</p>
        ) : null}

        {episode.youtubeId ? <YouTubeEmbed videoId={episode.youtubeId} /> : null}
      </header>

      <Separator />

      <section className="prose prose-slate">
        {await renderEpisodeMdx(episode.content)}
      </section>

      <EpisodeNav previous={previousEpisode} next={nextEpisode} />
    </article>
  );
}
