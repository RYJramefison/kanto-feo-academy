import { Contact } from "lucide-react";
import HeroSection from "./components/HeroSection";
import About from "./pages/About";
import BenefitsSection from "./pages/BenefitsSection";
import Instruments from "./pages/Instruments";
import TestimonialsSection from "./pages/TestimonialsSection";

function Home(){
    return (
        <div>
            <HeroSection/>
            <BenefitsSection/>
            <About/>
            <Instruments/>
            <TestimonialsSection/>
            <Contact/>
        </div>
    )
}
export default Home;