"use client";
import AdminLayout from "@/components/Admin/AdminLayout";
import Breadcrumb from "@/components/Admin/Breadcrumbs/Breadcrumb";
import Alert from "@/components/Admin/Alert";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

interface Category {
  id: number;
  counter: number;
  name: string;
}

const Category = () => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [reloadCategories, setReloadCategories] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((json) => {
        // Reverse the categories array and add a counter ID to each item
        const reversedCategories = json
          .reverse()
          .map((category: Category, index: number) => {
            return { ...category, counter: index + 1 };
          });
        setCategories(reversedCategories);
      });
  }, [apiUrl, reloadCategories]); // Include apiUrl in the dependency array

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = () => {
    setCategoryName("");
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCategoryName(category.name);
    setNewCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsMessageModalVisible(false);
  };

  const handleReloadCategories = () => {
    setReloadCategories((prev) => !prev); // Toggle reloadCategories
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let url,
        method = "";
      if (categoryName) {
        url = `${apiUrl}/api/category/${categoryName}`;
        method = "PUT";
      } else {
        url = `${apiUrl}/api/category`;
        method = "POST";
      }
      const response = await fetch(url, {
        method: method,
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategoryName,
        }),
      });
      if (response.ok) {
        // Close the modal and fetch the updated categories
        closeModal();
        setIsMessageModalVisible(true);
        setMessage(
          `Category ${categoryName ? categoryName : newCategoryName} has been added/updated.`
        );
        setAlertType("normal");
        const json = await response.json();
        handleReloadCategories();
        //setCategories([...categories, json]);
        setCategoryName("");
        setNewCategoryName("");
      } else {
        console.error("Failed to add/update category");
        closeModal();
        setIsMessageModalVisible(true);
        setMessage(
          `Failed to add/update ${categoryName ? categoryName : newCategoryName} category`
        );
        setAlertType("error");
      }
    } catch (error) {
      console.error("Failed to add/update category:", error);
      closeModal();
      setIsMessageModalVisible(true);
      setMessage(`Failed to add/update category: ${error}`);
      setAlertType("error");
    }
  };

  console.log(categories);

  return (
    <>
      <AdminLayout>
        <div>
          <Breadcrumb pageName="Product Categories" />
          <button
            className="bg-accent dark:bg-primary mb-4 rounded-md px-2 py-2 text-white font-satoshi font-thin text-sm hover:bg-primary hover:dark:bg-accent"
            onClick={() => handleAddCategory()}
          >
            + Add Category
          </button>
          <div className="rounded-md border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto mb-5">
              <div className="mb-4 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent dark:bg-gray-300 dark:text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="w-full table-auto bg-white border-0">
                <thead className="bg-gray-800 text-white">
                  <tr className="text-left">
                    <th className="hidden sm:table-cell min-w-[220px] px-4 py-4 font-medium">
                      ID
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium">
                      Name
                    </th>
                    <th className="px-4 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentItems.map((item, index) => (
                    <tr key={index} className="odd:bg-bodydark3 even:bg-white">
                      <td className="hidden sm:table-cell border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                        <h5 className="font-medium">{item.counter}</h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5">
                        <p>{item.name}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5">
                        <div className="flex items-center">
                          <button
                            className="hover:text-primary flex items-center justify-end bg-gray-200 p-2 rounded-lg dark:bg-gray-200 dark:text-black dark:hover:text-accent"
                            onClick={() => handleEditCategory(item)}
                          >
                            <FiEdit className="w-5 h-5 fill-none" />
                            <span className="ml-1 text-sm">Edit</span>
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
                  {filteredCategories.length} items
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
                {categoryName ? "Update " : "Add "} Category
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
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
                    {categoryName ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isMessageModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <Alert
              message={message}
              onClose={handleCloseModal}
              type={alertType}
            />
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Category;
