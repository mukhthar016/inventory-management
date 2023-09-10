import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ItemList from './component/ItemList';
import AddItem from './component/AddItem';
import CustomerPurchases from './component/CustomerPurchases';
import DeleteItem from './component/DeleteItem';
import Login from './component/Login';
import './App.css'

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [items, setItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [showDeleteItem, setShowDeleteItem] = useState(false);

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

  const toggleDeleteItem = () => {
    setShowDeleteItem(!showDeleteItem);
  };

  const handleUserLogin = () => {
    // Perform any necessary logic to verify user credentials or set user authentication status.
    setUserAuthenticated(true); // For simplicity, we're assuming the user is authenticated upon successful login.
  };

  const handleLogout = () => {
    // Perform any necessary logout logic.
    setUserAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <nav>
<ul>


  <li>
    <Link to="/" className="nav-button">Inventory</Link>
  </li>



  <li>
    <Link to="/add" className="nav-button">Add Item</Link>
  </li>



  <li>
    <Link to="/purchases" className="nav-button">Customer Purchases</Link>
  </li>



  <li>
    {userAuthenticated ? (
      <button onClick={handleLogout} className="logout-button">Logout</button>
    ) : (
      <Link to="/login" className="login-button">Login</Link>
    )}
  </li>

  
</ul>

        </nav>
        <Routes>
          {userAuthenticated ? (
            <>
              <Route path="/" element={<ItemList items={items} deleteItem={deleteItem} />} />
              <Route path="/add" element={<AddItem addItem={addItem} />} />
              <Route path="/purchases" element={<CustomerPurchases items={items} handlePurchase={handlePurchase} />} />
              {showDeleteItem && <DeleteItem onDeleteItem={deleteItem} />}
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
            </>
          ) : (
            <Route
              path="/login"
              element={userAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleUserLogin} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;






