import React, { createContext, useState } from 'react'
export const authDataContext = createContext()
function AuthContext({children}) {
    const serverUrl = "http://localhost:8000"

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
