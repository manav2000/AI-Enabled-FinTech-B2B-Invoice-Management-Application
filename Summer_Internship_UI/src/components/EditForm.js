import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import {editInvoice} from '../actions/invoiceAction';
import {putInvoiceAPI} from '../services/services';
import SnackBar from  './SnackBar';

const useStyles = makeStyles((theme) => ({
    edit_main: {
        background: '#2A3E4C',
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        height: 'fit-content',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
        color: '#FFFFFF',
        borderRadius: '10px'
    },
    edit_header: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        alignItems: 'center',
        borderBottom: '1.5px solid #283A46'
    },
    edit_body: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1.5px solid #283A46'
    },
    edit_body_inputs: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'flex-start',
    },
    edit_footer_btns: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'center',
    },
    label: {
        color: '#97A1A9',
        fontSize: '0.85rem'
    },
    cancelBtn: {
        color: '#14AFF1',
        fontSize: '0.85rem',
        textTransform: 'None',
        border: '10px',
    },
    resetBtn: {
        borderColor: '#14AFF1',
        color: '#ffffff',
        fontSize: '0.85rem',
        textTransform: 'None',
        borderRadius: '10px',
        marginRight: '0.5rem',
    },
    saveBtn: {
        color: '#ffffff',
        fontSize: '0.85rem',
        textTransform: 'None',
        borderRadius: '10px',
        background: '#14AFF1',
        "&:hover": {
            background: '#14AFF1',
        }
    },
    closeIcon: {
        cursor: 'pointer',
        fontSize: '1.3rem'
    },
    error: {
        fontSize: '0.75rem',
        color: 'red',
        margin: 'auto'
    },
    inputRoot: {
        fontSize: '0.85rem',
        color: '#ffffff',
    },
    inputMarginDense:{
        paddingTop: '0.3rem !important',
        paddingBottom: '0.3rem !important',
    },
    inputNotch: {
        borderColor: '#356680 !important',
    }
}))

const EditForm = React.forwardRef(({handleClose}, ref) => {
    const classes = useStyles();

    const invoiceData = useSelector(state => state.invoiceData);
    const selected = useSelector(state => state.checked);
    const dispatch = useDispatch();

    const [dataToEdit, setDataTOEdit] = React.useState({});
    const [invoiceAmt, setInvoiceAmt] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [error, setError] = React.useState(false);

    const [snackbarOpen, setSnackBarOpen] = React.useState(false);

    const handleSBClose = () => {
        setSnackBarOpen(false)
    };

    React.useEffect(() => {
        console.log(selected);
        setDataTOEdit(invoiceData.find((obj) => obj.doc_id === selected[0]))
    },[])

    const handleSave = () => {
        let payload = {
            doc_id: dataToEdit.doc_id,
            total_open_amount: invoiceAmt ? invoiceAmt : dataToEdit.total_open_amount,
            notes: notes ? notes : dataToEdit.notes
        }
        console.log(payload)
        putInvoiceAPI(payload)
        .then(res => {
            dispatch(editInvoice(payload));
            setError(false);
            handleClose();
        })
        .catch((error) => {
            setError(true);
            setSnackBarOpen(true);
        })
    }

    const handleReset = () => {
        setInvoiceAmt('');
        setNotes('');
    }

    return (
        <>
        <div className={classes.edit_main}>
            <div className={classes.edit_header}>
                <h3 style={{fontWeight: '400'}}>Edit Invoice</h3>
                <CloseIcon className={classes.closeIcon} onClick={handleClose}/>
            </div>
            <div className={classes.edit_body}>
                <div className={classes.edit_body_inputs}>
                    <label className={classes.label}>Bill Amount</label>
                    <OutlinedInput
                        id="amount"
                        value={invoiceAmt}
                        onChange={(e) => setInvoiceAmt(e.target.value)}
                        placeholder={Number(dataToEdit.total_open_amount).toString()}
                        margin="dense"
                        style={{
                            width:'13rem',
                            marginLeft: '1rem',
                            height: '2rem',
                        }}
                        classes={{
                            root: classes.inputRoot,
                            inputMarginDense: classes.inputMarginDense,
                            notchedOutline: classes.inputNotch
                        }}
                        startAdornment={<InputAdornment disableTypography position="start">$</InputAdornment>}
                    />
                </div>
                <div className={classes.edit_body_inputs}>
                    <label className={classes.label}>Notes</label>
                    <TextField
                        id="notes"
                        multiline
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{
                            width:'13rem'
                        }}
                        InputProps={{
                            classes: {
                                root: classes.inputRoot,
                                inputMarginDense: classes.inputMarginDense,
                                notchedOutline: classes.inputNotch
                            }
                        }}
                        variant="outlined"
                        placeholder={dataToEdit.notes}
                    />
                </div>
            </div>
            <div >
                <div className={classes.edit_footer_btns}>
                    <Button className={classes.cancelBtn} onClick={handleClose}>Cancel</Button>
                    <div>
                        <Button 
                            className={classes.resetBtn} 
                            variant="outlined"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button 
                            className={classes.saveBtn} 
                            variant="contained"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        { error
            ? <SnackBar 
                open={snackbarOpen} 
                handleClose={handleSBClose} 
                error="PLEASE ENTER VALID INPUTS"
            />
            : <></>
        }
        </>
    )
})

export default EditForm;
