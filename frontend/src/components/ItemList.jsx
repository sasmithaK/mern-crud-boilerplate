import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/itemApi';

export default function ItemList({ onEdit }) {
  const [items, setItems] = useState([]);

  const fetch = () => getItems().then(res => setItems(res.data));
  useEffect(fetch, []);

  return (
    <div className="container mt-4">
      <ul className="list-group">
        {items.map(it => (
          <li key={it._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{it.name}</strong> – {it.description}
            </div>
            <div>
              <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(it._id)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteItem(it._id).then(fetch)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
