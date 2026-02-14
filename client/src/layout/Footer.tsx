import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo-kanto-feo.png";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <img src={logo} alt="Kanto-Feo Academy" className="h-15 w-auto" />
            <p className="text-sm text-gray-300 leading-relaxed">
              Avelao hiteny ny talentanao - Laissez parler votre talent. 
              Apprenez la musique en ligne avec les meilleurs professeurs de Madagascar.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <p  className="text-sm text-gray-300 hover:text-primary transition-colors">
                Accueil
              </p>
              <p  className="text-sm text-gray-300 hover:text-primary transition-colors">
                Instruments
              </p>
              <p  className="text-sm text-gray-300 hover:text-primary transition-colors">
                À propos
              </p>
              <p className="text-sm text-gray-300 hover:text-primary transition-colors">
                Inscription
              </p>
            </nav>
          </div>

          {/* Instruments */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Instruments</h4>
            <nav className="flex flex-col gap-2">
              <p  className="text-sm text-gray-300 hover:text-primary transition-colors">
                Guitare
              </p>
              <p className="text-sm text-gray-300 hover:text-primary transition-colors">
                Piano
              </p>
              <p className="text-sm text-gray-300 hover:text-primary transition-colors">
                Batterie
              </p>
              <p className="text-sm text-gray-300 hover:text-primary transition-colors">
                Violon
              </p>
              <p  className="text-sm text-gray-300 hover:text-primary transition-colors">
                Chant
              </p>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:+261341234567" 
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                +261 34 12 345 67
              </a>
              <a 
                href="https://wa.me/261341234567" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                WhatsApp
              </a>
              <a 
                href="mailto:contact@kantofeo.mg" 
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                contact@kantofeo.mg
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-primary" />
                Antananarivo, Madagascar
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <span className="text-sm text-gray-400">Paiement sécurisé via :</span>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-orange-500 rounded-lg text-sm font-semibold">
                Orange Money
              </div>
              <div className="px-4 py-2 bg-red-600 rounded-lg text-sm font-semibold">
                Airtel Money
              </div>
              <div className="px-4 py-2 bg-yellow-500 text-charcoal rounded-lg text-sm font-semibold">
                MVola
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Kanto-Feo Academy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
