import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './ContextAPI/theme/ThemeProvider.jsx';
import TokenProvider from './ContextAPI/token/TokenProvider.jsx';
import CartProvider from './ContextAPI/cart/CartProvider.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <TokenProvider>
    <CartProvider>
  <ThemeProvider>
    
  
    <App />
  

  </ThemeProvider>
  </CartProvider>
  </TokenProvider>
  </BrowserRouter>
  
  
)
