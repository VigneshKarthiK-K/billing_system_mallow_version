import axios from 'axios'
import { api_host } from '../../constants'

async function registerVisitor(visitor_details) {
  var response = await axios({
    method: 'post',
    url: `${api_host}/visitor/register/`,
    data: visitor_details
  })
  return response
}

export { registerVisitor }
