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
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter item name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          placeholder="Enter item description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows="3"
        />
      </div>

      <button type="submit" className={`btn ${selectedId ? 'btn-warning' : 'btn-success'}`}>
        {selectedId ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
