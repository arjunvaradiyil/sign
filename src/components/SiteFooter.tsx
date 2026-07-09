import { content } from "@/i18n/translations";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
          {content.footer.org}
        </p>
        <p className="mt-2 text-[10px] tracking-[0.15em] text-muted">
          {content.footer.tagline}
        </p>
      </div>
    </footer>
  );
}
