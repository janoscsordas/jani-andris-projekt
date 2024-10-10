import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login.tsx"
import SignUp from "@/pages/SignUp.tsx"
import Home from "@/pages/Home.tsx"

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}
