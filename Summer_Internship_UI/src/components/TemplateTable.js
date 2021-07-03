import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {formatter,dateFormatter} from '../utils/formatter';

const StyledTableCell = withStyles({
    head: {
        color: '#97A1A9',
        padding: '0.5rem',
        fontSize: '0.85rem !important',
        borderBottom: '0.1px solid #1A262F'
    },
    body: {
        color: '#ffffff',
        padding: '0.5rem',
        borderBottom: 'none',
        fontSize: '0.85rem !important'
    }
})(TableCell);

function TemplateTable({templateData}) {

    return (
        <>
        <Table id="correspondence-table" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Bill Number</StyledTableCell>
                    <StyledTableCell align="left">PO Number</StyledTableCell>
                    <StyledTableCell align="left">Bill date</StyledTableCell>
                    <StyledTableCell align="right">Due Date</StyledTableCell>
                    <StyledTableCell align="right">Currency</StyledTableCell>
                    <StyledTableCell align="right">Open Amount($)</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {templateData.map((row, index) => (
                <TableRow 
                    key={row.invoice_id} 
                    style={{
                        background: (index+1)%2===0 ?'#283A46':''
                    }}
                >
                    <StyledTableCell component="th" scope="row">
                        {row.invoice_id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.invoice_id}</StyledTableCell>
                    <StyledTableCell align="left">{row.posting_date ? dateFormatter(row.posting_date) : ''}</StyledTableCell>
                    <StyledTableCell align="right">{dateFormatter(row.due_in_date)}</StyledTableCell>
                    <StyledTableCell align="right">{row.invoice_currency ? row.invoice_currency : 'USD'}</StyledTableCell>
                    <StyledTableCell align="right">{formatter(row.total_open_amount)}</StyledTableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </>
    )
}

export default TemplateTable;
