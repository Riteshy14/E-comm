import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faShoppingCart,faBars,faXmark} from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../context/ShopContext";

export function TopBar({icon}) {
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItem,
  } = useContext(ShopContext);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate("/signin");
  };

  return (
    <>
      <div className="h-20 border-b border-gray-300 bg-white sticky top-0 z-50">
        <div className="flex justify-between items-center h-full px-4">

          {/* LOGO */}
          <Link to="/" className="text-3xl font-bold text-gray-700">
            E-comm
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-6">
            {["/", "/collection", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold text-xl"
                    : "text-gray-700"
                }
              >
                {path === "/" ? "Home" : path.slice(1)}
              </NavLink>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">

            <img src={icon} className="h-5 w-5 flex items-center text-center justify-center cursor-pointer" onClick={()=> {setShowSearch(true); navigate('/collection')}} alt="" />

            {/* 👤 PROFILE */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="w-5 cursor-pointer"
                onClick={() => setProfileMenuOpen(prev => !prev)}
              />

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
                  {token ? (
                    <>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        My Profile
                      </Link>
                      <p
                        onClick={() => navigate("/orders")}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Orders
                      </p>
                      <p
                        onClick={logout}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Logout
                      </p>
                    </>
                  ) : (
                    <Link to="/signin" className="block px-4 py-2 hover:bg-gray-100">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* 🛒 CART */}
            <Link to="/cart" className="relative">
              <FontAwesomeIcon icon={faShoppingCart} className="w-5" />
              <span className="absolute -right-2 -bottom-2 border bg-black  text-white text-[13px] w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* ☰ MOBILE MENU (AFTER CART) */}
            <div className="md:hidden">
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                className="w-6 cursor-pointer"
                onClick={() => setMenuOpen(prev => !prev)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b shadow-md">
          {[
            { name: "Home", path: "/" },
            { name: "Collection", path: "/collection" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 border-b hover:bg-gray-100"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

export default TopBar;
