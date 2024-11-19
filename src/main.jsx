import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/header/Header'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContextProvider'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
