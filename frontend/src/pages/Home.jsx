import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h2>Simple Item Management</h2>
            <ItemForm onItemAdded={() => setRefresh(!refresh)} />
            <ItemList key={refresh} />
        </div>
    );
};

export default Home;
