import { NavLink, useNavigate } from 'react-router-dom';

export function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-700">
        Admin Panel
      </div>

      <div className="flex gap-6">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
          }
        >
          Add Product
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/all"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
          }
        >
          All Products
        </NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
