import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PartnersSection from "@/components/PartnersSection";
import TypingSection from "@/components/TypingSection";
import AboutUsSection from "@/components/AboutUsSection";
import ProductsSection from "@/components/ProductsSection";
import ProgramsSection from "@/components/ProgramsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <ProgramsSection />
      <AboutUsSection />
      <PartnersSection />
      <TypingSection />
    </div>
  );
}
