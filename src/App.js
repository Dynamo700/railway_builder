import './App.css';
import { useState } from "react";
import { Reorder } from "framer-motion";

const InitialItems = ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5", "Building 1", "Building 2"];

export default function App() {
  const [initialItems, setInitialItems] = useState(InitialItems);
  const [droppedItems, setDroppedItems] = useState([]);

  // Handles moving an item from the initial list to the dropped list
  const moveItemToDropped = (item) => {
    setDroppedItems((currentItems) => [...currentItems, item]);
    setInitialItems((currentItems) => currentItems.filter((i) => i !== item));
  };

  return (
    <div className="app">
      <div className="initial-items">
        <h2>Items List</h2>
        {initialItems.map((item) => (
          <div key={item} className="item" onClick={() => moveItemToDropped(item)}>
            {item}
          </div>
        ))}
      </div>
      <div className="dropped-items">
        <h2>Sandbox</h2>
        <Reorder.Group axis="y" values={droppedItems} onReorder={setDroppedItems} className="list">
          {droppedItems.map((item) => (
            <Reorder.Item key={item} value={item} className="reorder-item">
              {item}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

