import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Card } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AlertContext } from '../../components'
import { registerVisitor } from './api'

function VisitorForm() {

  const { showAlert } = useContext(AlertContext)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      company: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Too short'),
      company: Yup.string()
        .required('Company is required')
    }),
    onSubmit: async (values) => {
      
      var visitor_details = {
        name: values?.name,
        company: values?.company
      }
      var response = await registerVisitor(visitor_details)
      
      if (response.status === 201) {
        var message = response?.data?.message
        
        showAlert({
          message: message, 
          autoHideTime: 3000
        })

        setTimeout(() => {
          navigate(
            `/bill/create/`, 
            { replace: true }
          )
        }, 3000);
      }
    }
  })


  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 10, p: 5, pb: 6 }}>
      
      <Typography variant={'subtitle1'}>
        Hi welcome to this app, my owner wants to know the visitors, so please
        write your name and company, thanks
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        
        <TextField
          fullWidth
          size='small'
          margin="normal"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          size='small'
          margin="normal"
          label="Company"
          name="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2, mx: 'auto', display: 'block' }}
        >
          Submit
        </Button>

      </form>
    </Card>
  )
}

export default VisitorForm