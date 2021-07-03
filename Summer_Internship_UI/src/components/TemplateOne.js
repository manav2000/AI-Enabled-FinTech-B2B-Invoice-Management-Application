import React from 'react';
import TemplateTable from './TemplateTable';
import { formatter } from '../utils/formatter';

function TemplateOne(props) {

    return (
        <>
            <p>Subject: <span style={{color:'#ffffff'}}>Invoice Details - HighRadius</span></p>
            <p> Dear Sir/Madam, <br/>Greetings! </p>
            <p>This is to remind you that there are one or more open invoices on your account. lease provide at your earliest convenience an update on the payment details or clarify the reason for the delay. If you have any specific issue with the invoice(s), please let us know so that we can address it to the correct Department.</p>
            <p> Please find the details of the invoices below:</p>
            <TemplateTable {...props}/>
            <p>
                Total Amount to be Paid: <span style={{color:'#ffffff'}}>${formatter(props.total)}</span>
            </p>
            <p>In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. <br />Let us know if we can be of any further assistance. Looking forward to hearing from you.</p>
            <p>Kind Regards, <br />Manav Parmar <br />Phone : 9823647590 <br />Fax : -- <br />Email : manavparmar@gmail.com <br />HighRadius</p>
        </>
    )
}

export default TemplateOne
