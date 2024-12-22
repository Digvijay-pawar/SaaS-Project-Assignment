import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const fetchCustomers = () => axios.get(`${API_URL}/customers`).then((res) => res.data);
export const fetchProducts = () => axios.get(`${API_URL}/products`).then((res) => res.data);
export const fetchSubscriptions = () => axios.get(`${API_URL}/subscriptions`).then((res) => res.data);
export const addSubscription = (data) => axios.post(`${API_URL}/subscriptions`, data).then((res) => res.data);
export const extendSubscription = (id) =>{
    axios.patch(`${API_URL}/subscriptions/${id.subscription_id}`, {new_end_date: id.new_end_date}).then((res) => res.data);
}
export const endSubscription = (id) =>{
  axios.delete(`${API_URL}/subscriptions/${id.subscription_id}/end`).then((res) => res.data);}
export const fetchRevenue = () => axios.get(`${API_URL}/revenue`).then((res) => res.data);
