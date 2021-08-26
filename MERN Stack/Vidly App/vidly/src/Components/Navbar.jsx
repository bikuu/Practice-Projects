import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Vidly
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/movies" className="nav-link " aria-current="page">
              Movies
            </NavLink>
            <NavLink to="/customers" className="nav-link">
              Customers
            </NavLink>
            <NavLink to="/rentals" className="nav-link">
              Rentals
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink to="/profile" className="nav-link">
                  {user._id}
                </NavLink>
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
