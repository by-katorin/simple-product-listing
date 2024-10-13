import { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextValue } from '../Context/AppContext';
import Profile from './Auth/Profile';
import Loader from '../Components/Loader';

export default function Home() {
  const { user } = useContext(AppContext) as AppContextValue;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (!user) {
        setLoading(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl py-10 px-4 2xl:px-0">
      {loading ? (
        <Loader />
      ) : (
        user ? (
          <Profile user={user} />
        ) : (
          <div
            className="home my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to Simple </span>
                <span className="block text-indigo-600 xl:inline">Product Listing</span>
              </h1>
              <p
                className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Simple Product Listing is anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base primary-btn md:py-4 md:text-lg md:px-10">
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="/login"
                    className="w-full flex items-center justify-center px-8 py-3 text-base secondary-btn md:py-4 md:text-lg md:px-10">
                    Live demo
                  </a>
                </div>
              </div>
            </div>
  
            <div className="lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img className="rounded-md h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
                src="https://images.unsplash.com/photo-1641568160205-be4a28485562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&h=2850&q=80" alt="" />
            </div>
          </div>
        )
      )}
    </div>
  );
};
