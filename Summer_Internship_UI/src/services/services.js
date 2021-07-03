import axios from 'axios';
import { SERVER_URL,ROLL_NUMBER,ML_SERVER_URL } from '../utils/constants';


export function getInvoiceAPI(page_number) {
  return axios.get(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`,{
      params: { page: page_number }
    }
  )
}

export function getCorrespondenceData(invoice_ids) {
  return axios.get(
    `${SERVER_URL}${ROLL_NUMBER}/Correspondence`,{
      params: { 
        invoice_ids: invoice_ids.length > 50 
        ? invoice_ids.slice(0,51).join(",") : invoice_ids.join(",") 
      }
    }
  )
}

export function searchAPI(invoice_id) {
  return axios.get(
    `${SERVER_URL}${ROLL_NUMBER}/Search`,{
      params: { search: invoice_id }
    }
  )
}

export function addInvoiceAPI(payload) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, payload
  )
}

export function putInvoiceAPI(payload) {
  return axios.put(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, payload
  )
}

export function deleteInvoiceAPI(payload) {
  return axios.delete(
    `${SERVER_URL}${ROLL_NUMBER}/InvoiceCRUD`, {data: payload}
  )
}

export function predictAPI(payload) {
  return axios.post(
    `${ML_SERVER_URL}/predict`, payload
  )
}