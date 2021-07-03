import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {predict} from '../../actions/invoiceAction';
import {predictAPI} from '../../services/services';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    predictButton: {
        color: '#FFFFFF',
        background: '#14AFF1',
        borderRadius: '10px',
        borderColor: '#14AFF1',
        textTransform: 'none',
        padding: '0.2rem 1rem',
        marginRight: '0.6rem',
        "&:hover": {
            background: '#14AFF1'
        },
        "&:disabled": {
            background: '#97A1A9',
            color: '#FFFFFF',
            borderColor: '#97A1A9'
        }
    }
}))

function PredictButton() {
    const classes = useStyles();

    const invoiceData = useSelector(state => state.invoiceData);
    const checked = useSelector(state => state.checked);
    const dispatch = useDispatch();

    const handlePredict = () => {
        const selectedInvoicesData = invoiceData.filter((invoice) => {
            return checked.includes(invoice.doc_id)
        })

        const payload = {
            data: [...selectedInvoicesData],
            id: 1802315
        }

        predictAPI(payload)
        .then((res) => {
            console.log(res.data)
            dispatch(predict([...res.data], checked))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <Button 
                className={classes.predictButton}
                disableRipple
                variant="outlined"
                disabled={checked.length > 0 ? false : true}
                onClick={handlePredict}
            >
                Predict
            </Button>
        </>
    )
}

export default React.memo(PredictButton);
