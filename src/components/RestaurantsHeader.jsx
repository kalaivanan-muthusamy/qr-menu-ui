import logo from "../images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import React from "react";
import UserIcon from "./icons/UserIcon";
import SignOutIcon from "./icons/SignOutIcon";

function RestaurantsHeader() {
  return (
    <div className="header">
      <div className="header-top w-100">
        <div className="container">
          <div className="d-none d-lg-flex align-items-center mr-3">
            <div className="logo-block logo-white mr-5 pr-5">
              <img src={logo} alt="Digital QR Menu" />
              <h1 className="title">QR Menu</h1>
            </div>
            <ul
              className="header-tabs nav align-self-end font-size-lg"
              role="tablist"
            >
              <li className="nav-item">
                <NavLink
                  to="/restaurants/dashboard"
                  activeClassName="active"
                  className="nav-link py-4 px-6"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink className="nav-link py-4 px-6" to="/restaurants/foods">
                  Foods
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink
                  className="nav-link py-4 px-6"
                  to="/restaurants/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink
                  className="nav-link py-4 px-6"
                  to="/restaurants/sessions"
                >
                  Sessions
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink
                  className="nav-link py-4 px-6"
                  to="/restaurants/branches"
                >
                  Branches
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink
                  className="nav-link py-4 px-6"
                  to="/restaurants/order-reports"
                >
                  Reports
                </NavLink>
              </li>
            </ul>
          </div>
          <Dropdown className="d-flex">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <div className="topbar-item">
                <div
                  className="btn btn-icon btn-hover-transparent-white w-sm-auto d-flex align-items-center btn-lg px-2"
                  id="kt_quick_user_toggle"
                >
                  <div className="d-flex flex-column text-right pr-sm-3">
                    <span className="text-white opacity-50 font-weight-bold font-size-sm d-none d-sm-inline">
                      {localStorage.getItem("fullName")}
                    </span>
                    <span className="text-white font-weight-bolder font-size-sm d-none d-sm-inline">
                      {localStorage.getItem("role")}
                    </span>
                  </div>
                  <span className="symbol symbol-35">
                    <span className="symbol-label font-size-h5 font-weight-bold text-white bg-white-o-30">
                      {localStorage.getItem("fullName")?.slice(0, 1)}
                    </span>
                  </span>
                </div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <span className="svg-icon svg-icon-sm svg-icon-primary mr-3">
                  <UserIcon />
                </span>
                Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/restaurants/logout">
                  <span className="svg-icon svg-icon-sm svg-icon-primary mr-3">
                    <SignOutIcon />
                  </span>
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          ,
        </div>
      </div>
    </div>
  );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="topbar bg-primary"
  >
    {children}
  </div>
));

export default RestaurantsHeader;
