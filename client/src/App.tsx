import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login.tsx"
import SignUp from "@/pages/SignUp.tsx"
import Home from "@/pages/Home.tsx"
import Todos from "@/pages/Todos"
import NotFound from "@/pages/NotFound"


export default function App() {

    return (
        <main className="font-mono">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}
