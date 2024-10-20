import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const CreateBill = () => {
  const [formData, setFormData] = useState({});
  const [billingMonth, setBillingMonth] = useState(null);
  const [bill, setBill] = useState({});

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
      [subscriberId]: value
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
    } else if (units < 76) {
      calculatedBill = 50 * rateData?.stage1 + (units - 50) * rateData?.stage2;
    } else if (units < 201) {
      calculatedBill = 50 * rateData?.stage1 + 25 * rateData?.stage2 + (units - 75) * rateData?.stage3;
    } else if (units < 301) {
      calculatedBill = 50 * rateData?.stage1 + 25 * rateData?.stage2 + 125 * rateData?.stage3 + (units - 200) * rateData?.stage4;
    } else if (units < 401) {
      calculatedBill = 50 * rateData?.stage1 + 25 * rateData?.stage2 + 125 * rateData?.stage3 + 100 * rateData?.stage4 + (units - 300) * rateData?.stage5;
    } else if (units < 601) {
      calculatedBill = 50 * rateData?.stage1 + 25 * rateData?.stage2 + 125 * rateData?.stage3 + 100 * rateData?.stage4 + 100 * rateData?.stage5 + (units - 400) * rateData?.stage6;
    } else {
      calculatedBill = 50 * rateData?.stage1 + 25 * rateData?.stage2 + 125 * rateData?.stage3 + 100 * rateData?.stage4 + 100 * rateData?.stage5 + 200 * rateData?.stage6 + (units - 600) * rateData?.stage7;
    }

    // Update bill state for this subscriber
    setBill(prev => ({
      ...prev,
      [subscriberId]: calculatedBill
    }));
  };

  // Handle month selection
  const handleMonth = (e) => {
    const date = e.target.value;
    setBillingMonth(date);
  };

  // Handle form submission
  const handleDataSubmit = async () => {
    const billingData = { billingMonth, formData };
    console.log("Submitted Data:", billingData);

    try {
      const response = await axios.post(`http://localhost:5012/billingData?q=${billingMonth}`, billingData);
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
      <div className="flex justify-center mt-8 gap-x-4">
        <h2 className="text-xl font-semibold bg-green-500 px-2 rounded-sm">Select Month</h2>
        <input onChange={handleMonth} type="month" name="date" className="text-center border-green-300 border-[1px] py-1 rounded-md" />
      </div>

      <div className="overflow-x-auto px-2 md:px-52 lg:px-62 mt-8">
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
              value={formData[subscriber?._id] || ""}
              onChange={(e) => handleInputChange(e, subscriber?._id)}
              className="text-center border-green-300 border-[1px] py-1 rounded-md"
            />

            <h2>{bill[subscriber?._id] ? `$${bill[subscriber?._id]}` : "N/A"}</h2>
          </form>
        ))}
        <div className="flex justify-center mt-4">
          <button onClick={handleDataSubmit} type="submit" className="bg-green-500 px-4 py-1 rounded-sm">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;
