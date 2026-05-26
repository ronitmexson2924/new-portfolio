import { useState } from 'react';
import FlowArtDefaultDemo from './components/demo';
import Loader from './components/Loader';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loader sits on top; portfolio is rendered underneath immediately */}
      <Loader onDone={() => setLoaded(true)} />
      <div
        style={{
          opacity:    loaded ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <FlowArtDefaultDemo />
      </div>
    </>
  );
}

export default App;
