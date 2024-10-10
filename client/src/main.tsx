import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { AuthContextProvider } from './context/AuthContext'
import { TodosContextProvider } from './context/TodoContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
        <TodosContextProvider>
            <App />
        </TodosContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
