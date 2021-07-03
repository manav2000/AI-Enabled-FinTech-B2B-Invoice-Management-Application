import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {formatter} from './formatter';


const templateOne = (templateData, total) => {
    var doc = new jsPDF();

    doc.setFontSize(14);
    doc.setFont('helvetica', "normal");

    doc.text("Subject: Invoice Details - HighRadius", 10, 20);

    doc.text("Dear Sir/Madam,", 10, 35);
    doc.text("Greetings!", 10, 43);

    doc.text("This is to remind you that there are one or more open invoices on your account. lease ", 10, 58);
    doc.text("provide at your earliest convenience an update on the payment details or clarify the ", 10, 66);
    doc.text("reason for the delay. If you have any specific issue with the invoice(s), please let us ",10,74);
    doc.text("know so that we can address it to the correct Department.", 10, 82);
    doc.text("Please find the details of the invoices below:",10,97);

    autoTable(doc, {
        html: '#correspondence-table',
        theme: 'striped',
        styles: {
            fontSize: 12
        },
        margin: {
            left: 10,
        },
        startY: 110
    });

    var finalY = doc.lastAutoTable.finalY;
    var pageHeight = doc.internal.pageSize.getHeight();

    doc.text(`Total Amount to be Paid: $${formatter(total)}`, 10, finalY+10);

    console.log(finalY);
    console.log(pageHeight);

    doc.text("In case you have already made a payment for the above items, please send us the details", 10, finalY+25);
    doc.text("to ensure the payment is posted.", 10, finalY+33);
    doc.text("Let us know if we can be of any further assistance. Looking forward to hearing from you.", 10, finalY+41);

    doc.text("Kind Regards,", 10, finalY+56);
    doc.text("Manav Parmar", 10, finalY+64);
    doc.text("Phone : 9823647590", 10, finalY+72);
    doc.text("Fax : --", 10, finalY+80);
    doc.text("Email : manavparmar@gmail.com", 10, finalY+88);
    doc.text("HighRadius", 10, finalY+96);

    doc.save('template1.pdf');
}

const templateTwo = (templateData) => {
    var doc = new jsPDF();

    doc.setFontSize(14);
    doc.setFont('helvetica', "normal");

    doc.text("Subject: Invoice Details - HighRadius", 10, 20);

    doc.text("Dear Sir/Madam,", 10, 35);

    doc.text("Gentle reminder that you have one or more open invoices on your account. Please", 10, 50);
    doc.text("get back to us with an expected date of payment. If you have any specific issue", 10, 58);
    doc.text("with the invoice(s), please let us know so that we can address it at the earliest.",10,66);
    doc.text("Please find the details of the invoices below:", 10, 81);
    
    autoTable(doc, {
        html: '#correspondence-table',
        theme: 'striped',
        styles: {
            fontSize: 12
        },
        margin: {
            left: 10,
        },
        startY: 95
    });

    var finalY = doc.lastAutoTable.finalY;
    var pageHeight = doc.internal.pageSize.getHeight();

    doc.text("In case you have already made a payment for the above items, please send us the ", 10, finalY+15);
    doc.text("details to ensure the payment is posted.", 10, finalY+23);
    doc.text("Let us know if we can be of any further assistance. Looking forward to hearing from you.", 10, finalY+31);

    doc.text("Kind Regards,", 10, finalY+46);
    doc.text("Manav Parmar", 10, finalY+54);
    doc.text("Phone : 9823647590", 10, finalY+62);
    doc.text("Fax : --", 10, finalY+70);
    doc.text("Email : manavparmar@gmail.com", 10, finalY+78);
    doc.text("HighRadius", 10, finalY+86);

    doc.save('template2.pdf');
}

export const tablePDF = (templateData, tempNum, total) => {
    if(tempNum === 1) {
        templateOne(templateData, total)
    } else {
        templateTwo(templateData)
    }
}
