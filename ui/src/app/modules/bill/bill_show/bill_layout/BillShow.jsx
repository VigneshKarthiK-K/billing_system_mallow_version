import { 
  CardHeader, Divider, IconButton, Paper, Stack, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow,
  Typography
} from '@mui/material'
import { PrintIcon } from '../../../../asserts/icons';

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
      <BillSummary bill={bill}/>
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

function BillSummary({bill}) {

  const Row = ({ label, value, bold, negative }) => {
    return (
      <Stack direction="row" justifyContent="space-between">
        <Typography>{label}</Typography>
        <Typography
          fontWeight={bold ? 'bold' : 'normal'}
          color={negative ? 'error.main' : 'text.primary'}
        >
          {Number(value).toFixed(2)}
        </Typography>
      </Stack>
    );
  }

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        maxWidth: 500,
        ml: 'auto', // 👈 right align
      }}
      elevation={3}
    >
      <Stack spacing={1.5}>
        
        <Row label="Total price without tax:" value={bill?.total_without_tax} />
        <Row label="Total tax payable:" value={bill?.total_tax} />
        
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

export default BillShow
