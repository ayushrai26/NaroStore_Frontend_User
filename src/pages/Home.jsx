import Intro from './home/Intro'
import Collection from './home/Collection'
import Customize from './home/Customize'
import About from './home/About'
import {Routes,Route} from 'react-router-dom'
import ProductPage from './product/ProductPage'
import Cart from '../components/Cart'
import DeliveryAddress from './checkout/DeliveryAddress'
import Profile from '../components/Profile'
import Success from './checkout/Success'
import Cancel from './checkout/Cancel'
import ContactUs from './Footer/ContactUs'
import ShippingInfo from './Footer/ShippingInfo'
import Returns from './Footer/Returns'
import FAQ from './Footer/FAQ'
import AuthModal from '../components/AuthModel'

function Home() {
  return (
    <>
    <Routes>
     <Route path='/' element={<Intro/>}/>   
    <Route path='/collection' element={<Collection/>}/>
    <Route path="/product/:productId" element={<ProductPage />} />
    <Route path='/customize' element={<Customize/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/cart' element={<Cart/>}/>
    
    <Route path='/user-profile' element={<Profile/>}/>
    <Route path ='/checkout' element={<DeliveryAddress/>}/>
    <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contact" element={<ContactUs />} />
<Route path="/shipping" element={<ShippingInfo />} />
<Route path="/returns" element={<Returns />} />
<Route path="/faq" element={<FAQ/>} />
<Route path="/login" element={<AuthModal />} />

    </Routes>
    
    
    </>
  )
}

export default Home