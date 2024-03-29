import './App.css';
import { useState } from "react";
import { Reorder } from "framer-motion";

const InitialItems = ["Track 1", "Track 2", "Track 3", "Building 1"];

export default function App() {
  const [items, setItems] = useState(InitialItems);

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
