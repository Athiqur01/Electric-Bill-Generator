import { NavLink } from 'react-router-dom';
import './font.css'
const Navbar = () => {
    return (
        <div className="navbar bg-[#E91E63] min-h-24">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>Home</li>
        <li>Create Bill</li>
        <li>Monthly Bill</li>
        <li>Add Subscriber</li>
      </ul>
    </div>
    <h2 className='font-two text-white text-xl font-bold'>Electricity Bill Generator</h2>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-white space-x-4 font-semibold">
        <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/createBill'><li>Create Bill</li></NavLink>
        <NavLink to='/bill'><li>Monthly Bill</li></NavLink>
        <NavLink to='/addSubescriber'><li>Add Subscriber</li></NavLink>
        
        
        
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
    );
};

export default Navbar;