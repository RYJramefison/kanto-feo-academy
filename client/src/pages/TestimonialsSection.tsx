import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ravo Andrianarisoa",
    instrument: "Guitare",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Grâce à Kanto-Feo Academy, j'ai pu réaliser mon rêve de jouer de la guitare. Les cours sont clairs et progressifs, parfaits pour les débutants comme moi !",
  },
  {
    name: "Mialy Rakotomalala",
    instrument: "Piano",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Le suivi personnalisé fait toute la différence. Mon professeur adapte les leçons à mon niveau et mes objectifs. Je recommande vivement !",
  },
  {
    name: "Ny Aina Razafy",
    instrument: "Batterie",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Le paiement via Orange Money rend tout simple. Plus besoin de se déplacer, j'apprends la batterie depuis chez moi avec des vidéos de qualité.",
  },
  {
    name: "Harilala Randrianasolo",
    instrument: "Chant",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Les exercices vocaux sont progressifs et bien expliqués. J'ai amélioré ma technique en quelques semaines seulement. Misaotra be !",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-charcoal text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ce que disent nos <span className="text-primary">élèves</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Rejoignez plus de 500 élèves qui ont déjà fait confiance à Kanto-Feo Academy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.instrument}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
