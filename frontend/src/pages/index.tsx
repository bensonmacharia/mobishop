import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import exp from "constants";

interface Product {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9009";
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "" });
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    description: "",
  });

  //fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        setProducts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //create product
  const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/products`, newProduct);
      setProducts([response.data, ...products]);
      setNewProduct({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  //update product
  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/products/${updateProduct.id}`, {
        name: updateProduct.name,
        description: updateProduct.description,
      });
      setUpdateProduct({ id: "", name: "", description: "" });
      setProducts(
        products.map((product) => {
          if (product.id === parseInt(updateProduct.id)) {
            return {
              ...product,
              name: updateProduct.name,
              email: updateProduct.description,
            };
          }
          return product;
        })
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  //delete product
  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`${apiUrl}/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Product Management App
        </h1>

        {/* Create product */}
        <form
          onSubmit={createProduct}
          className="p-4 bg-blue-100 rounded shadow"
        >
          <input
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>

        {/* Update product */}
        <form
          onSubmit={handleUpdateProduct}
          className="p-4 bg-green-100 rounded shadow"
        >
          <input
            placeholder="Product ID"
            value={updateProduct.id}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, id: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Name"
            value={updateProduct.name}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, name: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Email"
            value={updateProduct.description}
            onChange={(e) =>
              setUpdateProduct({
                ...updateProduct,
                description: e.target.value,
              })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Update Product
          </button>
        </form>

        {/* Display products */}
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <CardComponent card={product} />
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
