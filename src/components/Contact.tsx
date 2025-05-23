
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions about our products? Contact us for expert assistance.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-secondary mr-4" />
                <a href="tel:+918660098963">Contact Us :</a>
                <span className="text-gray-700" >
                  <a href="tel:+918660098963"  className="text-blue-600 hover:text-blue-800 hover:underline">+918660098963</a>
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-secondary mr-4" />
                <span className="text-gray-700">contact@trinitysystech.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-secondary mr-4" />
                <span className="text-gray-700">subanapalya, Dodda Banaswadi Main Rd, Bengaluru, Karnataka 560033</span>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Your message" className="min-h-[120px]" />
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300 transform hover:scale-105 shadow-lg" 
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
