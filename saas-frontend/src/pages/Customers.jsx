import React from "react";
import { useQuery } from "react-query";
import { fetchCustomers } from "../api";

const Customers = () => {
  const { data, isLoading, error } = useQuery("customers", fetchCustomers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">PAN</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.customer_id}>
              <td className="border px-4 py-2">{customer.customer_id}</td>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.pan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
