
import { Button } from "@/components/ui/button";
import { BatteryCharging, Shield } from "lucide-react";

export const Hero = () => {
  const handleExploreProducts = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-primary py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Reliable Power Solutions for Your Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Trinity Systech provides cutting-edge UPS and battery solutions to keep your home powered. Never worry about power outages again.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90"
                onClick={handleExploreProducts}
              >
                Explore Products
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-6 rounded-lg">
                <BatteryCharging className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-white">Smart Charging</h3>
                <p className="mt-2 text-gray-300">Advanced charging technology for optimal battery life</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg mt-8">
                <Shield className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-white">Protected Power</h3>
                <p className="mt-2 text-gray-300">Complete protection for your valuable devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
