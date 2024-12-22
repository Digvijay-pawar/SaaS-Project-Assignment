import { useEffect } from "react";
import React from "react";
import { useQuery } from "react-query";
import { fetchRevenue } from "../api";

const Revenue = () => {
  const { data, isLoading, error, refetch } = useQuery("revenue", fetchRevenue, {
    enabled: false,
  });

  useEffect(() => {
    refetch(); 
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading revenue</div>;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Revenue</h2>
      <p>Total Revenue: ${data?.revenue}</p>
    </div>
  );
};

export default Revenue;
