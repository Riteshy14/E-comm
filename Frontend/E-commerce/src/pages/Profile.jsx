import { TopBar } from '../component/TopBar';
import Footer from '../component/Footer';
import { useContext, useEffect, useState } from 'react';
import { getUser } from '../api/api'; // Assuming you have this function to get user data
import { ShopContext } from '../context/ShopContext';
import { Spinner } from '../component/Spinner'; // Assuming Spinner component exists

// Importing HeroIcons
import { UserCircleIcon } from '@heroicons/react/solid'; // You can change this icon to any one you prefer

export function Profile() {
  const [user, setUser] = useState({});
  const { loading, setLoading } = useContext(ShopContext);

  // Fetch user data
  useEffect(() => {
    setLoading(true);
    getUser()
      .then((data) => {
        console.log('User Data:', data);  // Log the user data
        setUser(data); // Set the fetched user data
      })
      .catch((err) => {
        console.error(err); // Log any errors
      })
      .finally(() => setLoading(false)); // Set loading to false when request is finished
  }, [setLoading]);

  return (
    <div>
      <TopBar icon="search_icon.png" />

      {/* Loading state */}
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="my-10">
          <div className="flex justify-center items-center">
            {/* Profile Title */}
            <p className="text-4xl mt-7 text-gray-900 font-mono">
              <span className="text-gray-600">Your</span> Profile
            </p>
          </div>

          <div className="mt-10 flex justify-center items-center">
            {/* Profile Icon (using HeroIcons) */}
            <div className="w-32 h-32 rounded-full bg-gray-300 flex justify-center items-center">
              <UserCircleIcon className="w-24 h-24 text-gray-600" /> {/* HeroIcon for profile */}
            </div>
          </div>

          {/* Profile Information */}
          <div className="mt-6 text-center">
            <div className="text-lg text-gray-700">
              <p className="font-semibold">Username: {user.username}</p>
              <p className="font-semibold">Email: {user.email}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
