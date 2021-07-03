export const getInvoices = (newInvoiceData) => {
    return {
        type: "GET_INVOICES",
        payload: {
            invoiceData: newInvoiceData
        }
    }    
}

export const emptyInvoiceData = () => {
    console.log("emptyInvoiceData")
    return {
        type: "EMPTY_INVOICES"
    }
}

export const searchInvoice = (invoiceData) => {
    return {
        type: "SEARCH_INVOICE",
        payload: {
            invoiceData: invoiceData
        }
    }
}

export const addInvoice = (invoiceData) => {
    return {
        type: "ADD_INVOICE",
        payload: {
            invoiceData: invoiceData
        }
    }
}

export const editInvoice = (invoiceData) => {
    return {
        type: "EDIT_INVOICE",
        payload: {
            invoiceData: invoiceData
        }
    }
}

export const deleteInvoice = (invoice_ids) => {
    return {
        type: "DELETE_INVOICE",
        payload: {
            invoice_ids: invoice_ids
        }
    }
}

export const predict = (predicted_values, checked) => {
    console.log(predicted_values)
    return {
        type: "PREDICT",
        payload: {
            predicted_values: predicted_values,
            selected: checked
        }
    }
}

export const setChecked = (value) => {
    return {
        type: "CHECKED",
        payload: {
            value: value
        }
    }
}

export const emptyChecked = () => {
    console.log("emptyChecked")
    return {
        type: "EMPTY_CHECKED"
    }
}