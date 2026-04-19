import { Container, Stack, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import useFormConfigs from './hooks/useFormConfigs'
import { getTotalAmount } from './utils'


function DenoForm({setDenoAmountTotal}) {

  const { initialValues, onSubmit } = useFormConfigs()

  const calculateAndSetDenoTotal = (values) => {
    const total = getTotalAmount(values)
    setDenoAmountTotal(total);
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({values, handleChange, handleSubmit, setFieldValue}) => (
          <Container sx={{width: 340}}>
            <form onSubmit={handleSubmit} id='deno-form'>
              {[1, 2, 5, 10, 20, 50, 100, 200, 500].reverse().map((amt)=>(
                <Stack key={`key-${amt}`} direction={'row'} spacing={3} justifyContent={'flex-end'} alignItems={'center'} sx={{my: 0.1}}>
                  <Typography variant={'subtitle1'}>{amt}s</Typography>
                  <TextField size='small' 
                    name={`${amt}`} placeholder={`Enter ${amt} rupess count`} 
                    value={values[`${amt}`] || ""} 
                    onChange={(e) => { 
                      handleChange(e); 
                      let updatedValues = {
                        ...values,
                        [amt]: e.target.value
                      };
                      calculateAndSetDenoTotal(updatedValues);
                    }}
                  />
                </Stack>
              ))}
            </form>
          </Container>
        )}
      </Formik>
    </>
  )
}

export default DenoForm
