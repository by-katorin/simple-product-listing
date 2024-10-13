import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextValue } from '../../Context/AppContext';
import { LoginForm } from '../../Types/Form';
import Breadcrumbs from '../../Components/Breadcrumbs';

export default function Login() {
  const { setToken } = useContext(AppContext) as AppContextValue;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginForm>({
    email: '',
    password: '',
  });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/');
    }
  }

  return (
    <div className="mx-auto pt-5 pb-16">
      <Breadcrumbs currentPage='Login' />
      
      <h4 className="text-center text-2xl mb-8 font-bold">
        Login
      </h4>

      <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>

        <button className="primary-btn">Login</button>
      </form>
    </div>
  );
}
