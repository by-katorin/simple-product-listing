import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { User } from '../../Types/User';

export default function Profile({ user }: {user: User}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const fetchUrl = async () => {
    try {
      setLoading(true);
      const data = await fetch('https://api.thecatapi.com/v1/images/search')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        });
      setImageUrl(data[0].url);
    } catch (e) {
      console.log('Error in fetchUrl: ', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (user &&
    <div className="mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 my-5 rounded-full shadow-lg" src={imageUrl} />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {user.name}
        </h5>
        <span className="text-sm text-gray-500">
          {user.email}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a href="#" className="primary-btn mx-1">Edit Profile</a>
          <a href="#" className="secondary-btn mx-1">Shop</a>
        </div>
      </div>
    </div>
  );
};
