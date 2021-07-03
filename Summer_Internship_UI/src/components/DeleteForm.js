import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvoice } from '../actions/invoiceAction';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { deleteInvoiceAPI } from '../services/services';
import { emptyChecked } from '../actions/invoiceAction';

const useStyles = makeStyles((theme) => ({
    delete_main: {
        background: '#2A3E4C',
        display: 'flex',
        flexDirection: 'column',
        width: '25rem',
        height: 'fit-content',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
        color: '#FFFFFF',
        borderRadius: '10px',
    },
    delete_header: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        alignItems: 'center',
        borderBottom: '1.5px solid #283A46'
    },
    delete_body: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1.5px solid #283A46',
        color: '#C0C6CA',
        fontSize: '0.85rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
    },
    delete_footer_btns: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
        alignItems: 'center',
    },
    closeIcon: {
        cursor: 'pointer',
        fontSize: '1.3rem'
    },
    cancelBtn: {
        borderColor: '#14AFF1',
        color: '#ffffff',
        fontSize: '0.85rem',
        textTransform: 'None',
        borderRadius: '10px',
        marginRight: '1rem',
    },
    deleteBtn: {
        color: '#ffffff',
        fontSize: '0.85rem',
        textTransform: 'None',
        borderRadius: '10px',
        background: '#14AFF1',
        "&:hover": {
            background: '#14AFF1',
        }
    },
}))

const DeleteForm = React.forwardRef(({handleClose}, ref) => {
    const classes = useStyles();

    const selected = useSelector(state => state.checked)
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(selected);
    }, [])

    const handleDelete = () => {
        let payload = {
            doc_ids: [...selected]
        }
        deleteInvoiceAPI(payload)
        .then(() => {
            dispatch(deleteInvoice(selected));
            dispatch(emptyChecked());
            handleClose();
        })
    }

    return (
        <div className={classes.delete_main}>
            <div className={classes.delete_header}>
                <h3 style={{fontWeight: '400'}}>Delete record(s)?</h3>
                <CloseIcon className={classes.closeIcon} onClick={handleClose}/>
            </div>
            <div className={classes.delete_body}>
                <p>You'll lose your record(s) after this action. We can't recover them once you delete.</p>
                <p> Are you sure you want to <span style={{color: '#FF5E5E'}}>permanently delete</span> them?</p>
            </div>
            <div className={classes.delete_footer_btns}>
                <Button 
                    className={classes.cancelBtn} 
                    variant="outlined"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button 
                    className={classes.deleteBtn} 
                    variant="contained"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
})

export default DeleteForm;
