import { useState } from "react";
import { useNavigate } from "react-router-dom";


const DutyChart = () => {

  const [billingMonth, setBillingMonth]=useState(null)
  const [prevMonth, setPrevMonth]=useState(null)

  const navigate=useNavigate()

  const handleMonth = (e) => {
    const monthForBilling = e.target.value;
    //previous month
    // Calculate previous month
  const [year, month] = monthForBilling.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  date.setMonth(date.getMonth() - 1);
  const prevYear = date.getFullYear();
  const prevMonthStr = String(date.getMonth() + 1).padStart(2, "0");
  // update states
  setBillingMonth (monthForBilling)
  setPrevMonth(`${prevYear}-${prevMonthStr}`);
  };
  console.log("Date",billingMonth)
  console.log("prev month",prevMonth)

  const handleEnterData = () => {
    // Navigate to /create-bill and pass billingMonth + prevMonth
    navigate("/enter-data", {
      state: { billingMonth, prevMonth },
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
  <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
    To Create Electric Bill
    <hr className="border-t-2 border-purple-500 mt-2 w-24 mx-auto"/>
    <span className="block text-sm font-medium text-gray-500 mt-2">
      Firstly, fill up the billing month
    </span>
  </h2>

  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
    <label className="text-lg font-semibold bg-purple-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-purple-600 transition">
      Billing Month:
    </label>
    <input 
      onChange={handleMonth} 
      type="month" 
      name="date" 
      className="text-center border border-purple-500 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition" 
      required
    />
  </div>
</div>

      <div className="flex justify-center mt-10">
        {billingMonth && <button onClick={handleEnterData}
      className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 
                 transform hover:scale-105 transition duration-300"
    >
      ➡ Enter Data
    </button>}
      </div>
      
    </>
  );
};

export default DutyChart;