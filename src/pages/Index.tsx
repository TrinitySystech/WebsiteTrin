
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductShowcase />
      <Contact />
    </div>
  );
};

export default Index;
