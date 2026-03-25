import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Features } from "@/components/landing/Features";
import { TemplateShowcase } from "@/components/landing/TemplateShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <StatsBar />
      <Features />
      <TemplateShowcase />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <LandingFooter />
    </main>
  );
}
