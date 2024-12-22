import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "../App.css"
import {
    fetchSubscriptions,
    fetchCustomers,
    fetchProducts,
    addSubscription,
    extendSubscription,
    endSubscription,
} from "../api";

Modal.setAppElement("#root");

const Subscriptions = () => {
    const queryClient = useQueryClient();

    // Fetch subscriptions, customers, and products
    const { data: subscriptions, isLoading: subsLoading, error: subsError } = useQuery("subscriptions", fetchSubscriptions);
    const { data: customers, isLoading: customersLoading } = useQuery("customers", fetchCustomers);
    const { data: products, isLoading: productsLoading } = useQuery("products", fetchProducts);

    // Mutations for add and extend subscription
    const addMutation = useMutation(addSubscription, {
        onSuccess: () => {
            queryClient.invalidateQueries("subscriptions");
        },
    });

    const extendMutation = useMutation(extendSubscription, {
        onSuccess: () => {
            queryClient.invalidateQueries("subscriptions");
        },
    });

    // State for modals
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isExtendModalOpen, setExtendModalOpen] = useState(false);

    // State for form data
    const [formData, setFormData] = useState({
        customer_id: "",
        product_name: "",
        no_of_users: "",
        start_date: "",
        end_date: "",
    });

    const [extendData, setExtendData] = useState({
        subscription_id: "",
        new_end_date: "",
    });

    const endMutation = useMutation(endSubscription, {
        onSuccess: () => {
            queryClient.invalidateQueries("subscriptions");
        },
    });

    // Handlers for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleExtendChange = (e) => {
        const { name, value } = e.target;
        setExtendData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEndSubscription = (subscription_id) => {
        endMutation.mutate({ subscription_id });
    };

    const handleAddSubscription = (e) => {
        e.preventDefault();
        addMutation.mutate(formData);
        setFormData({
            customer_id: "",
            product_name: "",
            no_of_users: "",
            start_date: "",
            end_date: "",
        });
        setAddModalOpen(false);
    };

    const handleExtendSubscription = (e) => {
        e.preventDefault();
        console.log(extendData)
        extendMutation.mutate(extendData);
        setExtendData({ subscription_id: "", new_end_date: "" });
        setExtendModalOpen(false);
    };

    useEffect(() => {
        if (addMutation.isSuccess) {
            setFormData({
                customer_id: "",
                product_name: "",
                no_of_users: "",
                start_date: "",
                end_date: "",
            });
        }

        if (extendMutation.isSuccess) {
            setExtendData({ subscription_id: "", new_end_date: "" });
        }

        if (endMutation.isSuccess) {
            queryClient.invalidateQueries("subscriptions");
        }
    }, [endMutation,extendMutation, addMutation]);

    if (subsLoading || customersLoading || productsLoading) return <div>Loading...</div>;
    if (subsError) return <div>Error loading subscriptions</div>;

    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-4">Subscriptions</h2>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setAddModalOpen(true)}
            >
                Add Subscription
            </button>

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-2"
                onClick={() => setExtendModalOpen(true)}
            >
                Extend Subscription
            </button>

            {/* Add Subscription Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setAddModalOpen(false)}
                contentLabel="Add Subscription Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h3 className="text-lg font-semibold mb-4">Add New Subscription</h3>
                <form onSubmit={handleAddSubscription}>
                    <label className="block mb-2">
                        <span className="text-gray-700">Select Customer:</span>
                        <select
                            name="customer_id"
                            value={formData.customer_id}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        >
                            <option value="">-- Select Customer --</option>
                            {customers.map((customer) => (
                                <option key={customer.customer_id} value={customer.customer_id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Select Product:</span>
                        <select
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        >
                            <option value="">-- Select Product --</option>
                            {products.map((product) => (
                                <option key={product.product_id} value={product.product_name}>
                                    {product.product_name} (${product.annual_cost})
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Number of Users:</span>
                        <input
                            type="number"
                            name="no_of_users"
                            value={formData.no_of_users}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                            min="1"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Start Date:</span>
                        <input
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">End Date:</span>
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={addMutation.isLoading}
                    >
                        {addMutation.isLoading ? "Adding..." : "Add Subscription"}
                    </button>
                </form>
            </Modal>

            {/* Extend Subscription Modal */}
            <Modal
                isOpen={isExtendModalOpen}
                onRequestClose={() => setExtendModalOpen(false)}
                contentLabel="Extend Subscription Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h3 className="text-lg font-semibold mb-4">Extend Subscription</h3>
                <form onSubmit={handleExtendSubscription}>
                    <label className="block mb-2">
                        <span className="text-gray-700">Subscription ID:</span>
                        <input
                            type="text"
                            name="subscription_id"
                            value={extendData.subscription_id}
                            onChange={handleExtendChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">New End Date:</span>
                        <input
                            type="date"
                            name="new_end_date"
                            value={extendData.new_end_date}
                            onChange={handleExtendChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled={extendMutation.isLoading}
                        on
                    >
                        {extendMutation.isLoading ? "Extending..." : "Extend Subscription"}
                    </button>
                </form>
            </Modal>
            
            {/* Subscriptions Table */}
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Subscription ID</th>
                        <th className="px-4 py-2">Customer Name</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">No. of Users</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((subscription) => (
                            <tr key={subscription.subscription_id}>
                                <td className="border px-4 py-2">{subscription.subscription_id}</td>
                                <td className="border px-4 py-2">
                                    {customers.find((c) => c.customer_id === subscription.customer_id)?.name}
                                </td>
                                <td className="border px-4 py-2">{subscription.product_name}</td>
                                <td className="border px-4 py-2">{subscription.start_date}</td>
                                <td className="border px-4 py-2">{subscription.end_date}</td>
                                <td className="border px-4 py-2">{subscription.no_of_users}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEndSubscription(subscription.subscription_id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        End
                                    </button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subscriptions;
