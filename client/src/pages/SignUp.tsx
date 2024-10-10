import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSignup } from "@/hooks/useSignup"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { signup, isLoading, error, success } = useSignup()

    const navigate = useNavigate()
    const [passwordIsSeen, setPasswordIsSeen] = useState(false)

    const handlePasswordVisibility = () => {
        setPasswordIsSeen(!passwordIsSeen)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await signup(name, email, password)

        setTimeout(() => {
            navigate("/login")
        }, 3000)
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background">
            <h1 className="text-3xl font-bold text-white text-center mb-1">Fiók létrehozása</h1>
            <p className="text-gray-400 text-sm mb-4">A regisztációhoz adja meg a felhasználó nevét, email címét és egy jelszót</p>
            <form onSubmit={handleSubmit}>
                <Input
                    className="w-[20rem] mb-2"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Felhasználó név"
                    required={true}
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    className="w-[20rem] mb-2"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email cím"
                    required={true}
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative">
                    <Input
                        type={passwordIsSeen ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Jelszó"
                        required={true}
                        maxLength={24}
                        disabled={isLoading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <span
                        onClick={handlePasswordVisibility}
                        className="z-50 absolute right-2 top-1.5 cursor-pointer text-gray-300"
                    >
                        {passwordIsSeen ? <EyeClosedIcon /> : <EyeIcon />}
                    </span>
                </div>
                {error && <p className="text-red-500 w-[20rem] my-1">{error}</p>}
                {success && <p className="text-green-600 w-[20rem] my-1">{success}</p>}
                <Button type="submit" className="w-[20rem] mt-2" disabled={isLoading}>Regisztráció</Button>
            </form>
            <p className="text-gray-400 text-sm mt-4">Már van fiókja? <a className="text-primary underline" href="/login">Bejelentkezés</a></p>
        </div>
    )
}
