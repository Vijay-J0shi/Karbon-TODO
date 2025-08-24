import React, { createContext, useState } from 'react'
export const authDataContext = createContext()
function AuthContext({children}) {
    const serverUrl = "https://karbon-todo.onrender.com"

    let [loading,setLoading]=useState(false)
    const [authOp,setAuthOp]=useState("");
    let value={
        serverUrl,
        loading,setLoading,
        authOp, setAuthOp
    }
  return (
    <div>
     <authDataContext.Provider value={value}>
        {children}
     </authDataContext.Provider>
    </div>
  )
}

export default AuthContext

