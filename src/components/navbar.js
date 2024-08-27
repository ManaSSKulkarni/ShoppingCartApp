import { NavLink } from 'react-router-dom'; 

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink 
          to='/mycart' 
          end
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink>
        <NavLink 
          to='/mycart/about' 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}
