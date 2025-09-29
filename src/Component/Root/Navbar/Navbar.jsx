import { NavLink } from 'react-router-dom';
import './font.css'
const Navbar = () => {
    return (
    <nav className="bg-pink-600 text-white shadow-md sticky top-0 z-50">
  <div className="container mx-auto flex items-center justify-between px-6 py-3">
    <h1 className="text-xl font-bold">⚡ Electricity Bill Generator</h1>
    <ul className="flex space-x-6">
      <NavLink to='/'><li className="hover:underline cursor-pointer">Home</li></NavLink>
      <NavLink to='/createBill'><li className="hover:underline cursor-pointer font-semibold">Create Bill</li></NavLink>
      <NavLink to='/bill'><li>Monthly Bill</li></NavLink>
      <NavLink to='/addSubescriber'><li>Add Subscriber</li></NavLink>
    </ul>
  </div>
</nav>

    );
};

export default Navbar;