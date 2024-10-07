
import { useState } from "react"

import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import tailwindLogo from "./assets/tailwind.svg"

export default function App() {
    const [count, setCount] = useState(0)

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center bg-[#1e1e20]">
            <div className="flex gap-16 items-center mb-16">
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo w-28 h-28" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react w-28 h-28" alt="React logo" />
                </a>
                <a href="https://tailwindcss.com" target="_blank">
                    <img src={tailwindLogo} className="logo tailwind w-28 h-28" alt="TailwindCSS logo" />
                </a>
            </div>
            <h1 className="text-4xl font-mono font-semibold text-gray-300">Vite + React + TailwindCSS</h1>
            <p className="text-gray-300 mt-8">This package was made by <a href="https://github.com/janoscsordas" target="_blank" className="text-[#747bff] hover:underline">Janos Csordas</a></p>
            <div className="mt-8">
                <button className="block mx-auto font-mono bg-zinc-800 text-gray-300 rounded-lg px-5 py-3 mb-6 border border-transparent hover:border-[#747bff] transition-colors duration-200" onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </button>
                <p className="text-white mb-2">
                Edit <code className="text-[#747bff]">src/App.tsx</code> and save to test HMR (Hot Module Reload)
                </p>
            </div>
            <p className="text-white">
                Click on the Vite, React and TailwindCSS logos to learn more
            </p>
        </main>
    )
}
