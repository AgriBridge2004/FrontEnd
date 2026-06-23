import { ContactCTA } from "@/components/landing/ContactCTA";
import { FAQSection } from "@/components/landing/FAQSection";
import { FloatingFeatures } from "@/components/landing/FloatingFeatures";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Navbar } from "@/components/landing/Navbar";
import { StatsSection } from "@/components/landing/StatsSection";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900" dir="ltr">
      <Navbar />
      <main>
        <HeroSection />
        <FloatingFeatures />
        <HowItWorksSection />
        <StatsSection />
        <FAQSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
