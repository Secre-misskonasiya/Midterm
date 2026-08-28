import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'


function App() {
  const [items, setItems] = useState([]);
 return (
      
  <div className="container">
  <style>{`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  body {
    background-color: #f4f7f6;
    color: #333;
    padding: 20px;
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  header {
    text-align: center;
    padding: 16px;
    background-color: #1e293b;
    color: #fff;
    border-radius: 8px;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .card h2 {
    margin-bottom: 16px;
    font-size: 1.25rem;
    color: #0f172a;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
  }
  `}</style>

      <header>
        <h1>Tech Gadget & Inventory Hub</h1>
      </header>

      <div className="grid-layout">
        <div className="card">
          <h2>Register Tech Gadget</h2>
          <p></p>
        </div>
        
      </div>
    </div>
  );
}

export default App
