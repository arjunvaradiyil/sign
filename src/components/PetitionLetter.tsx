import { content } from "@/i18n/translations";

function PanelSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-b border-foreground px-5 py-5 last:border-b-0 sm:px-6 sm:py-6 ${className}`}
    >
      {children}
    </div>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
      {children}
    </p>
  );
}

export default function PetitionLetter() {
  return (
    <article id="petition">
      <div className="bg-foreground px-5 py-5 text-center text-white sm:px-6 sm:py-6">
        <h2 className="text-lg font-bold tracking-tight sm:text-xl">
          {content.letter.title}
        </h2>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
          {content.letter.subtitle}
        </p>
      </div>

      <PanelSection>
        <PanelLabel>{content.letter.to}</PanelLabel>
        <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
          {content.letter.recipients}
        </p>
      </PanelSection>

      <PanelSection>
        <PanelLabel>{content.letter.subjectLabel}</PanelLabel>
        <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
          {content.letter.subject}
        </p>
      </PanelSection>

      <PanelSection>
        <p className="text-sm font-bold text-foreground sm:text-base">
          {content.letter.salutation}
        </p>
      </PanelSection>

      <PanelSection className="space-y-5 text-sm leading-relaxed text-foreground sm:text-base">
        <p className="text-justify">{content.letter.p1}</p>

        <p className="text-justify">
          {content.letter.p2Before}{" "}
          <strong>{content.letter.p2Highlight}</strong>{" "}
          {content.letter.p2After}
        </p>

        <p className="text-justify">{content.letter.p3}</p>

        <p className="text-justify">{content.letter.p4}</p>
      </PanelSection>

      <div className="border-b border-foreground bg-foreground px-5 py-4 text-center text-white sm:px-6 sm:py-5">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">
          {content.letter.demandsTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {content.letter.demands.map((text, index) => (
          <div
            key={index}
            className={`border-foreground p-5 sm:p-6 ${
              index === 0 ? "border-b sm:border-b-0 sm:border-r" : ""
            }`}
          >
            <PanelLabel>Demand {index + 1}</PanelLabel>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
