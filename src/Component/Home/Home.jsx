import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  <Link to='/addSubescriber'>
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Add Subscriber</h2>
    </div>
  </Link>

  <Link to='/update'>
    <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Update Subscriber</h2>
    </div>
  </Link>

  <Link to='/createBill'>
    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Create Bill</h2>
    </div>
  </Link>

  <Link to='/entryReading'>
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Entry Reading</h2>
    </div>
  </Link>

  <Link to='/billRate'>
    <div className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Bill Rate</h2>
    </div>
  </Link>

  <Link to='/bill'>
    <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Monthly Bill</h2>
    </div>
  </Link>

  <Link to='/dutyChart'>
    <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg rounded-xl min-h-52 flex justify-center items-center transform hover:scale-105 transition duration-300 cursor-pointer">
      <h2 className="font-semibold text-xl text-center font-one">Enter Data</h2>
    </div>
  </Link>
</div>

    );
};

export default Home;