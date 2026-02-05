import { Brain, Heart, Lightbulb, Target, Clock, Award } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Améliore la concentration",
    description: "La pratique musicale développe votre capacité de focus et de mémorisation.",
  },
  {
    icon: Heart,
    title: "Réduit le stress",
    description: "Jouer d'un instrument est une thérapie naturelle contre l'anxiété et le stress quotidien.",
  },
  {
    icon: Lightbulb,
    title: "Développe la créativité",
    description: "Exprimez-vous artistiquement et libérez votre potentiel créatif.",
  },
  {
    icon: Target,
    title: "Renforce la discipline",
    description: "Apprenez la persévérance et la rigueur à travers la pratique régulière.",
  },
  {
    icon: Clock,
    title: "Apprenez à votre rythme",
    description: "Des cours disponibles 24/7, progressez selon vos disponibilités.",
  },
  {
    icon: Award,
    title: "Suivi personnalisé",
    description: "Suivez votre progression et obtenez des recommandations adaptées.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Pourquoi apprendre la <span className="text-primary">musique</span> ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La musique n'est pas qu'un hobby, c'est un véritable outil de développement personnel.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
