import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Bill = () => {

    
    
    // Fetch subscribers---
  const { data: bill, refetch } = useQuery({
    queryKey: ['bill'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/bill');
      return res.data;
    }
  });
     console.log(bill)

    return (
        <div>
            <h2 className="mt-16 text-4xl font-bold text-blue-600 text-center">Monthly Bill</h2>
            {/* table start */}
            <div className="overflow-x-auto mt-6  flex justify-center">
  <table className="table max-w-[800px]">
    {/* head */}
    <thead>
      <tr>
        <th ></th>
        <th className="text-center">Billing Month</th>
        <th className="text-center">Action</th>
        
      </tr>
    </thead>
    <tbody>
      {
        bill?.map((monthlyBill,index)=><>
          <tr>
      <th className="text-center">{index+1}</th>
      <td className="text-center"><input type="month" value={monthlyBill?.billingMonth} disabled /></td>
      <td className="text-center flex gap-4 justify-center"><button className="bg-green-500 px-4 py-1 rounded-sm">View</button> <button className="bg-green-500 px-4 py-1 rounded-sm">Download</button></td>
      
    </tr>
        </>)
      }
     
    </tbody>
  </table>
</div>
            {/* table end */}
           
        </div>
    );
};

export default Bill;