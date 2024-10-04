'use client'
import { AuthContext } from "@/components/context/AuthProvider";
import baseUrl from "@/components/services/baseUrl";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

const UserInfo = () => {
  const [user, setUser] = useState({ mobile: '', fullName: '', email: '', gender: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track if the field is editable
  const { authUser } = useContext(AuthContext);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/change-password', {
        currentPassword,
        newPassword,
      });
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle the editable state
  };

  return (
    <>
      <form className="mx-auto bg-white p-8 shadow-md rounded grid md:grid-cols-2 grid-cols-1 gap-6 items-center border border-gray-200">
        <h2 className="text-2xl">Account Details</h2>
        <div className="col-span-1 md:place-self-end">

          {!isEditing ?

            <button
              className="border border-gray-200 px-6 py-2 flex items-center gap-2 font-semibold"
              type="button"
              onClick={handleEditClick} // Handle the edit button click
            >
              Edit
              <span>
                <CiEdit />
              </span>
            </button>
            :
            <button
              className="border border-gray-200 px-6 py-2 flex items-center gap-2 font-semibold"
              type="button"
              onClick={handleEditClick} // Handle the edit button click
            >
              Save
            </button>
          }
        </div>

        <hr className="md:col-span-2" />

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            defaultValue={authUser?.fullName}
            placeholder="Your full name"
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            readOnly={!isEditing} // Make the field read-only unless editing is enabled
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="tel"
            value={authUser?.mobile}
            placeholder="01XXXXXXXXX"
            readOnly
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={authUser?.email}
            placeholder="Enter your email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            readOnly={!isEditing} // Make the field read-only unless editing is enabled
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            disabled={!isEditing} // Disable the field unless editing is enabled
          >
            <option value="">Choose a Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </form>

      <form className="mx-auto bg-white p-8 shadow-md rounded grid md:grid-cols-2 grid-cols-1 gap-6 mt-4 items-center border border-gray-200">
        <h2 className="text-2xl">Change Password</h2>
        <div className="md:place-self-end">
          <button
            className="border border-gray-200 px-6 py-2 flex items-center gap-2 font-semibold"
            type="button"
          >
            Edit
            <span>
              <CiEdit />
            </span>
          </button>
        </div>

        <hr className="md:col-span-2" />

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="currentPassword"
            type="password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 bg-red-500 text-white font-bold rounded-md"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </form>
    </>
  );
};

export default UserInfo;
