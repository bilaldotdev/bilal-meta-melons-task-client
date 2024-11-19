import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-lg font-bold">
              <Link to="/">MetaMelons Task</Link>
            </div>
            {/* Links */}
            <div className="space-x-4">
              <Link
                to="/auth/register"
                className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
              <Link to="/auth/login" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/tasks" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                Tasks
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
