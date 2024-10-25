import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const AddSubescriber = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

     const onSubmit=async(data)=>{
     const {name,designation,flatNo,meterNo,grade,EntryDate}=data
     const unit=''
     const bill=''
     const newData={name,designation,flatNo,meterNo,grade,EntryDate,unit,bill}
     console.log(data)
      const response = await axios.post("http://localhost:5012/subscriber", data);
      console.log(response.data)
                if (response.data) {
                    const response2 = await axios.post("http://localhost:5012/genBill", newData);
                    console.log(response2.data)
                if (response2.data) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Data Inserted successfully",
                        showConfirmButton: true,
                    });
                }
                   
                }
     //post for subscriber and bill----
     
    }

    return (
        <div className="py-20">
            <div className="px-2 md:px-62 lg:px-80  ">
            <form action="" className="" onSubmit={handleSubmit(onSubmit)} >
               {/* Subscriber Name */}
                <input
                 type="text"
                 placeholder="Subscriber Name"
                 {...register("name", { required: true })}
                 className="input input-bordered input-info w-full  " />
               {/* Designation */}
                <input
                 type="text"
                 placeholder="Designation"
                 {...register("designation", { required: true })}
                 className="input input-bordered input-info w-full mt-6 " />
               {/* Flat No */}
                <input
                 type="text"
                 placeholder="Flat No"
                 {...register("flatNo", { required: true })}
                 className="input input-bordered input-info w-full mt-6 " />
               {/* Meter No */}
                <input
                 type="text"
                 placeholder="Meter No"
                 {...register("meterNo", { required: true })}
                 className="input input-bordered input-info w-full mt-6" />
               {/* Grade */}
                <input
                 type="text"
                 placeholder="Grade"
                 {...register("grade", { required: true })}
                 className="input input-bordered input-info w-full mt-6" />
               {/* Job Entry Date */}
                <input
                 type="date"
                 placeholder="Job Entry Date"
                 {...register("EntryDate", { required: true })}
                 className="input input-bordered input-info w-full mt-6" />
                <button type="submit" className="text-center bg-green-500 w-full mt-6 py-2 rounded-md">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default AddSubescriber;