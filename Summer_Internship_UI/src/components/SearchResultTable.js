import React, { useEffect} from 'react';
import { Checkbox } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import {getInvoiceAPI, searchAPI} from '../services/services';
import {formatter,dateFormatter,checkDueDate} from '../utils/formatter';
import {useSelector, useDispatch} from 'react-redux';
import {setChecked,emptyChecked} from '../actions/invoiceAction';
// import {getInvoices, emptyInvoiceData, searchInvoice} from '../actions/invoiceAction';
import Error from './Error';


const useStyles = makeStyles((theme) => ({
    table: {
        height: '64vh',
        width: '95vw'
    },
    tableCell: {
        borderBottom: '1px solid #283A46'
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

function SearchResultTable({search, setSearch}) {
    const classes = useStyles();

    const invoiceData = useSelector(state => state.invoiceData);
    const checked = useSelector(state => state.checked);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(emptyChecked());
    }, [search])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        dispatch(setChecked(newChecked));
        console.log(checked)
    };

    const handleToggleAll = (e) => {
        if (e.target.checked) {
            const newSelecteds = invoiceData.map((invoice) => invoice.doc_id);
            dispatch(setChecked(newSelecteds));
            return;
        }
        dispatch(emptyChecked());
    }

    return (
        <>
         {invoiceData.length > 0 ?
          <TableContainer className={classes.table}>
                    <Table 
                        stickyHeader 
                        aria-label="simple table"
                    >
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
                            <TableRow 
                                role="checkbox" 
                                tabIndex={-1} 
                                key={data.doc_id}
                                style={{
                                    background: checked.includes(data.doc_id) 
                                                ? '#2A5368' 
                                                : (index+1)%2===0 ?'#283A46':''
                                }}
                            >
                                {columns.map((column) => {
                                    if(column.id === 'checkbox') {
                                        return (
                                            <TableCell
                                                key={column.id} 
                                                align={column.align}
                                                style={{
                                                    color: '#ffffff',paddingTop:'0.2rem',
                                                    paddingBottom: '0.2rem'
                                                }}
                                                classes={{root: classes.tableCell}}
                                            >
                                                <CustomCheckbox
                                                    key={data.doc_id}
                                                    edge="end"
                                                    onChange={handleToggle(data["doc_id"])}
                                                    checked={checked.indexOf(data["doc_id"]) !== -1}
                                                    disableRipple
                                                    size="small"
                                                />
                                            </TableCell>
                                        )
                                    } else {
                                        const value = data[column.id] ? data[column.id] : "--"
                                        return (
                                            <TableCell 
                                                key={column.id} 
                                                align={column.align}
                                                style={{
                                                    paddingTop:'0.2rem',
                                                    paddingBottom: '0.2rem',
                                                    color: column.id === "due_in_date" ? 
                                                    checkDueDate(data["due_in_date"]) ?
                                                    "#FF5B5B":"#ffffff"
                                                    :'#ffffff',
                                                }}
                                                classes={{root: classes.tableCell}}
                                            >
                                                {column.format && data[column.id]
                                                    ? column.format(value)
                                                    : column.id === "invoice_id" ?
                                                        <>
                                                        <span style={{background:'#2A5368',padding:'0.2rem 0rem'}}>
                                                            {data[column.id].toString().substring(0,search.length)}
                                                        </span>
                                                        <span style={{padding:'0.2rem 0rem'}}>
                                                            {data[column.id].toString().substring(search.length)}
                                                        </span>
                                                        </>
                                                        :
                                                        value
                                                }
                                            </TableCell>
                                        )
                                    }
                                })}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Error setSearch={setSearch}/>
            }
        </>
    )
}

export default SearchResultTable;
