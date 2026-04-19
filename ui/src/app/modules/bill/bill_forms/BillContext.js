import { createContext, useState } from 'react'

const billContext = createContext()

function BillProvider({children}) {

  const [billDetails, setBillDetails] = useState({});

  return (
    <billContext.Provider value={{billDetails, setBillDetails}}>
      {children}
    </billContext.Provider>
  )
}

export { billContext, BillProvider }
