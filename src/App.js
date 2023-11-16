import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './component/ItemList';
import AddItem from './component/AddItem';
import CustomerPurchases from './component/CustomerPurchases';
import Navigation from './component/Navigation'; // Import the Navigation component

function App() {
  const [items, setItems] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('inventory')) || [];
    setItems(storedItems);

    const storedPurchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    setPurchases(storedPurchaseHistory);
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

  const deleteItem = (itemId) => {
    // Implement the logic to delete an item based on the itemId
    // This can involve updating the 'items' state and also removing it from local storage.
    // Make sure to handle any necessary validation and error checking here.

    // Example logic (you need to adapt this to your specific use case):
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    localStorage.setItem('inventory', JSON.stringify(updatedItems));
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

        // Update the purchases
        setPurchases((prevPurchases) => [...prevPurchases, purchase]);
        localStorage.setItem('purchaseHistory', JSON.stringify([...purchases, purchase]));
      } else {
        alert(`Not enough ${purchase.item} in stock.`);
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation /> {/* Show navigation */}
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
                <th>Quantity(kg)</th>
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
