// CustomerPurchases.jsx
import React, { useState } from 'react';
import './tableStyle.css'; // Import the CSS file into your component


const CustomerPurchases = ({ items, handlePurchase }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate total bill
    const selectedProduct = items.find((item) => item.name === selectedItem);
    const totalBill = selectedProduct ? selectedProduct.price * quantity : 0;

    // Create a purchase object
    const purchase = {
      customerName,
      item: selectedItem,
      quantity,
      totalBill,
    };

    // Pass the purchase object to a function in your main App component
    handlePurchase(purchase);

    // Reset form fields
    setCustomerName('');
    setSelectedItem('');
    setQuantity('');
  };

  return (
    <div>
      <h2>Customer Purchases</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
        <label>
          Select Item:
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            required
          >
            <option value="" disabled>Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
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
        <button type="submit">Add Purchase</button>
      </form>
    </div>
  );
};

export default CustomerPurchases;
