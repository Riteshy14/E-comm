import { TopBar } from '../component/TopBar';
import Footer from '../component/Footer';
import { useContext, useEffect, useState } from 'react';
import { getUser } from '../api/api';
import { ShopContext } from '../context/ShopContext';
import { Spinner } from '../component/Spinner';
import {
  UserCircleIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
} from '@heroicons/react/solid';

export function Profile() {
  const [user, setUser] = useState({});
  const { loading, setLoading, token } = useContext(ShopContext);

  useEffect(() => {
    setLoading(true);
    getUser(token)
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token, setLoading]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar icon="search_icon.png" />

      {loading ? (
        <div className="flex-grow flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex-grow mt-10 p-10 flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
          <div className="w-full max-w-md  bg-white rounded-3xl shadow-xl p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-mono font-bold text-gray-800">
                Profile
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Your account information
              </p>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-8 relative">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ring-4 ring-white shadow-md">
                <UserCircleIcon className="w-28 h-28 text-gray-600" />
              </div>

              {/* Verified Badge */}
              <div className="absolute bottom-2 right-[36%] bg-green-500 text-white p-1.5 rounded-full shadow">
                <BadgeCheckIcon className="w-5 h-5" />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-5">
              <InfoRow label="Username" value={user?.username} />
              <InfoRow label="Email" value={user?.email} />
              {user?.role && (
                <InfoRow label="Role" value={user.role} capitalize />
              )}
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Account Status
                </p>
                <p className="text-xs text-gray-500">
                  Your account is active and secure
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function InfoRow({ label, value, capitalize }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
      <span className="text-gray-500 font-medium">{label}</span>
      <span
        className={`text-gray-800 font-semibold text-right ${
          capitalize ? 'capitalize' : ''
        }`}
      >
        {value || '-'}
      </span>
    </div>
  );
}
