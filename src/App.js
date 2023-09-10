// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemList from './component/ItemList';
import AddItem from './component/AddItem';
import CustomerPurchases from './component/CustomerPurchases'; // Import the new component

function App() {
  const [items, setItems] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('inventory')) || [];
    setItems(storedItems);
  }, []);

  const addItem = (newItem) => {
    // Check if an item with the same name already exists
    const existingItemIndex = items.findIndex((item) => item.name === newItem.name);
  
    if (existingItemIndex !== -1) {
      // If it exists, increment the quantity
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
      localStorage.setItem('inventory', JSON.stringify(updatedItems));
      setItems(updatedItems); // Update the state
    } else {
      // If it doesn't exist, add the new item to the list
      const updatedItems = [...items, newItem];
      localStorage.setItem('inventory', JSON.stringify(updatedItems));
      setItems(updatedItems); // Update the state
    }
  };
  
  

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem('inventory', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handlePurchase = (purchase) => {
    // Update the items' quantities
    const updatedItems = [...items];
    const selectedItem = updatedItems.find((item) => item.name === purchase.item);
    if (selectedItem) {
      const newQuantity = selectedItem.quantity - purchase.quantity;
      if (newQuantity >= 0) {
        selectedItem.quantity = newQuantity;
        localStorage.setItem('inventory', JSON.stringify(updatedItems));
        setItems(updatedItems);
        setPurchases((prevPurchases) => [...prevPurchases, purchase]);
      } else {
        alert(`Not enough ${purchase.item} in stock.`);
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-link">Inventory</Link>
            </li>
            <li>
              <Link to="/add" className="nav-link">Add Item</Link>
            </li>
            <li>
              <Link to="/purchases" className="nav-link">Customer Purchases</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ItemList items={items} deleteItem={deleteItem} />} />
          <Route path="/add" element={<AddItem addItem={addItem} />} />
          <Route path="/purchases" element={<CustomerPurchases items={items} handlePurchase={handlePurchase} />} />
        </Routes>
        <div>
          <h2>Customer Purchase History</h2>
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total Bill</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.customerName}</td>
                  <td>{purchase.item}</td>
                  <td>{purchase.quantity}</td>
                  <td>₹{purchase.totalBill.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Router>
  );
}

export default App;
// App.js






