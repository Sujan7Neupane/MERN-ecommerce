import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">No user data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] px-4 py-10 flex justify-center">
      <div className="w-full max-w-xl border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
          User Profile
        </h2>

        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{user.phone || "Not provided"}</p>
          </div>

          {user.createdAt && (
            <div>
              <p className="text-gray-500">Joined On</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Optional Actions */}
        <div className="mt-8 flex gap-3">
          <button className="px-6 py-2 text-sm border rounded hover:bg-gray-100">
            Edit Profile
          </button>
          <button className="px-6 py-2 text-sm bg-black text-white rounded">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
