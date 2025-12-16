import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Benefits } from "@/components/sections/Benefits";
import { Pricing } from "@/components/sections/Pricing";
import { Enterprise } from "@/components/sections/Enterprise";
import { Portfolio } from "@/components/sections/Portfolio";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Team />
        <Benefits />
        <Pricing />
        <Enterprise />
        <Portfolio />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
