import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container mx-auto py-2 px-4">
        <nav className="flex flex-wrap justify-between items-center">
          <Link to="/">
            <span className="flex text-4xl  text-blue-900 font-medium items-center">
              <Logo /> <span className="block ml-4">MedPass</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen((prevState) => !prevState)}
            className="h-6 w-6 flex justify-center items-center focus:outline-none focus:ring-1 focus:ring-blue-400 md:hidden "
          >
            <img
              className="h-full w-full object-contain"
              src="/assets/img/ham.svg"
              alt="Hamburger Menu"
            />
          </button>
          <ul
            className={`${
              open ? "flex" : "hidden"
            }  md:flex flex-col w-full md:flex-row py-3 space-y-5 md:space-y-0  md:space-x-8 md:w-auto`}
          >
            <li className="block ">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="block ">
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
