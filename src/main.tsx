import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from './app/store'
import InternetConnectionProvider from './providers/InternetConnectionProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <BrowserRouter>
          <ChakraProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </ChakraProvider>
        </BrowserRouter>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
)