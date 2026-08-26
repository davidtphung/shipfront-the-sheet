import { CapabilitiesGrid } from "@/components/shipfront/capabilities-grid";
import { CrateDashboard } from "@/components/shipfront/crate-dashboard";
import { ExceptionIntelligence } from "@/components/shipfront/exception-intelligence";
import { FinalCta } from "@/components/shipfront/final-cta";
import { Footer } from "@/components/shipfront/footer";
import { Hero } from "@/components/shipfront/hero";
import { IndustryCards } from "@/components/shipfront/industry-cards";
import { Integrations } from "@/components/shipfront/integrations";
import { MarqueeStrip } from "@/components/shipfront/marquee-strip";
import { MetricsStrip } from "@/components/shipfront/metrics-strip";
import { Navbar } from "@/components/shipfront/navbar";
import { WhySection } from "@/components/shipfront/why-section";
import { WorkflowStory } from "@/components/shipfront/workflow-story";

export default function HomePage() {
  return (
    <>
      <div id="top" />
      <Navbar />
      <main>
        <MarqueeStrip />
        <Hero />
        <MetricsStrip />
        <WhySection />
        <CrateDashboard />
        <CapabilitiesGrid />
        <ExceptionIntelligence />
        <WorkflowStory />
        <Integrations />
        <IndustryCards />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
