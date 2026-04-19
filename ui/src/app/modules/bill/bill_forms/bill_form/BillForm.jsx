import { useState } from 'react'

import { Formik, FieldArray } from "formik"

import { Button, TextField, CardHeader, ButtonGroup, Stack, Typography } from '@mui/material'
import { ReceiptLongIcon, AddIcon, PaymentsIcon } from '../../../../asserts/icons';
import { useFormConfigs } from './hooks';
import ItemRow from './ItemRow';

function BillForm({cashClicked}) {
  
  const [totalAmount, setTotalAmount] = useState(0);
  const { 
    initialValues, 
    validationSchema, 
    onSubmit, 
    arrangeItemIdAndQuantity 
  } = useFormConfigs()

  return (
    <>
      <CardHeader title="Create Bill Form" avatar={<ReceiptLongIcon/>} />
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
                </>
              )}
            </FieldArray>

            <Stack flexDirection='row' justifyContent={'center'} alignItems={'center'} alignContent={'center'} sx={{mt: 2}}>
              <ButtonGroup>
                <Button type='submit' color='info' title='Cash' variant="contained" startIcon={<PaymentsIcon/>} 
                  onClick={() => { 
                    setFieldValue('payment_method', 'cash')
                    cashClicked() 
                  }}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Stack>

          </form>
        )}
      </Formik>
    </>
  )
}



export default BillForm