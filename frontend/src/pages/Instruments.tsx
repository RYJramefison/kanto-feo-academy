import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";
import { instrumentService } from "@/services/instrumentService";
import type { Instrument } from "@/types";
import { toast } from "sonner";

const Instruments = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstruments();
  }, []);

  const loadInstruments = async () => {
    console.log('Instruments.tsx - Début du chargement des instruments');
    try {
      console.log('Instruments.tsx - Appel à instrumentService.getAll()');
      const data = await instrumentService.getAll();
      console.log('Instruments.tsx - Données reçues du service:', data);
      console.log('Instruments.tsx - Nombre d\'instruments:', data.length);
      setInstruments(data);
      console.log('Instruments.tsx - Instruments state mis à jour');
    } catch (error) {
      console.error('Instruments.tsx - Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des instruments');
    } finally {
      setLoading(false);
      console.log('Instruments.tsx - Loading set à false');
    }
  };

  const getInstrumentEmoji = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('guitar') || lowerName.includes('guitare')) return '';
    if (lowerName.includes('piano')) return '';
    if (lowerName.includes('batter')) return '';
    if (lowerName.includes('violin')) return '';
    if (lowerName.includes('chant') || lowerName.includes('sing')) return '';
    return '';
  };

  const getInstrumentImage = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('guitar') || lowerName.includes('guitare')) return "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=400&fit=crop";
    if (lowerName.includes('piano')) return "https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&h=400&fit=crop";
    if (lowerName.includes('batter')) return "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop";
    if (lowerName.includes('violin')) return "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600&h=400&fit=crop";
    if (lowerName.includes('chant') || lowerName.includes('sing')) return "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop";
    return "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop";
  };

  if (loading) {
    console.log('Instruments.tsx - Render: loading state, instruments count:', instruments.length);
    return (
      <section id="instruments" className="min-h-screen flex flex-col">
        <main className="flex-1">
          <section className="py-20 bg-linear-to-b from-cream to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="animate-pulse">
                  <div className="h-12 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    );
  }

  console.log('Instruments.tsx - Render: not loading, instruments count:', instruments.length);
  console.log('Instruments.tsx - Render: instruments data:', instruments);

  return (

    <section id="instruments" className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-linear-to-b from-cream to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">
                Nos <span className="text-primary">instruments</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Choisissez parmi notre sélection d'instruments et commencez votre parcours musical dès aujourd'hui.
              </p>
            </div>
          </div>
        </section>

        {/* Instruments List */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {instruments.map((instrument, index) => (
                <Card 
                  key={instrument.id} 
                  className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300"
                >
                  <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <img 
                        src={getInstrumentImage(instrument.name)}
                        alt={instrument.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 to-transparent lg:bg-linear-to-r" />
                      <div className="absolute bottom-4 left-4 text-5xl">
                        {getInstrumentEmoji(instrument.name)}
                      </div>
                    </div>
                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="font-serif text-3xl">{instrument.name}</CardTitle>
                          <Badge variant="secondary">Disponible</Badge>
                        </div>
                        <CardDescription className="text-base">
                          {instrument.description || 'Apprenez à maîtriser cet instrument avec nos cours professionnels.'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex flex-wrap gap-2 mb-6">
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            Débutant
                          </Badge>
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            Intermédiaire
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1">
                            <Play className="h-4 w-4" /> Cours vidéo
                          </span>
                        </div>
                        <Button className="gap-2 bg-primary hover:bg-primary/90">
                          Voir les cours
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Instruments;
