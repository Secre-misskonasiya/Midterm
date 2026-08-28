import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'


function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    gadgetName: '',
    category: 'Smartphone',
    manufacturer: '',
    healthRating: '',
    techBrandName: '',
    userRole: 'Engineer',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!formData.gadgetName || formData.gadgetName.length < 3) errs.gadgetName = 'Min 3 characters required.';
    if (!formData.category) errs.category = 'Category is required.';
    if (!formData.manufacturer) errs.manufacturer = 'Manufacturer is required.';
    const num = Number(formData.healthRating);
    if (!formData.healthRating || num < 1 || num > 100) errs.healthRating = 'Rating must be between 1 and 100.';
    if (!formData.techBrandName) errs.techBrandName = 'Tech Brand Name is required.';
    if (!formData.userRole) errs.userRole = 'User Role is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setItems([{ id: Date.now(), ...formData, healthRating: Number(formData.healthRating) }, ...items]);
    setFormData({ gadgetName: '', category: 'Smartphone', manufacturer: '', healthRating: '', techBrandName: '', userRole: 'Engineer' });
    setErrors({});
  };

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

  .form-group {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: #475569;
  }

  .form-group input,
  .form-group select {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #88eb25;
  }

  .radio-group {
    display: flex;
    gap: 16px;
    margin-top: 4px;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;
  }

  .btn-submit {
    width: 100%;
    padding: 10px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;
  }

  .btn-submit:hover {
    background-color: #1d4ed8;
  }

  .error-msg {
    color: #dc2626;
    font-size: 0.75rem;
    margin-top: 2px;
  }
  `}</style>

      <header>
        <h1>Tech Gadget & Inventory Hub</h1>
      </header>

      <div className="grid-layout">
        <div className="card">
        <h2>Register Tech Gadget</h2>
         <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Gadget Name</label>
            <input type="text" name="gadgetName" value={formData.gadgetName} onChange={handleChange} />
            {errors.gadgetName && <span className="error-msg">{errors.gadgetName}</span>}
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Wearable">Wearable</option>
              <option value="Audio">Audio</option>
            </select>
          </div>
          <div className="form-group">
            <label>Manufacturer</label>
            <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
            {errors.manufacturer && <span className="error-msg">{errors.manufacturer}</span>}
          </div>
          <div className="form-group">
            <label>Health Rating (1-100)</label>
            <input type="number" name="healthRating" value={formData.healthRating} onChange={handleChange} />
            {errors.healthRating && <span className="error-msg">{errors.healthRating}</span>}
          </div>
          <div className="form-group">
            <label>Tech Brand Name</label>
            <input type="text" name="techBrandName" value={formData.techBrandName} onChange={handleChange} />
            {errors.techBrandName && <span className="error-msg">{errors.techBrandName}</span>}
          </div>
          <div className="form-group">
            <label>User Role</label>
            <div className="radio-group">
              <label><input type="radio" name="userRole" value="Engineer" checked={formData.userRole === 'Engineer'} onChange={handleChange} /> Engineer</label>
              <label><input type="radio" name="userRole" value="Tester" checked={formData.userRole === 'Tester'} onChange={handleChange} /> Tester</label>
            </div>
            </div>
            <button type="submit" className="btn-submit">Add Gadget</button>
          </form>
  
        </div>
        
      </div> 
    </div>
  );
}

export default App
