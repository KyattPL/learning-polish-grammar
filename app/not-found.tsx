import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="space-y-4 rounded-xl border bg-card p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Episode not found</h1>
      <p className="text-muted-foreground">
        This lesson does not exist yet or has not been generated.
      </p>
      <Button asChild>
        <Link href="/episodes">Back to episodes</Link>
      </Button>
    </section>
  );
}

