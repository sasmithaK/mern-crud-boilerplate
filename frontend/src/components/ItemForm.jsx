import React, { useState } from 'react';
import { createItem } from '../api/itemApi';

const ItemForm = ({ onItemAdded }) => {
    const [item, setItem] = useState({ name: '', price: '' });

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItem(item);
            setItem({ name: '', price: '' });
            onItemAdded(); // Refresh the list after adding
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Item Name" value={item.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={item.price} onChange={handleChange} required />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default ItemForm;
