import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FormEvent, useContext } from 'react';
import { AppContext, AppContextValue } from '../Context/AppContext';

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext) as AppContextValue;
  const navigate = useNavigate();

  async function handleLogout(e: FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setUser(null);
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link p-0 hover:bg-transparent">
            <img className='w-10 h-10' src='/vite.svg'/>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
