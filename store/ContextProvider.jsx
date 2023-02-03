import React, { createContext } from 'react'
const tokenContext = createContext(null)

function ContextProvider() {
  return (
    <div>ContextProvider</div>
  )
}

export default ContextProvider