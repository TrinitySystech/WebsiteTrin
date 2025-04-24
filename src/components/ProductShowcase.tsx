import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, BatteryCharging, Zap } from "lucide-react";

export const ProductShowcase = () => {
  const products = [
    {
      title: "Home UPS Systems",
      description: "Reliable power backup solutions for your entire home",
      icon: Zap,
      features: ["Pure Sine Wave Output", "LCD Display", "Smart Charging"],
    },
    {
      title: "Battery Solutions",
      description: "Long-lasting batteries with advanced technology",
      icon: Battery,
      features: ["Maintenance-Free", "Long Life", "Deep Cycle"],
    },
    {
      title: "Hybrid Systems",
      description: "Combined UPS and solar compatibility",
      icon: BatteryCharging,
      features: ["Solar Ready", "Auto Switching", "Energy Efficient"],
    },
  ];

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Products</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our range of power solutions designed for your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.title} className="border-2 border-gray-100 hover:border-secondary transition-colors">
              <CardHeader>
                <div className="mb-4">
                  <product.icon className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
