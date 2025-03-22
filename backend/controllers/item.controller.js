import Item from '../models/Item.js';

// Fetch all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new item
export const createItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newItem = new Item({ name, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
