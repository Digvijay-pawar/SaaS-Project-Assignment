import React from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "../api";

const Products = () => {
  const { data, isLoading, error } = useQuery("products", fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Annual Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.product_id}>
              <td className="border px-4 py-2">{product.product_id}</td>
              <td className="border px-4 py-2">{product.product_name}</td>
              <td className="border px-4 py-2">${product.annual_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
