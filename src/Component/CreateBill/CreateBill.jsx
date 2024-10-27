import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const CreateBill = () => {
  const [formData, setFormData] = useState({});
  const [billingMonth, setBillingMonth] = useState(null);
  const [dueDate, setDueDate]=useState(null)
  const [issue, setIssue]=useState(null)
  const [bill, setBill] = useState({});
  const [totalBills, setTotalBills]=useState()
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

console.log(currentDate);

  // Fetch bill rates
  const { data: billRateFetch } = useQuery({
    queryKey: ['billRateFetch'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/billRateFetch');
      return res.data;
    }
  });

  // Fetch subscribers
  const { data: subscribers } = useQuery({
    queryKey: ['rate'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/user');
      return res.data;
    }
  });

  // Handle input changes for units
  const handleInputChange = (e, subscriberId) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [subscriberId]: {value}
    }));

    // Calculate the bill when input changes
    calculateBill(subscriberId, value);
  };

  // Calculate the bill for each subscriber based on unit consumption
  const calculateBill = (subscriberId, units) => {
    const rateData = billRateFetch && Array.isArray(billRateFetch) && billRateFetch.length > 0 ? billRateFetch[0] : null;
    let calculatedBill = 0;

    if (!rateData) return; // Return early if rate data is not available yet

    if (units < 51) {
      calculatedBill = units * rateData?.stage1;
    } else if (units>50 && units < 76) {
      calculatedBill =  units * rateData?.stage2;
    } else if (units < 201) {
      calculatedBill =  75 * rateData?.stage2 + (units - 75) * rateData?.stage3;
    } else if (units < 301) {
      calculatedBill =  75 * rateData?.stage2 + 125 * rateData?.stage3 + (units - 200) * rateData?.stage4;
    } else if (units < 401) {
      calculatedBill = 75 * rateData?.stage2 + 125 * rateData?.stage3 + 100 * rateData?.stage4 + (units - 300) * rateData?.stage5;
    } else if (units < 601) {
      calculatedBill = 75 * rateData?.stage2 + 125 * rateData?.stage3 + 100 * rateData?.stage4 + 100 * rateData?.stage5 + (units - 400) * rateData?.stage6;
    } else {
      calculatedBill = 75 * rateData?.stage2 + 125 * rateData?.stage3 + 100 * rateData?.stage4 + 100 * rateData?.stage5 + 200 * rateData?.stage6 + (units - 600) * rateData?.stage7;
    }
    calculatedBill=calculatedBill.toFixed(1)
    // Update bill state for this subscriber
    setBill(prev => ({
      ...prev,
      [subscriberId]: {units,calculatedBill}
    }));
  };

  // Handle month selection
  const handleMonth = (e) => {
    const date = e.target.value;
    setBillingMonth(date);
  };
  // Handle due Date selection
  const handleDueDate = (e) => {
    const date = e.target.value;
    setDueDate(date);
  };
  // Handle due Date selection
  const handleIssueNo = (e) => {
    const date = e.target.value;
    setIssue(date);
  };

  //Total Bill----
  useEffect(() => {
    let total = 0;
    subscribers?.forEach((subscriber) => {
      total += parseFloat(bill[subscriber?._id]?.calculatedBill || 0);
    });
    setTotalBills(total);
  }, [bill, subscribers]);
  console.log('total',totalBills)
  // Handle form submission
  const handleDataSubmit = async () => {
    
    const billingData = subscribers?.map(subscriber=>({
      id:subscriber?._id,
      name:subscriber?.name,
      designation:subscriber?.designation,
      flatNo:subscriber?.flatNo,
      meterNo:subscriber?.meterNo,
      unit:bill[subscriber?._id]?.units ||0,
      bill: bill[subscriber?._id]?.calculatedBill || 0,
      billingMonth:billingMonth
    }))

    console.log("Submitted Data:", billingData);
    console.log('billng month', billingMonth)
    if(billingMonth===null){
      return
    }

    try {
      const response = await axios.post(`http://localhost:5012/billingData?q=${billingMonth}`, {billingData,billingMonth,dueDate,issue,totalBills,currentDate});
      console.log(response.data);
      if (response.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Data Inserted successfully",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  console.log('bill', bill)
  return (
    <div>
      <h2 className="mt-16 text-4xl font-bold text-blue-600 text-center">Create Bill</h2>
      
      {/*Billing Date */}
     <div className=" flex gap-10 justify-center">
     <div className="flex justify-center mt-8 gap-x-4">
        <h2 className="text-xl font-semibold bg-[#7C4DFF] py-1 text-white px-2 rounded-sm">Billing Month:</h2>
        <input onChange={handleMonth} type="month" name="date" className="text-center border-[#7C4DFF] border-[1px] py-1 rounded-md" required/>
      </div>
      
      <div className="flex justify-center mt-8 gap-x-4">
        <h2 className="text-xl font-semibold bg-[#7C4DFF] py-1 text-white px-2 rounded-sm">Due Date:</h2>
        <input onChange={handleDueDate} type="date" name="date" className="text-center border-[#7C4DFF] border-[1px] py-1 rounded-md" required />
      </div>
      <div className="flex justify-center mt-8 gap-x-4">
        <h2 className="text-xl font-semibold bg-[#7C4DFF] py-1 text-white px-2 rounded-sm">Issue No.:</h2>
        <input onChange={handleIssueNo} type="text" name="date" className="text-center border-[#7C4DFF] border-[1px] py-1 rounded-md" required />
      </div>
     </div>

      <div className="overflow-x-auto px-2 md:px-32 lg:px-32 mt-8">
        <div className="grid grid-cols-6 gap-x-2">
          <h2 className="text-center font-semibold">Serial No</h2>
          <h2 className="text-center font-semibold">Name</h2>
          <h2 className="text-center font-semibold">Designation</h2>
          <h2 className="text-center font-semibold">Meter No.</h2>
          <h2 className="text-center font-semibold">Unit</h2>
          <h2 className="text-center font-semibold">Bill</h2>
        </div>

        {subscribers?.map((subscriber, index) => (
          <form className="grid grid-cols-6 mt-2 gap-x-2" key={subscriber?._id}>
            <input type="text" name="name" value={index + 1} className="text-center text-black" readOnly />
            <input type="text" name="name" value={subscriber?.name} className="text-center text-black" readOnly />
            <input type="text" name="designation" value={subscriber?.designation} className="text-center" readOnly />
            <input type="text" name="meterNo" value={subscriber?.meterNo} className="text-center" readOnly />

            <input
              type="text"
              name="unit"
              
              onChange={(e) => handleInputChange(e, subscriber?._id)}
              className="text-center border-[#7C4DFF] border-[1px] py-1 rounded-md"
            />

            <h2 className="text-center">{bill[subscriber?._id] ? `${bill[subscriber?._id]?.calculatedBill} Tk` : "N/A"}</h2>
          </form>
        ))}
        <div className="flex justify-center mt-4">
          <button onClick={handleDataSubmit} type="submit" className="bg-[#7C4DFF] text-white px-4 py-1 rounded-sm">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;
