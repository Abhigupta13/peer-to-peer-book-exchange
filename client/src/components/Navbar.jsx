import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="bg-gradient-to-r from-[#142f5c] to-[#010c1c] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link 
        to={user && user.role === 'Owner' ? "/owner-dashboard" : "/seeker-dashboard"} 
        className="text-3xl font-bold text-blue-400 flex items-center"
      >
        Book Exchange
      </Link>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300 mr-4">
            Welcome, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;