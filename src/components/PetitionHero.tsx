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
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
          {content.hero.org}
        </p>

        <h1 className="mt-3 text-[clamp(1rem,3.5vw,2.25rem)] uppercase leading-tight tracking-tight text-foreground">
          <span className="block font-bold">{content.hero.title}</span>
          <span className="mt-1 block font-extrabold">
            {content.hero.titleHighlight}
          </span>
        </h1>

        <p className="mx-auto mt-3 text-[clamp(0.625rem,2.8vw,1rem)] font-extrabold leading-tight tracking-wide text-foreground whitespace-nowrap">
          {content.hero.subtitle}
        </p>

        <a
          href="#sign"
          className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 bg-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
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
