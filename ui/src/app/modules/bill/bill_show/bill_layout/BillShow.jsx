import { 
  CardHeader, Divider, IconButton, Paper, Stack, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow,
  Typography
} from '@mui/material'
import { PrintIcon } from '../../../../asserts/icons';
import { getTotalAmount } from '../../bill_forms/deno_form/utils';
import { getReturnDenominations } from './utils';

function BillShow({bill}) {
  return (
    <>
      <Stack alignContent={'center'} alignItems={'center'}>
        <CardHeader
          title='Bill Show'
          action={
            <IconButton onClick={() => window.print()} title='print'>
              <PrintIcon/>
            </IconButton>
          }
          sx={{
            textAlign: 'center',
            '& .MuiCardHeader-title': {
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }
          }}
        />
      </Stack>
      <Typography sx={{ px: 3, py: 2, color: 'text.secondary' }}>
        <strong>Email: </strong>{bill?.customer_email}
      </Typography>
      <BillTable bill={bill}/>
      {bill && (
        <Stack direction={'row'} justifyContent={'space-around'}>
          <DenoSummary bill={bill}/>
          <BillSummary bill={bill}/>
        </Stack>
      )}
    </>
  )
}

function BillTable({bill}) {

  const headerStyle = {
    '& .MuiTableCell-root': {
      backgroundColor: 'secondary.main',
      color: 'white',
      // fontWeight: 'bold',
      borderRadius: '100'
    },
    '& .MuiTableCell-root:first-of-type': {
      borderTopLeftRadius: '5px',
    },
    '& .MuiTableCell-root:last-of-type': {
      borderTopRightRadius: '5px',
    },
  };

  const formatNumber = (value) => {
    return Number.isInteger(Number(value))
      ? Number(value)
      : Number(value).toFixed(2);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={headerStyle}>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Purchase Price</TableCell>
              <TableCell align="right">Tax (%) for item</TableCell>
              <TableCell align="right">Tax Payable for item</TableCell>
              <TableCell align="right">Total price of the item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bill?.items.map((item, idx)=>(
              <TableRow 
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white'
                }}
              >
                <TableCell>{formatNumber(item.product.product_id)}</TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell align='center'>{formatNumber(item.quantity)}</TableCell>
                <TableCell align="right">{formatNumber(item.product.price_per_unit)} rs</TableCell>
                <TableCell align="right">{formatNumber(item.product_bill_amount)} rs</TableCell>
                <TableCell align="center">{formatNumber(item.product.tax_percentage)}</TableCell>
                <TableCell align="right">{formatNumber(item.tax_amount)} rs</TableCell>
                <TableCell align="right">{formatNumber(item.total_amount)} rs</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const Row = ({ label, value, bold, negative }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography>{label}</Typography>
      <Typography
        fontWeight={bold ? 'bold' : 'normal'}
        color={negative ? 'error.main' : 'text.primary'}
      >
        {value}
      </Typography>
    </Stack>
  );
}

function BillSummary({bill}) {

  return (
    <Paper
      sx={{
        mt: 2,
        px: 3,
        py: 2,
        borderRadius: 3,
        width: '45%',
        maxHeight: '114px'
      }}
      elevation={3}
    >
      <Stack spacing={1.5}>
        
        <Row label="Total price without tax:" value={Number(bill?.total_without_tax).toFixed(2)} />
        <Row label="Total tax payable:" value={Number(bill?.total_tax).toFixed(2)} />
        
        <Divider />

        <Row
          label="Net price of the purchased item:"
          value={bill?.net_price}
          bold
        />

      </Stack>
    </Paper>
  )
}

function DenoSummary({bill}) {
  
  const customerGiven = getTotalAmount(bill?.deno_object)
  const repay_deno_object = getReturnDenominations({paidAmount: customerGiven, netPrice: bill?.net_price})
  const balance_total = getTotalAmount(repay_deno_object)

  return (
    <Paper
      sx={{
        mt: 2,
        py: 2,
        px: 3,
        borderRadius: 3,
        width: '45%',
      }}
      elevation={3}
    >
      <Stack spacing={1.5}>
        
        {Object.keys(repay_deno_object).reverse().map(deno=>(
          <Row label={`${deno}s`} value={repay_deno_object[deno]} />
        ))}
        
        <Divider />

        <Row
          label="Balance:"
          value={balance_total}
          bold
        />
      </Stack>
    </Paper>
  )
}

export default BillShow
