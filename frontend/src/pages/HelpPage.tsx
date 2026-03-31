import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  ShoppingBag, 
  MapPin, 
  User as UserIcon, 
  CreditCard, 
  Smartphone, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpPage = () => {
  const steps = [
    {
      title: 'Choose a Restaurant',
      description: 'Select your favorite shop from our curated list. You can filter by rating or search by name.',
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Add Items to Cart',
      description: 'Browse the menu and add delicious food to your cart. We support real-time cart updates.',
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Check the Map',
      description: 'See the shop location and directions with our interactive map integration.',
      icon: <MapPin className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Secure Checkout',
      description: 'Enter your delivery details and apply coupons for extra discounts. Your data is safe.',
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="container py-12 max-w-5xl mx-auto space-y-12">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5">
          User Guide
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">How it Works</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the most seamless food delivery service designed with best-in-class UI/UX practices.
        </p>
      </motion.div>

      {/* Visual Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-none shadow-md hover:shadow-xl transition-all group">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Info className="h-8 w-8 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I apply a coupon?</AccordionTrigger>
              <AccordionContent>
                On the Shopping Cart page, you'll find a "Coupon" section. Enter your code (e.g., WELCOME10) and click "Apply". The discount will be instantly calculated and shown in your summary.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I track my order status?</AccordionTrigger>
              <AccordionContent>
                We use real-time Socket.io technology! Once you place an order, you'll receive live notifications about its status (Confirmed {'>'} Cooking {'>'} On the way {'>'} Delivered). You can also view your history in the Profile page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does the Personal Cabinet work?</AccordionTrigger>
              <AccordionContent>
                Your Personal Cabinet stores your order history and provides an animated spending chart. You can customize your profile by adding a name and choosing a unique avatar using our built-in generator.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is my location data used for directions?</AccordionTrigger>
              <AccordionContent>
                Yes! If you enable location services, we show real-time directions to the shop using interactive arrows on our OpenStreetMap-powered map. This is designed for maximum privacy without using Google trackers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Smartphone className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                <p className="text-sm">Use the rating filter to find the highest-quality restaurants in your area.</p>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                <p className="text-sm">Save your email to quickly access your history and repeat previous orders with one click.</p>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                <p className="text-sm">Check the Coupons page regularly for the latest seasonal discounts.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-dashed">
            <CardContent className="p-6 text-center space-y-4">
              <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold">Still have questions?</h3>
              <p className="text-sm text-muted-foreground">Our support team is available 24/7 to help you with your order.</p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default HelpPage;
