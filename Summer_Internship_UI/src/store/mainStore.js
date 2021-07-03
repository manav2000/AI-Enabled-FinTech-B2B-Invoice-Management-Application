import {createStore} from 'redux';
import invoiceReducer from '../reducers/invoiceReducer'

const store = createStore(invoiceReducer)

export default store;