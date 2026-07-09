import { content } from "@/i18n/translations";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-4xl items-center justify-center px-4 py-6 sm:px-6">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
          {content.footer.tagline}
        </p>
      </div>
    </footer>
  );
}
