import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";

const instruments = [
  {
    id: "guitare",
    name: "Guitare",
    emoji: "🎸",
    description: "Apprenez à jouer de la guitare acoustique ou électrique. Du premier accord jusqu'aux solos les plus techniques.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=400&fit=crop",
    levels: ["Débutant", "Intermédiaire", "Avancé"],
    lessons: 35,
    students: 180,
  },
  {
    id: "piano",
    name: "Piano",
    emoji: "🎹",
    description: "Maîtrisez le piano classique, jazz ou variété. Développez votre technique et votre expression musicale.",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&h=400&fit=crop",
    levels: ["Débutant", "Intermédiaire", "Avancé"],
    lessons: 42,
    students: 150,
  },
  {
    id: "batterie",
    name: "Batterie",
    emoji: "🥁",
    description: "Devenez un batteur accompli. Rythmes, fills, coordination et techniques avancées.",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop",
    levels: ["Débutant", "Intermédiaire", "Avancé"],
    lessons: 28,
    students: 95,
  },
  {
    id: "violon",
    name: "Violon",
    emoji: "🎻",
    description: "Explorez la beauté du violon. Technique classique et répertoire moderne.",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600&h=400&fit=crop",
    levels: ["Débutant", "Intermédiaire"],
    lessons: 30,
    students: 45,
  },
  {
    id: "chant",
    name: "Chant",
    emoji: "🎤",
    description: "Développez votre voix avec des techniques vocales professionnelles et de l'interprétation.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
    levels: ["Débutant", "Intermédiaire", "Avancé"],
    lessons: 25,
    students: 120,
  },
];

const Instruments = () => {
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
                        src={instrument.image}
                        alt={instrument.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 to-transparent lg:bg-gradient-to-r" />
                      <div className="absolute bottom-4 left-4 text-5xl">
                        {instrument.emoji}
                      </div>
                    </div>
                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="font-serif text-3xl">{instrument.name}</CardTitle>
                          <Badge variant="secondary">{instrument.lessons} leçons</Badge>
                        </div>
                        <CardDescription className="text-base">
                          {instrument.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {instrument.levels.map((level) => (
                            <Badge key={level} variant="outline" className="border-primary/50 text-primary">
                              {level}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1">
                            <Play className="h-4 w-4" /> {instrument.lessons} vidéos
                          </span>
                          <span>•</span>
                          <span>{instrument.students} élèves</span>
                        </div>
                        {/* <Link to={`/instruments/${instrument.id}`}> */}
                          <Button className="gap-2 bg-primary hover:bg-primary/90">
                            Voir les cours
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        {/* </Link> */}
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
