import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {formatter,dateFormatter,checkDueDate} from '../utils/formatter';
import {setChecked} from '../actions/invoiceAction';
import { connect } from 'react-redux';


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


const tableRowStyles = () => ({
    tableCell: {
        borderBottom: '1px solid #283A46'
    }
})

class TableRowOptimized extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.checked.includes(this.props.data.doc_id) || this.props.checked.includes(this.props.data.doc_id)) {
            return true;
        }
        return false;
    }

    handleToggle = (value) => () => {
        const currentIndex = this.props.checked.indexOf(value);
        const newChecked = [...this.props.checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.props.setChecked(newChecked);
        console.log(this.props.checked);
    };

    render() {
        const {data,index,checked,classes} = this.props;
        return (
            <>
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
                                    paddingTop:'0.2rem',
                                    paddingBottom: '0.2rem',
                                    color: '#ffffff'
                                }}
                                classes={{root: classes.tableCell}}
                            >
                                <CustomCheckbox
                                    key={data.doc_id}
                                    edge="end"
                                    onChange={this.handleToggle(data["doc_id"])}
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
                                    color: column.id === "due_in_date" ? 
                                    checkDueDate(data["due_in_date"]) ?
                                    "#FF5B5B":"#ffffff"
                                    :'#ffffff',
                                    paddingTop:'0.2rem',
                                    paddingBottom: '0.2rem'  
                                }}
                                classes={{root: classes.tableCell}}
                            >
                                {column.format && data[column.id]
                                    ? column.format(value)
                                    : value
                                }
                            </TableCell>
                        )
                    }
                })}
            </TableRow>   
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setChecked: (value) => dispatch(setChecked(value))
})

export default connect(null,mapDispatchToProps)(withStyles(tableRowStyles)(TableRowOptimized));