import { useState } from 'react'

import { Formik, FieldArray } from "formik"

import { Button, TextField, CardHeader, ButtonGroup, Stack, Typography } from '@mui/material'
import { ReceiptLongIcon, AddIcon, PaymentsIcon, CreditCardIcon, QrCodeScannerIcon } from '../../../../asserts/icons';
import { useFormConfigs } from './hooks';
import ItemRow from './ItemRow';

function BillForm() {
  
  const [totalAmount, setTotalAmount] = useState(0);
  const { 
    initialValues, 
    validationSchema, 
    onSubmit, 
    arrangeItemIdAndQuantity 
  } = useFormConfigs()

  return (
    
    <>
      <CardHeader
        avatar={<ReceiptLongIcon/>}
        title="Create Bill Form"
      />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit, setFieldValue}) => (
          <form onSubmit={handleSubmit}>
            <TextField fullWidth size='small' margin='normal' name='email' label='Customer Email' 
            value={values.email} onChange={handleChange} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email}/>
            
            <FieldArray name='itemsAndQuantity'>
              {({push, remove}) => (
                <>
                  {values.itemsAndQuantity.map((iq, index)=>(
                    <ItemRow 
                      key={index} 
                      iq={iq} 
                      index={index} 
                      remove={remove} 
                      setFieldValue={setFieldValue} 
                      values={values} 
                      touched={touched} 
                      errors={errors} 
                      handleChange={handleChange} 
                      setTotalAmount={setTotalAmount} 
                      arrangeItemIdAndQuantity={arrangeItemIdAndQuantity} 
                    />
                  ))}

                  <Stack flexDirection='row' justifyContent={'space-between'} alignItems={'center'} alignContent={'center'} sx={{mt: 2}}>

                    <Typography sx={{mr: 2, px: 2, py: 1, textWrap: 'nowrap'}}>
                      <span style={{fontSize: 15, color: 'gray'}}>Total Amount (tax inc):</span> {totalAmount}
                    </Typography>
                    

                    <Button color='success' variant="contained" sx={{minWidth: '43px', width: '43px', ml: 2}} onClick={() => push({ item: null, quantity: '' })}>
                      <AddIcon/>
                    </Button>
                  </Stack>

                  <Stack flexDirection='row' justifyContent={'center'} alignItems={'center'} alignContent={'center'} sx={{mt: 2}}>
                    <ButtonGroup>
                      <Button color='info' title='Cash' type="submit" variant="contained" startIcon={<PaymentsIcon/>} onClick={() => { setFieldValue('payment_method', 'cash') }}>
                        Cash
                      </Button>
                      <Button color='secondary' title='Card' type="submit" variant="contained" startIcon={<CreditCardIcon/>} onClick={() => { setFieldValue('payment_method', 'card') }}>
                        Card
                      </Button>
                      <Button color='warning' title='UPI' type="submit" variant="contained" startIcon={<QrCodeScannerIcon/>} onClick={() => { setFieldValue('payment_method', 'upi') }}>
                        UPI
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </>
              )}
            </FieldArray>
          </form>
        )}
      </Formik>
    </>
  )
}



export default BillForm