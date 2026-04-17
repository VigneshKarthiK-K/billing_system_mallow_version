import axios from "axios";
import { api_host } from '../../../constants'

async function createBillApi(bill_data) {
  var response = await axios({
    method: "post",
    url: `${api_host}/bill/create/`,
    data: bill_data
  })
  return response
}

export { createBillApi }

