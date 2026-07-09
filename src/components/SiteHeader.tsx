import SignatureStatus from "@/components/SignatureStatus";

export default function SiteHeader() {
  return (
    <header className="fixed bottom-4 right-4 z-50">
      <SignatureStatus variant="header" />
    </header>
  );
}
