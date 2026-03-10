import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { LogOut, Package, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary-400 font-bold text-xl">
            <Package size={24} />
            <span>MERN-Pro</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-slate-300 mr-4">
                  <User size={18} />
                  <span>{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="bg-primary-900/50 text-primary-300 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-primary-500/30">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
                <Link to="/register" className="bg-primary-600 hover:bg-primary-500 px-4 py-2 rounded-lg transition-all">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
