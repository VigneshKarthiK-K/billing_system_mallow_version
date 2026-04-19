import { useContext } from "react"
import { billContext } from "../../BillContext"
import { createBillApi } from "../../api"
import { AlertContext } from '../../../../../components';
import { useNavigate } from 'react-router-dom';

const useFormConfigs = () => {

  const { billDetails, setBillDetails } = useContext(billContext)
  const { showAlert } = useContext(AlertContext)
  const navigate = useNavigate();

  const initialValues = { 1: '', 2: '', 5: '', 10: '', 20: '', 50: '', 100: '', 200: '', 500: '' }
  const onSubmit = (values) => {

    const filteredDeno = Object.fromEntries(Object.entries(values).filter(([, val]) => val))
    
    let updatedBill = {
      ...billDetails,
      deno: filteredDeno
    }
    setBillDetails(updatedBill)

    setTimeout(async ()=>{
      var response = await createBillApi(updatedBill)
      
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
    })
  }

  return { initialValues, onSubmit }
}

export default useFormConfigs