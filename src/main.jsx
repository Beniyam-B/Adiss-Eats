import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx'
import ErrorBoundary from './componenets/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RecentlyViewedProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecentlyViewedProvider>
    </ErrorBoundary>
  </StrictMode>,
)