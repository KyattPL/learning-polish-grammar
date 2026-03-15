import Link from "next/link";
import { ArrowUpRight, PlayCircle, Radio, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllEpisodes } from "@/lib/content";
import Image from "next/image";

export default async function HomePage() {
  const episodes = await getAllEpisodes({ publishedOnly: false });
  const publishedCount = episodes.filter((episode) => episode.published).length;

  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-3xl border bg-card/90 p-8 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Polish Grammar Course
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Learning Polish Grammar, now in polished text form
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            A complete written companion to the YouTube series. Each lesson is
            organized, searchable, and ready for fast review.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/episodes/part-0-introduction">
                Start at Part 0
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/episodes">Open grid view</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Radio className="size-4 text-primary" />
              {episodes.length} total lessons
            </div>
            <div className="inline-flex items-center gap-2">
              <PlayCircle className="size-4 text-primary" />
              {publishedCount} published
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border bg-background p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Watch the series
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  YouTube playlist
                </h2>
                <p className="mt-1 text-base text-muted-foreground">
                  Full course videos with detailed explanation
                </p>
              </div>
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Youtube className="size-6" />
              </div>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link
                href="https://www.youtube.com/playlist?list=PLm6YbIyl6ODN_yyMK2lpq0Qx3oqY7s9aV"
                target="_blank"
                rel="noreferrer"
              >
                Open playlist
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border bg-background p-5">
            <div className="flex items-start gap-4">
              <Image src="/logo.jpg" alt="YT Channel logo" width="48" height="48" className="rounded-sm" />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Channel
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold">Kyatt</h2>
                <p className="mt-1 text-base text-muted-foreground">
                  Check out my different videos!
                </p>
              </div>
            </div>
            <Button asChild variant="secondary" className="mt-4 w-full">
              <Link
                href="https://www.youtube.com/@kyatt_"
                target="_blank"
                rel="noreferrer"
              >
                Visit channel
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">Course outline</h2>
          <p className="text-lg text-muted-foreground">
            Scroll the complete list and jump to any lesson.
          </p>
          <div className="rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
            Start at Part 0 if you are new. Use the list to track progress.
          </div>
        </div>

        <div className="rounded-2xl border bg-card">
          <div className="border-b px-5 py-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">All lessons</h3>
              <Badge variant="secondary">{episodes.length} lessons</Badge>
            </div>
          </div>
          <div className="max-h-[65vh] overflow-y-auto p-4">
            <ul className="space-y-2">
              {episodes.map((episode) => (
                <li key={episode.slug}>
                  <Link
                    href={`/episodes/${episode.slug}`}
                    className="group flex items-center justify-between rounded-xl border bg-background px-4 py-3 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        Part {episode.part}
                      </span>
                      <span className="text-[1.05rem] font-semibold">{episode.title}</span>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
