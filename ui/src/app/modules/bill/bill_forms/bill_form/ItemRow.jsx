import {memo} from 'react'
import { Autocomplete, ButtonGroup, TextField, Button } from '@mui/material'
import { CloseIcon } from '../../../../asserts/icons'
import { useFetchProducts } from './hooks'

const ItemRow = memo(({
  index, iq, values, touched, errors, 
  setFieldValue, handleChange, remove, setTotalAmount, arrangeItemIdAndQuantity
}) => {

  const products = useFetchProducts()
  const productItems = products.map((p)=>({label: p.name, id: p.product_id}))

  // const getTotalAmount = async (e) => {
  //   handleChange(e); 
  //   // var total_amount = await getTotalAmount(e, index, values)
  //   values['itemsAndQuantity'][index]['quantity'] = e.target.value
  //   var products_and_quantities = arrangeItemIdAndQuantity(values.itemsAndQuantity)
  //   var total_amount = await getTotalAmountApi(products_and_quantities)
  //   setTotalAmount(total_amount)
  // }

  class TotalAmountCalculator {
    constructor(product_details, products_and_quantities) {
      this.product_details = product_details
      this.products_and_quantities = products_and_quantities
    }

    tax_calculator(amount, tax_percentage) {
      var tax = amount * (tax_percentage/100)
      return tax
    }

    calculate_quantity_amount_and_tax(product, quantity) {
      var amount = product.price_per_unit * quantity
      var tax = this.tax_calculator(amount, product.tax_percentage)
      return amount + tax
    }

    get_product(product_id) {
      var product = this.product_details.find(
        (p) => Number(p.product_id) === Number(product_id)
      );
      return product
    }

    calculate() {
      var total_amount = 0
      
      this.products_and_quantities.forEach(pq=>{
        
        var product_id = pq?.product_id
        var quantity = pq?.quantity
        
        if (product_id && quantity) {
          product_id = Number(product_id)
          quantity = Number(quantity)
          var product = this.get_product(product_id)
          var full_amount = this.calculate_quantity_amount_and_tax(product, quantity)
          total_amount += full_amount
        }
      })
      return total_amount
    }
  }

  const getTotalAmount = (e) => {
    handleChange(e); 
    values['itemsAndQuantity'][index]['quantity'] = e.target.value
    var products_and_quantities = arrangeItemIdAndQuantity(values.itemsAndQuantity)

    const tac = new TotalAmountCalculator(products, products_and_quantities)
    const total_amount = tac.calculate()
    setTotalAmount(total_amount)
  }

  return (
    <ButtonGroup key={index} fullWidth sx={{my:1}}>
      <Autocomplete
        fullWidth
        options={productItems}
        getOptionLabel={(option) => option.label}
        value={iq.item}
        onChange={(e, value) => {
          console.log('kvk value', value)
          setFieldValue(`itemsAndQuantity[${index}].item`, value)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={
              touched.itemsAndQuantity?.[index]?.item &&
              errors.itemsAndQuantity?.[index]?.item
            }
            label={
              touched.itemsAndQuantity?.[index]?.item &&
              errors.itemsAndQuantity?.[index]?.item
              ? errors.itemsAndQuantity?.[index]?.item
              : 'Item'
            }
            error={
              touched.itemsAndQuantity?.[index]?.item &&
              Boolean(errors.itemsAndQuantity?.[index]?.item)
            }
            size='small'
          />
        )}
      />

      <TextField
        fullWidth
        name={`itemsAndQuantity[${index}].quantity`}
        label={
          touched.itemsAndQuantity?.[index]?.quantity &&
          errors.itemsAndQuantity?.[index]?.quantity
            ? errors.itemsAndQuantity[index].quantity
            : "Quantity"
        }
        value={iq.quantity}
        onChange={getTotalAmount}
        error={
          touched.itemsAndQuantity?.[index]?.quantity &&
          Boolean(errors.itemsAndQuantity?.[index]?.quantity)
        }
        
        size='small'
      />

      <Button variant='contained' color='error' sx={{width: '10%'}}
        onClick={() => remove(index)}
      >
        <CloseIcon/>
      </Button>
    </ButtonGroup>
  )
})

export default ItemRow
