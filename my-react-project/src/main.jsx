import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary"
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './features/store.js'

import ErrorFallback from './pages/ErrorFallback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
