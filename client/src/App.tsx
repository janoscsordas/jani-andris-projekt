import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login.tsx"
import SignUp from "./components/SignUp.tsx"

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}
