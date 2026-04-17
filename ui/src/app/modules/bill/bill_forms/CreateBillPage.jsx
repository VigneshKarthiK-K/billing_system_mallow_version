import React from 'react'
import Container from '@mui/material/Container'
import BillForm from './bill_form/BillForm'


function CreateBillPage() {
  
  return (
    <div>
      <Container maxWidth="sm">
        <BillForm/>
      </Container>
    </div>
  )
}

export default CreateBillPage
