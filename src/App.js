import './App.css';
import { useState } from "react";
import { motion } from "framer-motion";

const PngComponents = {
  'track 1': <img src="/images/Track_1.PNG" alt="track 1" height="30%" width="30%" />,
  
};

const InitialItems = {
  'track 1': {x: 0, y: 0, inSandbox: false}, // Ensure `inSandbox` is part of initial state
  
};

export default function App() {
  const [positions, setPositions] = useState(InitialItems);

  const handleDrag = (event, info, id) => {
    const sandbox = document.getElementById('sandbox');
    const { left, top, right, bottom } = sandbox.getBoundingClientRect();
    const {x, y} = info.point;
    // Update the position for the dragged item

    if (x > left && x < right && y > top && y < bottom) {
      setPositions((prev) => ({
        ...prev,
        [id]: { ...prev[id], x: x - left, y: y - top, inSandbox: true },
      }));
    }
  };

  return (
    <div>
      <h2>Items</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {Object.entries(positions).map(([id, pos]) => {
            if (!pos.inSandbox) {
              return (
                <motion.div
                  key={id}
                  drag
                  onDragEnd={(event, info) => handleDrag(event, info, id)}
                  style={{
                    marginBottom: '10px',
                    cursor: 'grab',
                    padding: '10px',
                    border: '1px solid black',
                  }}
                >
                  {PngComponents[id] || id}
                </motion.div>
              );
            } else return null;
          })}
        </div>
        <div
          id="sandbox"
          style={{
            height: '550px',
            width: '800px',
            border: '2px solid green',
            position: 'relative',
          }}
        >
          <h3>Sandbox</h3>
          {Object.entries(positions).map(([id, pos]) => {
            if (pos.inSandbox) {
              return (
                <motion.div
                  key={id}
                  drag
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  style={{
                    x: pos.x,
                    y: pos.y,
                    position: 'absolute',
                    cursor: 'grab',
                    padding: '10px',
                    border: '1px solid black',
                  }}
                >
                  {PngComponents[id] || id}
                </motion.div>
              );
            } else return null;
          })}
        </div>
      </div>
    </div>
  );
}
