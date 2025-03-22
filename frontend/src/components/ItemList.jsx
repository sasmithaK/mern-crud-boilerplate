import React, { useEffect, useState } from 'react';
import { getItems } from '../api/itemApi';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await getItems();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>
            <h2>Item List</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>{item.name} - ${item.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
