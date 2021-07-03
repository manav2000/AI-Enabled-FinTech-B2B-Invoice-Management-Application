import React, {useState, useEffect} from 'react';
import { CircularProgress, Checkbox } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {getInvoiceAPI} from '../services/services';
import {formatter,dateFormatter,checkDueDate} from '../utils/formatter';
import {useSelector, useDispatch} from 'react-redux';
import {getInvoices, emptyInvoiceData, setChecked, emptyChecked} from '../actions/invoiceAction';
// import { connect } from 'react-redux';
import TableRowOptimized from './TableRowOptimized';
import Error from './Error';

const useStyles = makeStyles((theme) => ({
    table: {
        maxHeight: '64vh'
    },
    tableCell: {
        borderBottom: '1px solid #283A46'
    },
    loadingDiv: {
        height: "10%", 
        margin: 'auto',
        paddingTop: '4%',
        overflow: "hidden" , 
        paddingBottom: '2%',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    stickyHeader: {
        backgroundColor: 'rgb(40, 58, 70) !important',
    }
}))

const columns = [
    { id: 'checkbox', minWidth: 10 },
    { id: 'name_customer', label: 'Customer Name', minWidth: 140 },
    { id: 'cust_number', label: 'Customer \u0023', minWidth: 70 },
    {
        id: 'invoice_id',
        label: 'Bill \u0023',
        minWidth: 70,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'total_open_amount',
        label: 'Bill Amount',
        minWidth: 100,
        align: 'right',
        format: (value) => formatter(value),
    },
    {
        id: 'due_in_date',
        label: 'Due Date',
        minWidth: 80,
        align: 'right',
        format: (value) => dateFormatter(value),
    },
    {
        id: 'predicted_payment_date',
        label: 'Predicted Payment Date',
        minWidth: 150,
        align: 'right',
        format: (value) => dateFormatter(value),
    },
    {
        id: 'predicted_aging_bucket',
        label: 'Predicted Aging Bucket',
        minWidth: 150,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'notes',
        label: 'Notes',
        minWidth: 120,
        align: 'right',
        format: (value) => value.slice(0,15) + "...",
    },
];

const CustomCheckbox = withStyles({
    root: {
        color:"#97A1A9",
        "&$checked": {
            color: "#14AFF1",
        },
        "&:hover": {
            background: "none",
        }
    },
    checked: {
        
    }
})(Checkbox);

function MainTable({search, setSearch}) {
    const classes = useStyles();
    const invoiceData = useSelector(state => state.invoiceData);
    const checked = useSelector(state => state.checked);
    const dispatch = useDispatch();

    const [isNext, setNext] = useState(false);
    const [page, setPageCount] = useState(1);

    useEffect(() => {
        if(search.length === 0) {
            dispatch(emptyChecked());
            dispatch(emptyInvoiceData());
            getInvoiceAPI(1)
            .then(res => {
                console.log("running on page", page);
                dispatch(getInvoices(res.data));
                setPageCount(page+1);
                setNext(true);
            });
        } else {
            if(page !== 1) {
                setPageCount(1);
            }
            if(checked.length > 0) { 
                dispatch(emptyChecked());
            }
        }
    }, [search])

    const fetchMoreData = () => {
        getInvoiceAPI(page)
        .then(res => {
            dispatch(getInvoices(res.data));
            setNext(true)
            setPageCount(page + 1);
        });
    }
    
    const handleToggleAll = (e) => {
        if (e.target.checked) {
            const newSelecteds = invoiceData.map((invoice) => invoice.doc_id);
            dispatch(setChecked(newSelecteds));
            return;
        }
        dispatch(setChecked([]));
    }

    return (
        <>
            {
                search !== '' && invoiceData.length === 0 ?
                    <Error setSearch={setSearch}/>
                :
                <InfiniteScroll
                    dataLength={invoiceData.length}
                    hasMore={search === ''? isNext : false}
                    next={search === ''? fetchMoreData : null}
                    loader={
                        <div className={classes.loadingDiv}>
                            <CircularProgress style={{color:'#14AFF1'}}/>
                            <p style={{color:'#FFFFFF', fontSize:'0.8rem'}}>Loading</p>
                        </div>
                    }
                    height='64vh'
                    style={{
                        width:'95.6vw'
                    }}
                >
                    <Table stickyHeader aria-label="simple table">
                        <TableHead style={{fontSize: '0.8rem'}}>
                        <TableRow>
                            {columns.map((column) => {
                                if(column.id === 'checkbox') {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth,
                                                paddingTop:'0rem', 
                                                paddingBottom:'0.2rem',
                                            }}
                                            classes={{
                                                root: classes.tableCell,
                                                stickyHeader: classes.stickyHeader
                                            }}
                                        >
                                            <CustomCheckbox
                                                edge="end"
                                                onChange={(e) => handleToggleAll(e)}
                                                // checked={checked.indexOf(data["doc_id"]) !== -1}
                                                disableRipple
                                                size="small"
                                            />
                                        </TableCell>
                                    )
                                } else {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, 
                                            color: '#97A1A9',paddingTop:'0rem', 
                                            paddingBottom:'0.2rem', fontSize: '0.85rem'}}
                                            classes={{
                                                root: classes.tableCell,
                                                stickyHeader: classes.stickyHeader
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                }
                            })}
                        </TableRow>
                        </TableHead>
                        <TableBody style={{color: '#FFFFFF'}}>
                        {invoiceData.map((data, index) => (
                            <TableRowOptimized data={data} index={index} key={data.doc_id}
                            checked={checked}/>
                        ))}
                        </TableBody>
                    </Table>
                </InfiniteScroll>
            }
        </>
    )
}

export default React.memo(MainTable);
