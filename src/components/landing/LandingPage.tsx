import { AboutSection } from "@/components/landing/AboutSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { StatsSection } from "@/components/landing/StatsSection";
import { TeamSection } from "@/components/landing/TeamSection";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f7] text-slate-950" dir="rtl">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
        <StatsSection />
        <TeamSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
