import axios from "axios";

const API_URL = "https://saas-project-assignment.onrender.com/api";

export const fetchCustomers = () => axios.get(`${API_URL}/customers`).then((res) => res.data);
export const fetchProducts = () => axios.get(`${API_URL}/products`).then((res) => res.data);
export const fetchSubscriptions = () => axios.get(`${API_URL}/subscriptions`).then((res) => res.data);
export const addSubscription = (data) => axios.post(`${API_URL}/subscriptions`, data).then((res) => res.data);
export const extendSubscription = (id, data) =>{
console.log(data)
    axios.patch(`${API_URL}/subscriptions/${id.subscription_id}`, data).then((res) => res.data);
}
export const endSubscription = (id) =>{
    console.log(id.subscription_id)
  axios.delete(`${API_URL}/subscriptions/${id.subscription_id}/end`).then((res) => res.data);}
export const fetchRevenue = () => axios.get(`${API_URL}/revenue`).then((res) => res.data);
