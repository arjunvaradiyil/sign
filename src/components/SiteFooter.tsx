import Image from "next/image";
import { content } from "@/i18n/translations";

export default function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-foreground">
          {content.footer.org}
        </p>
        <h2 className="mt-2 text-lg font-extrabold uppercase leading-tight text-foreground sm:text-xl">
          {content.footer.tagline}
        </h2>
      </div>
    </footer>
  );
}
