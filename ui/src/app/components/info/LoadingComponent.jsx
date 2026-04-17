import React from 'react'
import { Box, CircularProgress } from '@mui/material';

function LoadingComponent() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress size={100}/>
    </Box>
  )
}

export default LoadingComponent
