import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="bg-slate-800 text-slate-200 p-4 flex justify-between sticky top-0">
      <Link to="/">
        <h1 className="text-4xl font-bold text-rose-600">FriendConnect</h1>
      </Link>
      {user ? (
        <span className="text-xl text-slate-200">
          {user.userName || user.user.userName}
        </span>
      ) : (
        <div className="flex items-center gap-5">
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
