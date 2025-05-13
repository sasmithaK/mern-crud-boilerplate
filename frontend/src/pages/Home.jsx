import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // For edit functionality

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Simple Item Management</h2>

      <div className="card mb-4">
        <div className="card-body">
          <ItemForm
            selectedId={selectedId}
            onSaved={() => {
              setSelectedId(null);
              setRefresh(!refresh);
            }}
          />
        </div>
      </div>

      <ItemList
        key={refresh}
        onEdit={(id) => setSelectedId(id)}
      />
    </div>
  );
};

export default Home;
