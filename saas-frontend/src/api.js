import axios from "axios";

const API_URL = "https://saas-project-assignment.onrender.com/api";

export const fetchCustomers = () => axios.get(`${API_URL}/customers`).then((res) => res.data);
export const fetchProducts = () => axios.get(`${API_URL}/products`).then((res) => res.data);
export const fetchSubscriptions = () => axios.get(`${API_URL}/subscriptions`).then((res) => res.data);
export const addSubscription = (data) => axios.post(`${API_URL}/subscriptions`, data).then((res) => res.data);
export const extendSubscription = (id, data) =>
  axios.patch(`${API_URL}/subscriptions/${id}`, data).then((res) => res.data);
export const endSubscription = (id) =>
  axios.patch(`${API_URL}/subscriptions/${id}/end`).then((res) => res.data);
export const fetchRevenue = () => axios.get(`${API_URL}/revenue`).then((res) => res.data);
