import React, { useState, useEffect } from 'react';
import { createItem, updateItem, getItem } from '../api/itemApi';

export default function ItemForm({ selectedId, onSaved }) {
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (selectedId) {
      getItem(selectedId).then(res => setForm(res.data));
    }
  }, [selectedId]);

  const handleSubmit = e => {
    e.preventDefault();
    const action = selectedId ? updateItem(selectedId, form) : createItem(form);
    action.then(() => {
      setForm({ name: '', description: '' });
      onSaved();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">{selectedId ? 'Update' : 'Create'}</button>
    </form>
  );
}
