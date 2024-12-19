import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/header/Header'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                
                <AuthProvider>
                    <Header />
                    <App />
                </AuthProvider>
            </QueryClientProvider>

        </BrowserRouter>
    </StrictMode>,
)
