import {
  Building2,
  FileText,
  Landmark,
  Scale,
} from "lucide-react";
import { content } from "@/i18n/translations";

const demandIcons = [Building2, FileText];

export default function PetitionLetter() {
  return (
    <article id="petition" className="bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-white">
            <Landmark className="h-5 w-5" aria-hidden />
          </div>
          <p className="text-base leading-relaxed text-foreground sm:text-lg">
            <span className="font-bold">{content.letter.to}</span>
            <br />
            {content.letter.recipients}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface-muted px-4 py-4 sm:px-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            <FileText className="h-5 w-5 text-foreground" aria-hidden />
          </div>
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            <span className="font-bold">{content.letter.subjectLabel}</span>{" "}
            {content.letter.subject}
          </p>
        </div>

        <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          <p className="font-bold text-foreground">{content.letter.salutation}</p>

          <p className="text-justify">{content.letter.p1}</p>

          <p className="text-justify">
            {content.letter.p2Before}{" "}
            <strong className="text-foreground">
              {content.letter.p2Highlight}
            </strong>{" "}
            {content.letter.p2After}
          </p>

          <p className="text-justify">{content.letter.p3}</p>

          <p className="text-justify">{content.letter.p4}</p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-foreground" aria-hidden />
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                {content.letter.demandsTitle}
              </h2>
            </div>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.letter.demands.map((text, index) => {
              const Icon = demandIcons[index];
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <Icon
                      className="h-5 w-5 shrink-0 text-foreground"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
