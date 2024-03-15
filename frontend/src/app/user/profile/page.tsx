"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface UserProfile {
  id: number;
  username: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  authorities: string[];
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/user/profile`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
        const data = await res.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [apiUrl]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-200 px-4 py-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                src="/avatar.jpg"
                alt="User Avatar"
                width={80}
                height={80}
              />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-accent">
                {userProfile.username}
              </h1>
              <p className="text-sm text-gray-600">{userProfile.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-primary">
            Personal Information
          </h2>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">First Name:</span>{" "}
              {userProfile.fname}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Last Name:</span>{" "}
              {userProfile.lname}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Phone:</span> {userProfile.phone}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Authorities:</span>{" "}
              {userProfile.authorities.join(", ")}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 px-6 py-4 flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
