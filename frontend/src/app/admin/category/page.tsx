"use client";
import AdminLayout from "@/components/Admin/AdminLayout";
import Breadcrumb from "@/components/Admin/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

interface Category {
  id: string;
  name: string;
}

const Category = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((json) => setCategories(json));
  }, []);

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
    setIsModalOpen(true);
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
          name: categoryName ? categoryName : newCategoryName,
        }),
      });
      if (response.ok) {
        // Close the modal and fetch the updated categories
        closeModal();
        const json = await response.json();
        setCategories([...categories, json]);
        setCategoryName("");
        setNewCategoryName("");
        console.log(json);
        //setIsErrorVisible(true);
        //setMessage("Category " + newCategoryName + " has been added.");
        alert("Category added/updated");
      } else {
        console.error("Failed to add/update category");
        //setIsErrorVisible(true);
        alert("Failed to add/update category");
      }
    } catch (error) {
      console.error("Failed to add/update category:", error);
      //setIsErrorVisible(true);
      alert("Failed to add/update category");
    }
  };

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
          {isErrorVisible && (
            <div className="flex m-2 bg-gray-200 p-2 rounded-md dark:bg-gray-800">
              <p className="text-error font-satoshi font-semibold">{message}</p>
            </div>
          )}
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className="mb-4 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-accent dark:bg-gray-300 dark:text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="hidden sm:table-cell min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      ID
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td className="hidden sm:table-cell border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {item.id}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
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
            <nav className="mt-4 flex justify-between items-center">
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
                  value={categoryName ? categoryName : newCategoryName}
                  onChange={(e) =>
                    categoryName
                      ? setCategoryName(e.target.value)
                      : setNewCategoryName(e.target.value)
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
                    {categoryName ? "Update" : "Add"}
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

export default Category;
