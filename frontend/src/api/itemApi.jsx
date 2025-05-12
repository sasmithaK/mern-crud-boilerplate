import axios from 'axios';
const BASE = '/api/items';

export const getItems   = () => axios.get(BASE);
export const getItem    = id => axios.get(`${BASE}/${id}`);
export const createItem = data => axios.post(BASE, data);
export const updateItem = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteItem = id => axios.delete(`${BASE}/${id}`);
