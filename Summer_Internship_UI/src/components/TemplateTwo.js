import React from 'react';
import TemplateTable from './TemplateTable';;

function TemplateTwo(props) {
    return (
        <>
            <p>Subject: <span style={{color:'#ffffff'}}>Invoice Details - HighRadius</span></p>
            <p> Dear Sir/Madam,</p>
            <p>Gentle reminder that you have one or more open invoices on your account. Please get back to us with an expected date of payment. If you have any specific issue with the invoice(s), please let us know so that we can address it at the earliest.</p>
            <p> Please find the details of the invoices below:</p>
            <TemplateTable {...props}/>
            <p>In case you have already made a payment for the above items, please send us the details to ensure the payment is posted.<br/> Let us know if we can be of any further assistance. Looking forward to hearing from you.</p>
            <p>Kind Regards, <br />Manav Parmar <br />Phone : 9823647590 <br />Fax : -- <br />Email : manavparmar@gmail.com <br />HighRadius</p>
        </>
    )
}

export default TemplateTwo;
