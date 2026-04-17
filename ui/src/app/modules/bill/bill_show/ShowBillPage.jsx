import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { LoadingComponent } from '../../../components';
import { fetchBillById } from '../../../redux/slices';
import BillShow from './bill_layout/BillShow';
import { Container, Stack, Typography } from '@mui/material';

function ShowBillPage() {
  const { bill_id } = useParams()
  console.log('kvk bill_id', bill_id)
  const dispatch = useDispatch();

  // api
  const { bill, loading, error } = useSelector((state) => state.bill);
  console.log('kvk bill', bill)
  useEffect(() => {
    dispatch(fetchBillById(bill_id));
  }, [dispatch, bill_id]);
  
  return (
    <div>
      {loading ? (
        <LoadingComponent/>
      ) : (
        <>
          {error ? (
            <Stack alignItems={'center'} justifyContent={'center'} sx={{height: '445px'}}>
              <Typography variant='h4'>Something went wrong</Typography>
            </Stack>
          ) : (
            <Container>
              <BillShow bill={bill}/>
            </Container>
          )}
        </>
      )}
    </div>
  )
}

export default ShowBillPage
