import { createContext, useEffect, useState } from 'react';
import { User } from '../Types/User';

export interface AppContextValue {
  token: string | '';
  setToken: (token: string) => void;
  user: User | undefined;
  setUser: (user: User) => void;
}

interface AppProviderProps {
  children: any;
}

export const AppContext = createContext<AppContextValue | {}>({});

export default function AppProvider({ children }: AppProviderProps) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    const res = await fetch('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
