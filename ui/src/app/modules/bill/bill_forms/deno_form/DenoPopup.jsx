import { useState } from 'react'
import { CloseIcon, TollIcon } from '../../../../asserts/icons'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import DenoForm from './DenoForm'


function DenoPopup({denoShow, denoClose}) {

  const [denoAmountTotal, setDenoAmountTotal] = useState(0);

  return (
    <Dialog open={denoShow} onClose={denoClose} maxWidth={'lg'}>
      <DialogTitle sx={{pt: '5px', pb: '5px', pl: '18px', pr: '10px', minHeight: 'auto' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <TollIcon/>
            <Typography variant={'subtitle1'}>
              {'Denominators Form'}
              <Typography sx={{fontSize: 10, ml: 0.2, display:'block'}}>
                {'Enter customer given amounts'}
              </Typography>
            </Typography>
          </Stack>
          <IconButton onClick={denoClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{py: '7px'}}>
        <Box>
          <DenoForm setDenoAmountTotal={setDenoAmountTotal}/>
        </Box>
      </DialogContent>
      <DialogActions sx={{py: 1, px: 2, minHeight: 'auto' }}>
        <Stack sx={{width: '100%'}} justifyContent={'center'} >
          <Button type='submit' form='deno-form' variant={'contained'} color={'primary'} size={'small'}>
            {denoAmountTotal ? (`Pay ${denoAmountTotal}`) : ('Submit')}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default DenoPopup
