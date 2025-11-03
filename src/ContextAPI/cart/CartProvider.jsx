import { useNavigate } from "react-router-dom"
import TokenContext from "../token/createContext"
import CartContext from "./createContext"
import { useContext, useEffect, useState } from "react"
import {toast} from 'react-hot-toast'
function CartProvider({children}) {
 const [cartItems,setCartItems] = useState([])
 const [cartUpdated,setCartUpdated] = useState(false)
 const [totalPrice,setTotalprice] = useState()
 const {isAuthenticated,setIsAuthenticated} = useContext(TokenContext)
 const navigate = useNavigate()

  useEffect(()=>{
       const fetchCart = async()=>{
         if(!isAuthenticated){
           return
         }
         try{
          const response = await fetch('http://localhost:3000/cart/fetch-cart-products',{
             method:'GET',
             credentials:'include'
          })
          const data = await response.json()
          console.log(data)
          setCartItems(data.existingUserCart.items)
          setTotalprice(data.existingUserCart.totalPrice)
 
         }catch(err){
            console.log(err)
         }
       }
       fetchCart()
     },[cartUpdated,isAuthenticated])

const addToCart = async({productId,quantity,size,price}) => {
  console.log(size)
    if (!size) {
      toast.error('Please select a size before adding to cart.');
      return;
    }
    if(!isAuthenticated){
    toast("Login to add Items in Cart!", {
  icon: "⚠️", 
  style: {
    background: "#fef3c7", 
    color: "#92400e",       
  },
  
})
 return; 
  }
    try{
      const response = await fetch('http://localhost:3000/cart/add-to-cart',{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json',
          
        },
        body:JSON.stringify({productId,quantity,size,price})
      })
      const data = await response.json()
      
      if(response.ok){
        toast.success('Product added to cart')
        setCartUpdated(prev=>!prev)
      }

    }catch(err){
        console.log(err)
    }

    
  };


  const handleDelete = async(productId,size)=>{
       try{
      
        const res = await fetch('http://localhost:3000/cart/remove-item',{
          method:'DELETE',
          credentials:'include',
          headers:{
          'Content-Type':'application/json',
          
          },
          body:JSON.stringify({productId,size})
        })
        const data = await res.json()
        console.log(data.cart.items,'cart')
        setCartItems(data.cart.items)
        setCartUpdated(prev=>!prev)


       }catch(err){
        console.log(err)
       }
    }

    const handleLogout = async()=>{
        try{
          const res = await fetch('http://localhost:3000/user/log-out',{
            credentials:'include'
          })
    
          if(res.ok){
            
            setIsAuthenticated(false)
            setCartItems([]);
        
    
           toast.success('Logged Out successfully')
           navigate('/')
          }
    
        }catch(err){
          console.log(err)
        }
      }

  return (
    
    <CartContext.Provider value={{cartItems,setCartItems,addToCart,totalPrice,handleDelete,handleLogout}}>
        {children}
    </CartContext.Provider>
    
  )
}

export default CartProvider