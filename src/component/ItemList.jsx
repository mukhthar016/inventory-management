import React, { useState } from 'react';
import './tableStyle.css';

const ItemList = ({ items, deleteItem }) => {
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setEditedItem({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    });
  };

  const handleSaveClick = () => {
    // Update the item in your data source with editedItem
    // This is where you would typically make an API call or update the state
    // of your parent component with the edited item.

    // After updating the item, reset editItemId and editedItem
    setEditItemId(null);
    setEditedItem({
      name: '',
      quantity:0 ,
      price: 0,
    });
  };

  const handleCancelClick = () => {
    setEditItemId(null);
    setEditedItem({
      name: '',
      quantity: 0,
      price: 0,
    });
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Inventory Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{editItemId === item.id ? <input type="text" value={editedItem.name} onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} /> : item.name}</td>
              <td>{editItemId === item.id ? <input type="number" value={editedItem.quantity} onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })} /> : item.quantity}</td>
              <td>{editItemId === item.id ? <input type="number" value={editedItem.price} onChange={(e) => setEditedItem({ ...editedItem, price: e.target.value })} /> : item.price}</td>
              <td>
                {editItemId === item.id ? (
                  <>
                    <button className='green' onClick={handleSaveClick}>Save</button>
                    <button className='red' onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='blue' onClick={() => handleEditClick(item)}>Edit</button>
                    <button className='red' onClick={() => deleteItem(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;









