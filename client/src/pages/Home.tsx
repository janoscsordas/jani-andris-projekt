import { Button } from "@/components/ui/button"
import { MinusIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background">
            <h1 className="sm:text-6xl text-4xl lg:text-8xl text-center font-bold mb-16">
                TODO LISTA APP
            </h1>
            <section className="flex md:flex-row flex-col md:gap-6 items-center md:items-end">
                <div className="flex flex-col">
                    <span className="text-gray-300 mb-2 text-center select-none">Van már fiókod? Jelentkezz be!</span>
                    <Link to="/login">
                        <Button className="w-[20rem] mt-2">Bejelentkezés</Button>
                    </Link>
                </div>
                <MinusIcon className="w-10 h-10 " />
                <div className="flex flex-col">
                    <span className="text-gray-300 mb-2 text-center select-none">Még nincs fiókod? Regisztrálj!</span>
                    <Link to="/signup">
                        <Button className="w-[20rem] mt-2">Regisztráció</Button>
                    </Link>
                </div>
            </section>
        </div>
    )  
}