import { createContext, useContext, useState } from 'react'
import Container from '@mui/material/Container'
import BillForm from './bill_form/BillForm'
import DenoPopup from './deno_form/DenoPopup'
import { BillProvider } from './BillContext';


function CreateBillPage() {
  
  const [denoShow, setDenoShow] = useState(false);
  

  return (
    <div>
      <BillProvider>
        <Container maxWidth="sm">
          <BillForm cashClicked={()=>{ setDenoShow(true) }}/>
          <DenoPopup denoShow={denoShow} denoClose={()=>{ setDenoShow(false) }}/>
        </Container>
      </BillProvider>
    </div>
  )
}

export default CreateBillPage
