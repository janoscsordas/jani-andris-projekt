import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLogin } from "@/hooks/useLogin"
import { EyeClosedIcon, EyeIcon } from "lucide-react"

export default function Login() {
    const [passwordIsSeen, setPasswordIsSeen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, error, isLoading } = useLogin()

    const handlePasswordVisibility = () => {
        setPasswordIsSeen(!passwordIsSeen)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-background">
            <h1 className="text-3xl font-bold text-white text-center mb-1">Bejelentkezés a fiókba</h1>
            <p className="text-gray-400 text-sm mb-4">A belépéshez írja be az email címét és a jelszavát</p>
            <form onSubmit={handleLogin}>
                <Input
                    className="w-[20rem] mb-2"
                    type="email"
                    placeholder="Email cím"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <div className="relative">
                    <Input
                        type={passwordIsSeen ? "text" : "password"}
                        placeholder="Jelszó"
                        required={true}
                        maxLength={24}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={handlePasswordVisibility} className="z-50 absolute right-2 top-1.5 cursor-pointer text-gray-300">
                        {passwordIsSeen ? <EyeClosedIcon /> : <EyeIcon />}
                    </span>
                </div>
                {error && <p className="text-red-500 w-[20rem] my-1">{error}</p>}
                <Button type="submit" className="w-[20rem] mt-2">Bejelentkezés</Button>
            </form>
            <p className="text-gray-400 text-sm mt-4">Még nincs fiókja? <a className="text-primary underline" href="/signup">Regisztáció</a></p>
        </div>
    )
}
