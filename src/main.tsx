import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ChakraProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ChakraProvider>
  </BrowserRouter>
)
