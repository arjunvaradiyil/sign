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
        <PetitionLetter />
        <SignPetitionForm />
        <SiteFooter />
      </div>
    </SignatureCountProvider>
  );
}
