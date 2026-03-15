import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link className="inline-flex items-center gap-2 text-sm font-semibold" href="/">
          <span className="rounded-md m-1 bg-primary/15 text-primary">
            <Image src="/learning-polish-grammar/logo.jpg" alt="YT Channel logo" width="32" height="32" className="rounded-md" />
          </span> 
          <span className="font-display text-base tracking-tight">
            Learning Polish Grammar
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-[0.95rem] font-semibold">
          <Link className="text-muted-foreground transition hover:text-foreground" href="/">
            Home
          </Link>
          <Link
            className="text-muted-foreground transition hover:text-foreground"
            href="https://www.youtube.com/playlist?list=PLm6YbIyl6ODN_yyMK2lpq0Qx3oqY7s9aV"
            target="_blank"
            rel="noreferrer"
          >
            Playlist
          </Link>
          <Link
            className="text-muted-foreground transition hover:text-foreground"
            href="https://www.youtube.com/@kyatt_"
            target="_blank"
            rel="noreferrer"
          >
            Channel
          </Link>
        </nav>
      </div>
    </header>
  );
}
