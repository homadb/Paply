import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 hidden md:block">
      <nav>
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link></li>
          <li><Link to="/create" className="text-gray-700 hover:text-blue-600">Create Resume</Link></li>
          <li><Link to="/resumes" className="text-gray-700 hover:text-blue-600">My Resumes</Link></li>
          <li><Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link></li>
          <li><Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
