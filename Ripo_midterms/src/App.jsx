import { useState, useEffect, useMemo } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender,} from '@tanstack/react-table';

function App() {
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const [activeItemCard, setActiveItemCard] = useState(null);
  const [formData, setFormData] = useState({
    gadgetName: '',
    category: 'Smartphone',
    manufacturer: '',
    healthRating: '',
    techBrandName: '',
    userRole: 'Engineer',
  });

  useEffect(() => {
    if (selectedItem) {
      setActiveItemCard(selectedItem);
    }
  }, [selectedItem]);

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

  const filteredData = useMemo(() => {
    if (categoryFilter === 'All') return items;
    return items.filter((item) => item.category === categoryFilter);
  }, [items, categoryFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: 'gadgetName', header: 'Gadget Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'manufacturer', header: 'Manufacturer' },
      { accessorKey: 'healthRating', header: 'Health Rating' },
      { accessorKey: 'techBrandName', header: 'Tech Brand' },
      {
        accessorKey: 'userRole',
        header: 'User Role',
        cell: (info) => {
          const role = info.getValue();
          const badgeClass = role === 'Engineer' ? 'badge-engineer' : 'badge-tester';
          return <span className={`badge ${badgeClass}`}>{role}</span>;
        },
      },
    ],
    []
  );
  
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } },
  });
 return (
      
  <div className="container">
  <style>{`
  html, body, input, select, button, textarea {
  font-family: Arial, sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
   
  }

  body {
    background-color: #f4f7f6;
    color: #18181b;
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
    background-color: #000000;
    color: #fff;
    border-radius: 8px;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr;
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
    background-color: #ffffff;
    color: #000000;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #88eb25;
  }

  .radio-group {
   background-color: #ffffff;
    display: flex;
    gap: 16px;
    margin-top: 4px;
  }

  .radio-group input[type="radio"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: #ffffff;
  display: inline-block;
  position: relative;
}
  .radio-group input[type="radio"]:checked {
  background-color: #000;
  box-shadow: inset 0 0 0 3px #fff; 
}

  .radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #000000; 
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
  
  .filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
    font-size: 0.875rem;
  }

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background-color: #f8fafc;
    color: #475569;
    font-weight: 600;
  }

  tbody tr {
    cursor: pointer;
    transition: background 0.2s;
  }

  tbody tr:hover {
    background-color: #f1f5f9;
  }

  tbody tr.selected {
    background-color: #e0f2fe;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #e2e8f0;
  }

  .pagination button {
    padding: 8px 16px;
    border: 1px solid #cbd5e1;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .badge,
  .badge-engineer,
  .badge-tester { 
    display: inline;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    background: none;
    color: #000000;
    font-size: 0.9rem;
    font-weight: normal;
  }

  .detail-card {
    background: #000000;
    color: #fff;
  }

  .detail-card h2 {
    color: #fff;
    border-bottom-color: #27272a;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
  }

  .detail-item {
    font-size: 0.9rem;
  }

  .detail-item span {
    display: block;
    color: #94a3b8;
    font-size: 0.75rem;
  }
  
  .nav-tabs {
  display: flex;
  gap: 12px;
}

.nav-tabs button {
  padding: 10px 18px;
  border: none;
  background: #e2e8f0;
  color: #475569;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}

.nav-tabs button.active {
  background: #2563eb;
  color: #fff;
}
  `}</style>
    
      <header>
        <h1>Tech Gadget & Inventory Hub</h1>
      </header>

      <div className="nav-tabs">
        <button className={activeTab === 'form' ? 'active' : ''} onClick={() => setActiveTab('form')}>
          Register Gadget
        </button>
        <button className={activeTab === 'registry' ? 'active' : ''} onClick={() => setActiveTab('registry')}>
          View Inventory ({items.length})
        </button>
      </div>

      {activeTab === 'form' && (
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
      )}

      {activeTab === 'registry' && (
        <>
        <div className="card">
          <div className="filter-container">
            <h2>Inventory Registry Table</h2>
            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', margin: 0 }}>
              <label style={{ margin: 0 }}>Filter Category:</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Wearable">Wearable</option>
                <option value="Audio">Audio</option>
              </select>
            </div>
          </div>

          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={selectedItem?.id === row.original.id ? 'selected' : ''}
                    onClick={() => setSelectedItem(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center', color: '#94a3b8' }}>
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
            <span>Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount() || 1}</span>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
          </div>
        </div>
        
        <div className="card detail-card">
            <h2>Active Item Profile</h2>
            {activeItemCard ? (
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{activeItemCard.gadgetName}</h3>
                <div className="detail-grid">
                  <div className="detail-item"><span>Category</span>{activeItemCard.category}</div>
                  <div className="detail-item"><span>Manufacturer</span>{activeItemCard.manufacturer}</div>
                  <div className="detail-item"><span>Tech Brand</span>{activeItemCard.techBrandName}</div>
                  <div className="detail-item"><span>Health Rating</span>{activeItemCard.healthRating} / 100</div>
                  <div className="detail-item">
                    <span>User Role</span>
                  <span style={{ fontSize: '0.9rem', color: '#ffffff' }}>{activeItemCard.userRole} </span>
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: '#94a3b8' }}>Click any row in the table above to inspect item details.</p>
            )}
          </div>
        </>
      )}
      
    </div>
    
  );
}

export default App
