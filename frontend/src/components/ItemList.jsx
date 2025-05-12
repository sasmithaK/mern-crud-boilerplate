import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/itemApi';

export default function ItemList({ onEdit }) {
  const [items, setItems] = useState([]);

  const fetch = () => getItems().then(res => setItems(res.data));
  useEffect(fetch, []);

  return (
    <ul>
      {items.map(it => (
        <li key={it._id}>
          <strong>{it.name}</strong> – {it.description}
          <button onClick={() => onEdit(it._id)}>Edit</button>
          <button onClick={() => deleteItem(it._id).then(fetch)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
