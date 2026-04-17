import { useContext } from 'react';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { createBillApi } from '../../api';
import { AlertContext } from '../../../../../components';

function useFormConfigs() {

  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext)

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

  const onSubmit = async (values) => {
    console.log('values', values)
    var products_and_quantities = arrangeItemIdAndQuantity(values.itemsAndQuantity)
    var bill_data = {
      email: values.email,
      products_and_quantities: products_and_quantities,
      payment_method: values.payment_method
    }
    var response = await createBillApi(bill_data)
    
    if (response.status === 201) {
      var message = response?.data?.message
      var bill_id = response?.data?.bill_id
      
      showAlert({
        message: message, 
        autoHideTime: 3000
      })

      setTimeout(() => {
        navigate(`/bill/show/${bill_id}`);  
      }, 3000);
    }
  }

  return {
    initialValues,
    validationSchema,
    onSubmit,
    arrangeItemIdAndQuantity
  }
}

export default useFormConfigs