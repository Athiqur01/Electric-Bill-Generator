import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const BillRate = () => {

    
   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {data:rate,refetch}=useQuery({
        queryKey:['rate'],
        queryFn:async ()=>{
            const res=await axios.get('http://localhost:5012/subsfetch')
            return res.data
        }
      })

      const rateData = rate && Array.isArray(rate) && rate.length > 0 ? rate[0] : null;
      console.log('idd',rateData?.stage1)
      console.log('length',rate?.length)
    const onSubmit=async(data)=>{
     
     
       if(rate?.length<1 || rate?.length===undefined){
        const response = await axios.post("http://localhost:5012/billRate", data);
        console.log(response.data)
                   if (response.data) {
                       Swal.fire({
                           position: "top-center",
                           icon: "success",
                           title: "Data Inserted successfully",
                           showConfirmButton: true,
                       });
                   }
       }
     

 
    if(rate?.length>0){
        const response = await axios.patch(`http://localhost:5012/billRateupdate?q=${rateData?._id}`, data)
    console.log(response.data)
    if (response.data) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Data Updated successfully",
                            showConfirmButton: true,
                        });
                    }

    }
    refetch()
    
    }

      console.log('rate',rateData)

    return (
        <div className="py-20">
            <div className="px-2 md:px-62 lg:px-80  ">
            <form action="" className="" onSubmit={handleSubmit(onSubmit)} >
               {/* stage-1: 0-50 */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-1: 0-50 Unit</label>
               <input
                 type="text"
                 defaultValue={rateData?.stage1}
                 placeholder="Rate for 0-50"
                 {...register("stage1", { required: true })}
                 className="input input-bordered input-info w-full mt-2 mb-4" />
               {/* stage-2: 0-75 */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-2: 0-75 Unit</label>
               <input
                 type="text"
                 defaultValue={rateData?.stage2}
                 placeholder="Rate for 0-75"
                 {...register("stage2", { required: true })}
                 className="input input-bordered input-info w-full  mt-2 mb-4 " />
                
               {/* stage-3: 76-200 */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-3: 76-200 Unit</label>
                <input
                 type="text"
                 defaultValue={rateData?.stage3}
                 placeholder="Rate for 76-200"
                 {...register("stage3", { required: true })}
                 className="input input-bordered input-info w-full mt-2 mb-4  " />
               {/* stage-4: 201-300 */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-4: 201-300 Unit</label>
                <input
                 type="text"
                 defaultValue={rateData?.stage4}
                 placeholder="Rate for  201-300"
                 {...register("stage4", { required: true })}
                 className="input input-bordered input-info w-full mt-2 mb-4  " />
               {/* stage-5: 301-400 */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-5: 301-400 Unit</label>
                <input
                 type="text"
                 defaultValue={rateData?.stage5}
                 placeholder="Rate for 301-400"
                 {...register("stage5", { required: true })}
                 className="input input-bordered input-info w-full  mt-2 mb-4 " />
               {/* stage-6: 401-600 */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-6: 401-600 Unit</label>
                <input
                 type="text"
                 defaultValue={rateData?.stage6}
                 placeholder="Rate for 401-600"
                 {...register("stage6", { required: true })}
                 className="input input-bordered input-info w-full  mt-2 mb-4 " />
               {/* stage-7: 600> */}
               <label className="text-blue-600 font-semibold" htmlFor="">Stage-7: More than 600 Unit</label>
                <input
                 type="text"
                 defaultValue={rateData?.stage7}
                 placeholder="Rate for 600>"
                 {...register("stage7", { required: true })}
                 className="input input-bordered input-info w-full mt-2 mb-4 " />
               
                <button type="submit" className="text-center bg-[#7C4DFF] text-white w-full mt-6 py-2 rounded-md">{rate?.length>0? 'Update': 'Submit'}</button>
            </form>
            </div>
        </div>
    );
};

export default BillRate;