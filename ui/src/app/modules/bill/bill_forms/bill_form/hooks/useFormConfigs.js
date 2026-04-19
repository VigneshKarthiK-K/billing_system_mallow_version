import { useContext } from 'react';
import * as Yup from 'yup'
import { billContext } from '../../BillContext';

function useFormConfigs() {

  const { billDetails, setBillDetails } = useContext(billContext)

  const initialValues = {
    email: '',
    itemsAndQuantity: [{ item: null, quantity: '' }]
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email Required"),
    itemsAndQuantity: Yup.array().of(
      Yup.object({
        item: Yup.object().required("Item required"),
        quantity: Yup.number().min(1, "Min 1").required("Quantity Required")
      })
    )
  })

  function arrangeItemIdAndQuantity(itemsAndQuantity) {
    var products_and_quantities = []
    
    itemsAndQuantity.forEach((v)=>{
      var product_id = v?.item?.id
      var quantity = v?.quantity
      if(product_id && quantity) {
        var row_obj = {}
        row_obj['product_id'] = v?.item?.id
        row_obj['quantity'] = v.quantity
        products_and_quantities.push(row_obj)
      }
    })
    return products_and_quantities
  }

  const onSubmit = (values) => {
    
    var products_and_quantities = arrangeItemIdAndQuantity(values.itemsAndQuantity)

    var bill_data = {
      email: values.email,
      products_and_quantities: products_and_quantities,
      payment_method: values.payment_method
    }

    setBillDetails(bill_data)
    
  }

  return {
    initialValues,
    validationSchema,
    onSubmit,
    arrangeItemIdAndQuantity
  }
}

export default useFormConfigs