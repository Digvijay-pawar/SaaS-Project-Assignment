import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Subscriptions from "./pages/Subscriptions";
import Revenue from "./pages/Revenue";

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">SaaS Management</h1>
          <div>
            <Link className="mx-2" to="/products">Products</Link>
            <Link className="mx-2" to="/customers">Customers</Link>
            <Link className="mx-2" to="/subscriptions">Subscriptions</Link>
            <Link className="mx-2" to="/revenue">Revenue</Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/revenue" element={<Revenue />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
