
import React, { useState } from 'react';
import './tableStyle.css'; 


const AddItem = ({ addItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    addItem(newItem);
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            step="0.01"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;




