import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CreateBill = () => {
  const [formData, setFormData] = useState({});
  
  // Fetch subscribers---
  const { data: subscribers, refetch } = useQuery({
    queryKey: ['rate'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/user');
      return res.data;
    }
  });

  // Handle input changes
  const handleInputChange = (e, subscriberId) => {
    console.log('id',subscriberId)
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [subscriberId]: {
        ...prev[subscriberId],
        [name]: value,
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    const name = e.target.name.value;
    const designation = e.target.designation.value;
    const meterNo = e.target.meterNo.value;
    const unit = e.target.unit.value;
    
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Post formData to API
  };

  return (
    <div>
      <h2 className="mt-16 text-4xl font-bold text-blue-600 text-center">Create Bill</h2>
      <div className="overflow-x-auto px-2 md:px-52 lg:px-62 mt-8">
  
        <div className="grid grid-cols-5 gap-x-2">
          <h2 className="text-center font-semibold">Name</h2> 
          <h2 className="text-center font-semibold">Designation</h2> 
          <h2 className="text-center font-semibold">Meter No.</h2> 
          <h2 className="text-center font-semibold">Unit</h2>
          <h2 className="text-center font-semibold">Action</h2>
        </div>

        {subscribers?.map((subscriber) => (
          <form onSubmit={handleSubmit} className="grid grid-cols-5 mt-2 gap-x-2" key={subscriber?._id}>
            <input
              type="text"
              name="name"
              value={subscriber?.name}
              
              className="text-center text-black"
            />
            <input
              type="text"
              name="designation"
              value={subscriber?.designation}
              
              className="text-center"
            />
            <input
              type="text"
              name="meterNo"
              value={subscriber?.meterNo}
              
              className="text-center"
            />
            <input
              type="text"
              name="unit"
              value={subscriber?.unit}
              onChange={(e) => handleInputChange(e, subscriber?._id)}
              className="text-center"
            />
            <button type="submit" className="bg-green-500">Submit</button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default CreateBill;
