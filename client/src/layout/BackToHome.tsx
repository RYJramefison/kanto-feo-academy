import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BackToHome = () => {
  const navigate = useNavigate()

  return (
   <button
  onClick={() => navigate("/")}
  className="
    fixed top-8 left-8
    flex items-center gap-2
    px-4 py-2
    rounded-full
    text-primary
    bg-background/80 backdrop-blur-md
    border border-border
    shadow-md
    text-sm font-medium
    hover:bg-primary hover:text-white
    hover:scale-105
    active:scale-95
    transition-all duration-200
  "
>
  <ArrowLeft className="h-4 w-4" />
  Retour à l'accueil
</button>

  )
}

export default BackToHome
