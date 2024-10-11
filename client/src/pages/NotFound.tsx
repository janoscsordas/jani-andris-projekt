import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold mb-1">404</h1>
      <p className="text-2xl mb-3">A keresett oldal nem található</p>
      <Link to="/"><Button>Vissza a főoldalra</Button></Link>
    </div>
  )
}
