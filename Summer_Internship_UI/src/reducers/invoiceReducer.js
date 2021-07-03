const initialState = {
    invoiceData: [],
    checked: []
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_INVOICES":
            return {
                ...state,
                invoiceData: [...state.invoiceData, ...action.payload.invoiceData]
            }
        case "EMPTY_INVOICES":
            return {
                ...state,
                invoiceData: []
            }
        case "SEARCH_INVOICE":
            return {
                ...state,
                invoiceData: [...action.payload.invoiceData]
            }
        case "ADD_INVOICE":
            return {
                ...state,
                invoiceData: [action.payload.invoiceData, ...state.invoiceData]
            }
        case "EDIT_INVOICE":
            return Object.assign({}, state, {
                invoiceData: state.invoiceData.map((invoice) => {
                    if(action.payload.invoiceData.doc_id === invoice.doc_id) {
                        return Object.assign({}, invoice, {
                            total_open_amount: action.payload.invoiceData.total_open_amount,
                            notes: action.payload.invoiceData.notes
                        })
                    }
                    return invoice;
                })
            })
        case "DELETE_INVOICE":
            return Object.assign({}, state, {
                invoiceData: state.invoiceData.filter((invoice) => {
                    return !action.payload.invoice_ids.includes(invoice.doc_id)
                })
            })
        case "PREDICT":
            return Object.assign({}, state, {
                invoiceData: state.invoiceData.map((invoice) => {
                    if(action.payload.selected.includes(invoice.doc_id)) {
                        let predicted = action.payload.predicted_values.find((data) => {
                            return data.doc_id === invoice.doc_id
                        })
                        return Object.assign({}, invoice, {
                            predicted_payment_date: predicted.predicted_payment_date,
                            predicted_aging_bucket: predicted.predicted_aging_bucket
                        })
                    }
                    return invoice;
                })
            })
        case "CHECKED":
            return {
                ...state,
                checked: [...action.payload.value]
            }
        case "EMPTY_CHECKED":
            return {
                ...state,
                checked: []
            }
        default:
            return state;
    }
}

export default invoiceReducer;