import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './features/store.js'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {error:false, errorInfo:""}
  }
  static getDerviedStateFromError(error) {
    return {error:true}
  }
  componentDidCatch(error, errorInfo) {
    this.setState({errorInfo})
    console.error()
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
