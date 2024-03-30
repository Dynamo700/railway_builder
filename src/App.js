import './App.css';
import { useState } from "react";
import { motion } from "framer-motion";

const InitialItems = {
  'track 1': {x: 0, y: 0},
  'track 2': {x: 0, y: 0},
  'track 3': {x: 0, y: 0},
  'track 4': {x: 0, y: 0},
  'track 5': {x: 0, y: 0},
  'building 1': {x: 0, y: 0},
  'building 2': {x: 0, y: 0},
  'building 3': {x: 0, y: 0},
};


  

  export default function App() {
    const [positions, setPositions] = useState(InitialItems);
  
    const handleDrag = (event, info, id) => {
      const { point } = info;
      // Update the position for the dragged item
      setPositions((prev) => ({
        ...prev,
        [id]: { x: point.x, y: point.y },
      }));
    };
  
    return (
      <div>
        <h2>Items</h2>
        {Object.entries(positions).map(([id, pos]) => (
          <motion.div
            key={id}
            drag
            dragConstraints={{ left: 0, top: 0, right: 300, bottom: 300 }}
            onDrag={(event, info) => handleDrag(event, info, id)}
            style={{
              x: pos.x,
              y: pos.y,
              // Plus any additional styling
            }}
          >
            {id}
          </motion.div>
        ))}
      </div>
    );
  }
