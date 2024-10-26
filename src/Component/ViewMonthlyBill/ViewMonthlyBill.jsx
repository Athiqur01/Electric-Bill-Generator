import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';


const ViewMonthlyBill = () => {

   
    const {id}=useParams()


    // Fetch subscribers
    const { data: subscribers } = useQuery({
    queryKey: ['rate'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/user');
      return res.data;
     }
    });

    //Billing Data----
    const { data: monthlyBill } = useQuery({
    queryKey: ['monthlyBill'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5012/monthly?q=${id}`);
      return res.data;
    }
  });
  const billData = monthlyBill && Array.isArray(monthlyBill) && monthlyBill.length > 0 ? monthlyBill[0] : null;
  console.log('monthly bill',billData?.billingData
  )
  console.log('subs',subscribers)
  const bills=billData?.billingData
  console.log('bills',billData)

  //Pdf generate-----------
  const generatePdf = () => {
    const doc = new jsPDF();
    let currentY = 20; // Start position
  
    // Adding header text
    doc.setFont("times", "normal")
    doc.text("People's Republic of Bangladesh", doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
    currentY += 7; // Move Y down by 7 units for the next line
  
    doc.text('Bangladesh Betar, Mymensingh', doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
    currentY += 10; // Move Y down for the next section
    doc.setFontSize(12);
    // Additional paragraph after "Bangladesh Betar, Mymensingh"
   // No. on the left and Date on the right
   

   doc.setFont("times", "normal");
   const noText = `No. : 15.53.6100.329.25.013.23.${billData?.issue}`;
   const dateText = 'Date: 28/10/2024';
 
   doc.text(noText, 15, currentY); // Align "No." to the left at x=15
   doc.text(dateText, doc.internal.pageSize.getWidth() - 15, currentY, { align: 'right' }); // Align "Date" to the right
   

  const additionalParagraph1Height = doc.getTextDimensions(noText).h; // Get the height of the text for spacing
  currentY += additionalParagraph1Height + 5;

  doc.setFont("times", "bold")
  doc.text('Notice', doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
  currentY += 10; // Move Y down for the next section

    doc.setFont("times", "bold")
    doc.setFontSize(12); // Adjust the font size as needed
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    // Split the billingMonth into year and month parts
    const [year, month] = billData.billingMonth.split("-");
    
    // Convert month to a zero-based index and get the month name
    const monthName = monthNames[parseInt(month) - 1];
    
    // Format the date as "February, 2024"
    const formattedDate = `${monthName}, ${year}`;
    doc.text(`Subject: Notice for Payment of ${formattedDate} Electricity Bill.`, 15, currentY);    
    currentY += 10; // Move Y down
  
    // Paragraph text with maxWidth for wrapping
    doc.setFont("times", "normal")
    const paragraphText = `All officers and staff of Bangladesh Betar, Mymensingh, are hereby notified to submit their electricity bill payments for the month of ${formattedDate} to the Regional Engineer by ${billData.dueDate}, according to the following chart:`;
    doc.text(paragraphText, 15, currentY, { maxWidth: 170 });
    const paragraphHeight = doc.getTextDimensions(paragraphText).h; // Get paragraph height to adjust Y
    currentY += paragraphHeight + 10; // Update Y for table start, adding padding
  
    // Table data
    const tableColumn = ['No.', 'Name', 'Designation', 'Meter No', 'Unit', 'Bill (Tk)'];
    const tableRows = [];
    bills?.forEach((item, index) => {
      const itemData = [index + 1, item.name, item.designation, item.meterNo, item.unit, item.bill];
      tableRows.push(itemData);
    });
  
    // Create the table, starting right below the paragraph text
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: currentY,
      styles: {
        halign: 'center',
        valign: 'middle',
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        halign: 'center',
        valign: 'middle',
        lineWidth: 0.5,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        halign: 'center',
        valign: 'middle',
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      tableLineWidth: 0.2,
      tableLineColor: [0, 0, 0],
    });

    currentY = doc.lastAutoTable.finalY + 10;

  // Add additional paragraph after the table
  const additionalParagraph = 'Please ensure payment by the due date to avoid any inconvenience.';
  doc.text(additionalParagraph, 15, currentY, { maxWidth: 170 });
  currentY += doc.getTextDimensions(additionalParagraph).h + 6;

  // Signature text lines
const signatureLines = [
  "Md. Abu Sayed",         // 1st line: Name
  "Regional Engineer",      // 2nd line: Title
  "Bangladesh Betar, Mymensingh" // 3rd line: Organization
];

// Get the page width and calculate the position
const pageWidth = doc.internal.pageSize.getWidth();
const signatureX = pageWidth -45; // Position near the right edge
currentY += 5; // Add some spacing after the previous content

// Add each line of the signature text
signatureLines.forEach((line, index) => {
  doc.text(line, signatureX, currentY, { align: 'center' });
  currentY += 5; // Space between lines
});

    // Distribution
    doc.setFontSize(12)
    doc.setFont("times", "bold")
    doc.text('Distribution ', 15, currentY);    
    currentY += 5; // Move Y down
  
    doc.setFont("times", "normal")
    doc.text('1. Regional Director, Bangladesh Betar, Mymensingh ', 15, currentY);    
    currentY += 5; // Move Y down
    doc.setFont("times", "normal")
    doc.text('2. DRD/ DCN/ DRE/ AD/ ACN, Bangladesh Betar, Mymensingh ', 15, currentY);    
    currentY += 5; // Move Y down
    doc.setFont("times", "normal")
    doc.text('3. Notice Board ', 15, currentY);    
    currentY += 5; // Move Y down
  
    // Adding page numbers
    
  
    doc.save('srb_item_list.pdf');
  };
  

    return (
        <div>
            <div className="overflow-x-auto">
            <div className="overflow-x-auto px-2 md:px-10 lg:px-16">
              <h2 className="text-center text-2xl my-6 font-bold text-green-500">Billing Month: <input  type="month" value={billData?.billingMonth} disabled /> </h2>
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-center">
        <th></th>
        <th>Name</th>
        <th>Designation</th>
        <th>Flat No</th>
        <th>Meter No</th>
        <th>Unit</th>
        <th>Bill</th>
      </tr>
    </thead>
    <tbody className="text-center">
      {bills?.map((subscriber,index)=><>
        <tr>
      <th>{index+1}</th>
      <td>{subscriber?.name}</td>
      <td>{subscriber?.designation}</td>
      <td>{subscriber?.flatNo}</td>
      <td>{subscriber?.meterNo}</td>
      <td>{billData?.formData?.subscriber?._id      }</td>
      <td>{subscriber?.bill}</td>
    </tr>
      </>)}
      
      
    </tbody>
  </table>
</div>
<div className="flex justify-center py-10"><button onClick={generatePdf} className="text-center font-bold bg-green-500 p-2 rounded-md">Download Bill</button></div>
</div>
        </div>
    );
};

export default ViewMonthlyBill;