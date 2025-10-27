import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-6">
            Help & FAQ
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12">
            Find answers to common questions about bookings, accommodations, and experiences
          </p>

          <div className="mb-12">
            <h2 className="font-montserrat text-2xl font-semibold text-primary mb-6">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I make a booking?</AccordionTrigger>
                <AccordionContent>
                  To make a booking, browse our accommodations on the Search page, select your preferred lodge or room, 
                  choose your dates, and follow the booking process. You'll need to create an account or log in to 
                  complete your reservation. Payment can be made securely through our booking system.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
                <AccordionContent>
                  We offer flexible cancellation up to 48 hours before your check-in date for a full refund. 
                  Cancellations made within 48 hours of check-in will incur a charge of one night's accommodation. 
                  Please contact us directly for special circumstances or group bookings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What cultural experiences do you offer?</AccordionTrigger>
                <AccordionContent>
                  We offer a variety of authentic Zulu cultural experiences including traditional dance performances, 
                  beadwork workshops, cooking classes, community visits, and storytelling sessions. All experiences 
                  are led by local guides and artisans, ensuring cultural authenticity and supporting the local community.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Are meals included in the accommodation?</AccordionTrigger>
                <AccordionContent>
                  Meal options vary by accommodation type. Some lodges include breakfast, while others offer full board 
                  options. You can see meal inclusion details on each accommodation's listing page. We also have an 
                  on-site restaurant serving traditional Zulu cuisine and international dishes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How sustainable are your accommodations?</AccordionTrigger>
                <AccordionContent>
                  All our accommodations are designed with sustainability in mind. We use solar power for electricity, 
                  implement water recycling systems, use locally sourced materials, and practice comprehensive waste 
                  management. Each property has specific sustainability features detailed on its listing page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Do you offer transport from the airport?</AccordionTrigger>
                <AccordionContent>
                  Yes, we can arrange airport transfers from King Shaka International Airport in Durban. Please contact 
                  us at least 48 hours before your arrival to arrange transportation. Additional charges apply based 
                  on the number of passengers and specific requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What activities are available nearby?</AccordionTrigger>
                <AccordionContent>
                  The Jozini area offers numerous activities including wildlife safaris at Jozini Dam, hiking trails, 
                  bird watching, fishing, and visits to local cultural villages. We can help arrange all activities 
                  and provide recommendations based on your interests and the season.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Is Wi-Fi available?</AccordionTrigger>
                <AccordionContent>
                  Yes, complimentary Wi-Fi is available in all our accommodations and common areas. While we're located 
                  in a natural setting, we maintain reliable internet connectivity powered by our solar energy systems.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>Are children welcome?</AccordionTrigger>
                <AccordionContent>
                  Yes, families with children are very welcome! We have family-friendly accommodations and can arrange 
                  age-appropriate cultural experiences and activities. Some accommodations have specific child policies, 
                  so please check individual listings or contact us for details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>What should I pack for my stay?</AccordionTrigger>
                <AccordionContent>
                  We recommend comfortable casual clothing, walking shoes, sunscreen, insect repellent, and a hat. 
                  Evenings can be cool, so bring a light jacket. For cultural experiences, we suggest modest clothing 
                  that respects local customs. We'll send you a detailed packing list upon booking confirmation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-montserrat font-semibold mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Quick responses via WhatsApp
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="https://wa.me/27832841272" target="_blank" rel="noopener noreferrer">
                  Chat Now
                </a>
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-montserrat font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Speak with our team directly
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="tel:+27796560543">
                  Call Us
                </a>
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-montserrat font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed inquiry
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="mailto:zululamiecoresort@gmail.com">
                  Email Us
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
