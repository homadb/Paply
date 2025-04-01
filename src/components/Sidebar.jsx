const Sidebar = () => {
    return (
      <aside className="w-64 bg-gray-100 h-screen p-4 hidden md:block">
        <nav>
          <ul className="space-y-4">
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Create Resume</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">My Resumes</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  