import PetitionHero from "@/components/PetitionHero";
import PetitionLetter from "@/components/PetitionLetter";
import SignPetitionForm from "@/components/SignPetitionForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SignatureCountProvider } from "@/context/SignatureCountProvider";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <SignatureCountProvider>
      <div className="bg-background">
        <ScrollToTop />
        <SiteHeader />
        <PetitionHero />

        <div className="mx-auto max-w-4xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
          <div className="border border-foreground bg-background">
            <PetitionLetter />
            <SignPetitionForm />
          </div>
        </div>

        <SiteFooter />
      </div>
    </SignatureCountProvider>
  );
}
