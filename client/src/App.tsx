import HeroSection from "./components/HeroSection"
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import About from "./pages/About"
import BenefitsSection from "./pages/BenefitsSection"
import Contact from "./pages/Contact"
import CTASection from "./pages/CTASection"
import Instruments from "./pages/Instruments"
import TestimonialsSection from "./pages/TestimonialsSection"



function App() {
  

  return (
    <div>
      <Header/>
      <HeroSection/>
      <BenefitsSection/>
      <About/>
      <Instruments/>
      <TestimonialsSection/>
      <CTASection/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
