import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

export default function App() {
  const [editId, setEditId] = useState(null);

  return (
    <div>
      <h1>CRUD Boilerplate (Vite & React)</h1>
      <ItemForm selectedId={editId} onSaved={() => setEditId(null)} />
      <ItemList onEdit={setEditId} />
    </div>
  );
}
