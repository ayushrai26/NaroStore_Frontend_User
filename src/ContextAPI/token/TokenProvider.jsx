import TokenContext from "./createContext"
import { useState } from "react"
function TokenProvider({children}) {
  
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  return (
    <div>
        <TokenContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
         {children}
        </TokenContext.Provider>
    </div>
  )
}

export default TokenProvider