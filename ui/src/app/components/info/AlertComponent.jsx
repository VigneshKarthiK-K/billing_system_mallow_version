import { createContext, useEffect, useState } from 'react'
import { Snackbar, Alert, AlertTitle } from '@mui/material';

function AlertComponent({open=false, autoHideTime=5000, severity='success', message='msg'}) {
  const [show, setShow] = useState(false);

  useEffect(()=>{
    setShow(open)
  }, [open])
  
  return (
    <Snackbar
      open={show}
      autoHideDuration={autoHideTime} // 5 seconds
      onClose={() => {setShow(false)}}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        onClose={() => {setShow(false)}}
        variant="filled"
      >
        <AlertTitle>{
          severity === 'success'
          ? 'Success'
          : severity === 'error'
          ? 'Error'
          : severity === 'warning'
          ? 'Warning'
          : severity === 'info'
          ? 'Info'
          : 'Alert'
        }</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  )
}

const AlertContext = createContext();

export { AlertContext }
export default AlertComponent
