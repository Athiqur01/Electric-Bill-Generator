import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link to='/addSubescriber'><div className="shadow-lg rounded-sm min-h-52 flex justify-center items-center">
                <h2 className="font-semibold text-xl text-center font-one">Add Subscriber</h2>
            </div></Link>
            <div className="shadow-lg rounded-sm min-h-52 flex justify-center items-center">
                <h2 className="font-semibold text-xl text-center font-one">Update Subscriber</h2>
            </div>

            <Link to='/createBill'><div className="shadow-lg rounded-sm min-h-52 flex justify-center items-center">
                <h2 className="font-semibold text-xl text-center font-one">Create Bill</h2>
            </div></Link>
            
            

            <Link to='/billRate'><div className="shadow-lg rounded-sm min-h-52 flex justify-center items-center">
                <h2 className="font-semibold text-xl text-center font-one">Bill Rate</h2>
            </div></Link>
            <Link to='/bill'><div className="shadow-lg rounded-sm min-h-52 flex justify-center items-center">
                <h2 className="font-semibold text-xl text-center font-one">Monthly Bill</h2>
            </div></Link>
            
        </div>
    );
};

export default Home;