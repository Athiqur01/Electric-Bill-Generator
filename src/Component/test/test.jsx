import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const EnterData = () => {

     const location = useLocation();
const { billingMonth, prevMonth } = location.state || {};
console.log("Billing month", billingMonth, prevMonth);
const [dueDate, setDueDate]=useState(null)
const [issue, setIssue]=useState(null)
const [currentReading, setCurrentReading]=useState({})
const [formData, setFormData] = useState({});
const [bill, setBill] = useState({});
const [totalBills, setTotalBills]= useState()
const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

const { data: subscribers } = useQuery({
  queryKey: ["prevMonth", prevMonth],
  queryFn: async () => {
    if (!prevMonth) return [];
    const res = await axios.get(`http://localhost:5012/prevMonth?prevMonth=${prevMonth}`);
    return res.data;
  },
  enabled: !!prevMonth,
});
 
 //const subscriber2=subscribers.find()
     console.log('subs',subscribers)
     //const subscriber2 = subscribers?.billingData ?? [];

     // Fetch bill rates
  const { data: billRateFetch } = useQuery({
    queryKey: ['billRateFetch'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/billRateFetch');
      return res.data;
    }
  });

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

 const subscriber2=subscribers?.billingData?? []
 console.log('jk',subscriber2)

 //Handle current reading
   const handleInputChange = (e, subscriber) => {

    const { value } = e.target;
    const previousReading= subscriber2.find(subs=>subs.id===subscriber.id)?.reading
    const units= value-previousReading
    console.log("previousReading", previousReading)
    console.log("value", value)
    console.log(units, "unit")
    const subscriberId=subscriber.id
    setCurrentReading(prev=>(
        {
            ...prev,
            [subscriberId]:{value}
        }
    ))
    setFormData(prev => ({
      ...prev,
      [subscriberId]: {units}
    }));

    // Calculate the bill when input changes
    calculateBill(subscriberId, units);
  };

  console.log("current reading",currentReading)
  // Calculate the bill for each subscriber based on unit consumption
  const calculateBill = (subscriberId, units) => {
    console.log(subscriberId, units, "hello")
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

  console.log("billll.", bill)
  console.log("billll.", formData)

  //Total Bill----
  useEffect(() => {
    let total = 0;
    subscriber2?.forEach((subscriber) => {
      total += parseFloat(bill[subscriber?.id]?.calculatedBill || 0);
    });
    setTotalBills(total);
  }, [bill, subscriber2]);
  console.log('total',totalBills)
  console.log("totalB", totalBills)
  // Handle form submission
  const handleDataSubmit = async () => {
    
    const billingData = subscriber2?.map(subscriber=>({
      id:subscriber?.id,
      name:subscriber?.name,
      designation:subscriber?.designation,
      flatNo:subscriber?.flatNo,
      meterNo:subscriber?.meterNo,
      reading:currentReading[subscriber?.id]?.value,
      unit:bill[subscriber?.id]?.units ||0,
      bill: bill[subscriber?.id]?.calculatedBill || 0,
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


    return (
        <div>
            <h2 className="mt-16 text-4xl font-bold text-blue-600 text-center">Create Bill</h2>
             {/*Billing Date */}
     <div className=" flex gap-10 justify-center">
     <div className="flex justify-center mt-8 gap-x-4">
        <h2 className="text-xl font-semibold bg-[#7C4DFF] py-1 text-white px-2 rounded-sm">Billing Month:</h2>
        <input  type="month" name="date" value={billingMonth} className="text-center border-[#7C4DFF] border-[1px] py-1 rounded-md" required/>
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

   {/* column heading start */}
     <div className="overflow-x-auto px-2 md:px-32 lg:px-2 mt-8">
        <div className="grid grid-cols-8 gap-x-2">
          <h2 className="text-center font-semibold">Serial No</h2>
          <h2 className="text-center font-semibold">Name</h2>
          <h2 className="text-center font-semibold">Designation</h2>
          <h2 className="text-center font-semibold">Flat No.</h2>
          <h2 className="text-center font-semibold">Prev Reading</h2>
          <h2 className="text-center font-semibold">Current Reading</h2>
          
          <h2 className="text-center font-semibold">Unit</h2>
          <h2 className="text-center font-semibold">Bill</h2>
        </div>
      </div>  
      {/* column heading end */}  

      {/* Data Input Start  */}
       {
        subscriber2.map((subscriber,index)=>(
            <form className="grid grid-cols-8 mt-2 gap-x-2" key={subscriber?._id}>

               <input type="text" name="name" value={index + 1} className="text-center text-black" readOnly />
               <input type="text" name="name" value={subscriber?.name} className="text-center text-black" readOnly />
               <input type="text" name="designation" value={subscriber?.designation} className="text-center" readOnly />
               <input type="text" name="meterNo" value={subscriber?.flatNo} className="text-center" readOnly />
               <input type="text" name="prevReading" value={subscriber?.reading
               } className="text-center"  />
               

               <input
              type="text"
              name="unit"
              
              onChange={(e) => handleInputChange(e, subscriber)}
              className="text-center border-[#7C4DFF] border-[1px] py-1 rounded-md"
            />
             <input type="text" name="id" value={bill[subscriber?.id]?.units
               } className="text-center" readOnly />
             <input type="text" name="id" value={bill[subscriber?.id]?.calculatedBill
               } className="text-center" readOnly />
            
            

            </form>
        ))
       }

      {/* Data Input End  */}
      <div className="flex justify-center mt-4">
          <button onClick={handleDataSubmit} type="submit" className="bg-[#7C4DFF] text-white px-4 py-1 rounded-sm">Submit</button>
        </div>

        </div>
    );
};

export default EnterData;