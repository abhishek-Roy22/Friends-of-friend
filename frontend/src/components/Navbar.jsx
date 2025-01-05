import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-slate-800 text-slate-200 p-2 sm:p-4 flex items-center justify-between sticky top-0">
      <Link to="/">
        <h1 className="text-lg md:text-4xl font-bold text-rose-600">
          FriendConnect
        </h1>
      </Link>
      {user ? (
        <div className="flex items-center gap-2 md:gap-5">
          <span className="text-sm md:text-xl text-slate-200">
            {user.userName || user.user.userName}
          </span>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-transparent border-2 border-slate-400 hover:ring-2 hover:ring-rose-700 hover:text-rose-700 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 md:gap-5">
          <Link to="/login">
            <button className="px-4 py-2 bg-transparent border-2 border-slate-400 hover:ring-2 hover:ring-rose-700 hover:text-rose-700 rounded">
              Login
            </button>
          </Link>
          <Link to="signup">
            <button className="px-4 py-2 bg-transparent border-2 border-slate-400 hover:ring-2 hover:ring-rose-700 hover:text-rose-700 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
