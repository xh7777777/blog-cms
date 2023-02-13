import React, { createContext, useState } from 'react'

export const tokenContext = createContext(null)
export const tokenDispatchContext = createContext(null)
function ContextProvider({children}) {
    const [token,setToken] = useState(null)
  return (
    <tokenContext.Provider value={token}>
        <tokenDispatchContext.Provider value={setToken}>
            {children}
        </tokenDispatchContext.Provider>
    </tokenContext.Provider>
  )
}

export default ContextProvider