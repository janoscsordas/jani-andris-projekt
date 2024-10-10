import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login.tsx"
import SignUp from "@/pages/SignUp.tsx"
import Home from "@/pages/Home.tsx"
import Todos from "@/pages/Todos"
import NotFound from "@/pages/NotFound"
import { useAuthContext } from "./hooks/useAuthContext"
import { TodosContextProvider } from "./context/TodoContext"


export default function App() {
    const { authState } = useAuthContext()

    return (
        <main className="font-mono">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={!authState.user ? <Login /> : <Navigate to="/todos" />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/todos" element={authState.user ? <Todos /> : <Navigate to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}
