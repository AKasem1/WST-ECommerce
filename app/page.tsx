import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PartnersSection from "@/components/PartnersSection";
import TypingSection from "@/components/TypingSection";
import AboutUsSection from "@/components/AboutUsSection";
import ProductsSection from "@/components/ProductsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <AboutUsSection />
      <PartnersSection />
      <TypingSection />
    </div>
  );
}
