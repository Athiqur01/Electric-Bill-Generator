import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const UpdateSubscriber = () => {

     // Fetch subscribers
    const { data: subscribers } = useQuery({
    queryKey: ['subscribers'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5012/user');
      return res.data;
    }
  });

  console.log(subscribers)

    return (
        <div>
            <h2 className="text-2xl md:text-4xl lg:text-4xl text-center py-10 font-bold text-[#7C4DFF]">Update Subescriber</h2>
            <section className="flex justify-center">
            <div className="">
                {
                    subscribers?.map((subscriber, index)=><>
                    <form action="" className="space-y-6 space-x-4 text-center">
                        <span>{index+1}</span>
                      <input type="text" value={subscriber?.name} className="text-center border-[#7C4DFF] border-2 py-1 px-2 rounded-md"/>
                      <input type="text" value={subscriber?.designation} className="text-center border-[#7C4DFF] border-2 py-1 px-2 rounded-md" />
                      <input type="text" value={subscriber?.flatNo} className="text-center border-[#7C4DFF] border-2 py-1 px-2 rounded-md"/>
                      <input type="text" value={subscriber?.meterNo} className="text-center border-[#7C4DFF] border-2 py-1 px-2 rounded-md"/>
                      <input type="text" value={subscriber?.grade?.$numberDecimal} className="text-center border-[#7C4DFF] border-2 py-1 px-2 rounded-md"/>
                      <button type="submit" className="text-white font-bold py-2 px-4 rounded-md bg-[#7C4DFF]">Update</button>
                      
                      
                    </form>
                    </>)
                }
            </div>
            </section>
        </div>
    );
};

export default UpdateSubscriber;