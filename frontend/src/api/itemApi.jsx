import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items'; // Adjust based on backend port

export const getItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createItem = async (itemData) => {
    const response = await axios.post(API_URL, itemData);
    return response.data;
};
