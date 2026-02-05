
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-cream to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">
                À propos de <span className="text-primary">Kanto-Feo Academy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                "Avelao hiteny ny talentanao" - Laissez parler votre talent. 
                Notre mission est de rendre l'apprentissage musical accessible à tous les Malgaches.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-charcoal mb-6">
                  Notre histoire
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Kanto-Feo Academy est née d'une passion profonde pour la musique et d'un 
                    constat simple : l'enseignement musical reste encore trop peu accessible à Madagascar.
                  </p>
                  <p>
                    Fondée en 2024, notre académie s'est donnée pour mission de démocratiser 
                    l'apprentissage de la musique grâce aux nouvelles technologies, tout en 
                    s'adaptant aux réalités locales avec des solutions de paiement mobile.
                  </p>
                  <p>
                    Aujourd'hui, nous accompagnons plus de 500 élèves dans leur parcours musical, 
                    de la première note jusqu'à la maîtrise de leur instrument.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop"
                  alt="Cours de musique"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-charcoal text-center mb-12">
              Nos valeurs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Des cours de qualité professionnelle dispensés par des musiciens expérimentés.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Accessibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Rendre la musique accessible à tous, partout à Madagascar.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Un suivi personnalisé pour vous accompagner à chaque étape.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif">Passion</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Transmettre l'amour de la musique avec enthousiasme et dévouement.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
