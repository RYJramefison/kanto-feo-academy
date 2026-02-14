
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-cream to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">
                Contactez-<span className="text-primary">nous</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Une question ? N'hésitez pas à nous contacter. Notre équipe vous répondra dans les plus brefs délais.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="font-serif text-2xl font-bold text-charcoal">
                  Informations de contact
                </h2>
                
                <div className="space-y-6">
                  <Card className="border-2 hover:border-primary transition-colors">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Téléphone / WhatsApp</h3>
                        <a href="tel:+261341234567" className="text-muted-foreground hover:text-primary">
                          +261 34 12 345 67
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary transition-colors">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href="mailto:contact@kantofeo.mg" className="text-muted-foreground hover:text-primary">
                          contact@kantofeo.mg
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary transition-colors">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Adresse</h3>
                        <p className="text-muted-foreground">
                          Antananarivo, Madagascar
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary transition-colors">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Horaires d'assistance</h3>
                        <p className="text-muted-foreground">
                          Lun - Sam: 8h - 18h
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nom complet</label>
                        <Input placeholder="Votre nom" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="votre@email.mg" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Téléphone</label>
                      <Input placeholder="+261 34 XX XXX XX" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sujet</label>
                      <Input placeholder="Sujet de votre message" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea 
                        placeholder="Votre message..." 
                        rows={5}
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Contact;
