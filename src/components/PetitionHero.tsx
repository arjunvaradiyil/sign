import Image from "next/image";
import { content } from "@/i18n/translations";

export default function PetitionHero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-4 py-8 text-center sm:px-6 sm:py-10">
        <h1 className="whitespace-nowrap text-[clamp(0.7rem,2.6vw,2.25rem)] font-extrabold uppercase leading-tight tracking-tight text-foreground">
          {content.hero.title}{" "}
          <span className="font-extrabold">{content.hero.titleHighlight}</span>
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm text-foreground sm:text-base">
          {content.hero.subtitle}{" "}
          <span className="font-semibold">{content.hero.subtitleHighlight}</span>{" "}
          {content.hero.subtitleEnd}
        </p>

        <a
          href="#sign"
          className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-sm"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
          {content.hero.signButton}
        </a>
      </div>
    </section>
  );
}
