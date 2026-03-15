type YouTubeEmbedProps = {
  videoId: string;
};

export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="aspect-video w-full">
        <iframe
          className="size-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

