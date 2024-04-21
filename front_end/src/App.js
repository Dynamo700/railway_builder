import './App.css';
import { useState } from "react";
import { motion } from "framer-motion";

const PngComponents = {
  'track 1': <img src="/images/Track_1.PNG" alt="track 1" height="140%" width="100%" />,
  'track 2': <img src="/images/Track_2.PNG" alt="track 2" height="140%" width="100%" />,
  'track 3': <img src="/images/Track_3.PNG" alt="track 3" height="140%" width="100%" />,
  'building_1': <img src="/images/Building_1.PNG" alt="building 1" height="130%" width="120%" />,
  'building_2': <img src="/images/Building_2.PNG" alt="building 2" height="130%" width="120%" />
  

  
};

const InitialItems = {
  'track 1': {x: 0, y: 0, inSandbox: false}, // Ensure `inSandbox` is part of initial state
  'track 2': {x: 0, y: 0, inSandbox: false},
  'track 3': {x: 0, y: 0, inSandbox: false},
  'building_1': {x: 0, y: 0, inSandbox: false},
  'building_2': {x: 0, y: 0, inSandbox: false}
  
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
        <div id="items" style={{
          height: '550px',
          width: '350px',
          border: '2px solid black',
          position: 'relative', // Corrected from 'bottom' to 'relative'
          overflow: 'auto' // Added to enable scrolling within the container if needed
        }}>
          {Object.entries(positions).map(([id, pos]) => {
            if (!pos.inSandbox) {
              return (
                <motion.div
                  key={id}
                  drag
                  onDragEnd={(event, info) => handleDrag(event, info, id)}
                  style={{
                    height: '75px',
                    width: '250px',
                    marginBottom: '5px',
                    cursor: 'grab',
                    padding: '10px',
                    border: '1px solid black',
                    backgroundColor: 'white' 
                  }}
                >
                  {PngComponents[id]}
                </motion.div>
              );
            }
            return null;
          })}
        </div>
        <div id="sandbox" style={{
          height: '550px',
          width: '800px',
          border: '2px solid green',
          position: 'relative'
        }}>
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
                    border: '1px solid black'
                  }}
                >
                  {PngComponents[id]}
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
