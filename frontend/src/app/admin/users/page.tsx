"use client";
import AdminLayout from "@/components/Admin/AdminLayout";
import Breadcrumb from "@/components/Admin/Breadcrumbs/Breadcrumb";
import Alert from "@/components/Admin/Modals/Alert";
import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";

interface User {
  id: number;
  counter: number;
  username: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
}

const Users = () => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [users, setusers] = useState<User[]>([]);
  const [reloadUsers, setReloadUsers] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    counter: 0,
    username: "",
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });
  const itemsPerPage = 5;

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = () => {
    setUserName("");
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setUserName(user.username);
    //setNewCategoryName(category.name);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/users`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // Reverse the users array and add a counter ID to each item
        const reversedUsers = json
          .reverse()
          .map((user: User, index: number) => {
            return { ...user, counter: index + 1 };
          });
        setusers(reversedUsers);
      });
  }, [apiUrl, reloadUsers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminLayout>
        <div>
          <Breadcrumb pageName="Users" />
          <button
            className="bg-accent dark:bg-primary mb-4 rounded-md px-2 py-2 text-white font-satoshi font-thin text-sm hover:bg-primary hover:dark:bg-accent"
            onClick={() => handleAddUser()}
          >
            + Add User
          </button>
          <div className="rounded-md border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto mb-5">
              <div className="mb-4 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search user..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent dark:bg-gray-300 dark:text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="w-full table-auto bg-white border-0">
                <thead className="bg-gray-800 text-white">
                  <tr className="text-left">
                    <th className="hidden lg:table-cell px-4 py-4 font-medium">
                      ID
                    </th>
                    <th className="hidden sm:table-cell px-4 py-4 font-medium">
                      Name
                    </th>
                    <th className="px-4 py-4 font-medium">Username</th>
                    <th className="hidden md:table-cell px-4 py-4 font-medium">
                      Email
                    </th>
                    <th className="hidden lg:table-cell px-4 py-4 font-medium">
                      Phone
                    </th>
                    <th className="px-4 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentItems.map((item, index) => (
                    <tr key={index} className="odd:bg-bodydark3 even:bg-white">
                      <td className="hidden lg:table-cell border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                        <h5 className="font-medium">{item.counter}</h5>
                      </td>
                      <td className="hidden sm:table-cell border-b border-[#eee] px-4 py-5">
                        <p>{item.fname + " " + item.lname}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5">
                        <p>{item.username}</p>
                      </td>
                      <td className="hidden md:table-cell border-b border-[#eee] px-4 py-5">
                        <p>{item.email}</p>
                      </td>
                      <td className="hidden lg:table-cell border-b border-[#eee] px-4 py-5">
                        <p>{item.phone}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5">
                        <div className="flex items-center">
                          <button
                            className="hover:text-primary flex items-center justify-end bg-gray-200 p-2 mr-2 rounded-lg dark:bg-gray-200 dark:text-black dark:hover:text-accent"
                            onClick={() => handleEditUser(item)}
                          >
                            <FiEdit className="w-5 h-5 fill-none" />
                            <span className="ml-1 text-sm">Edit</span>
                          </button>
                          <button
                            className="hidden max-sm:flex items-center hover:text-primary bg-gray-200 p-2 rounded-lg dark:bg-gray-200 dark:text-black dark:hover:text-accent"
                            onClick={() => handleEditUser(item)}
                          >
                            <FiEye className="w-5 h-5 fill-none" />
                            <span className="ml-1 text-sm">View</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {totalPages > 1 && (
            <nav className="mt-4 px-5 flex justify-between items-center">
              <div>
                <span className="text-gray-500 text-sm">
                  Showing {indexOfFirstItem + 1}-{indexOfLastItem} of{" "}
                  {filteredUsers.length} items
                </span>
              </div>
              <ul className="flex">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      className={`px-2 py-1 rounded-lg mr-2 ${
                        currentPage === i + 1
                          ? "bg-accent text-white text-sm dark:bg-primary"
                          : "bg-gray-200 text-gray-500 text-sm"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h2 className="text-lg font-medium mb-4">
                {userName ? `Update ${userName}` : "Add User"}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-500 mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md"
                  >
                    {userName ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Users;
