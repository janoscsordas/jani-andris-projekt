import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUp() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background">
            <h1 className="text-3xl font-bold text-white text-center mb-1">Fiók létrehozása</h1>
            <p className="text-gray-400 text-sm mb-4">A regisztációhoz hozzon létre felhasználó nevet, jelszót és adja meg az email címét</p>
            <form action="">
                <Input className="w-[20rem] mb-2" type="text" placeholder="Felhasználó név" required={true} />
                <Input className="w-[20rem] mb-2" type="email" placeholder="Email cím" required={true} />
                <div className="relative">
                    <Input placeholder="Jelszó" required={true} maxLength={24} />
                </div>
                <Button type="submit" className="w-[20rem] mt-2">Regisztráció</Button>
            </form>
            <p className="text-gray-400 text-sm mt-4">Már van fiókja? <a className="text-primary underline" href="/login">Bejelentkezés</a></p>
        </div>
    )
}