import { useState } from 'react';
import './App.css';

export default function App() {
  // State for input fields
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // State for category list and ID sequence counter
  const [categories, setCategories] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Helper function to format Category ID (e.g., 1 -> "CAT-001")
  const formatCategoryId = (num) => {
    return `CAT-${String(num).padStart(3, '0')}`;
  };

  // Refactored handleAddCategory logic
  const handleAddCategory = (e) => {
    e.preventDefault();

    const trimmedName = catName.trim();
    const trimmedDesc = catDesc.trim();

    // Guard Clause Validation
    if (!trimmedName || !trimmedDesc) {
      alert("Please complete both input fields.");
      return;
    }

    // Formatting Logic (Matching baseline)
    let formattedName = trimmedName.toUpperCase();
    if (formattedName.length > 25) {
      formattedName = formattedName.slice(0, 25) + "...";
    }

    let formattedDesc = trimmedDesc;
    if (formattedDesc.length > 25) {
      formattedDesc = formattedDesc.slice(0, 25) + "...";
    }

    // Add new category item with unique formatted ID
    const newCategory = {
      id: Date.now(),
      categoryId: formatCategoryId(nextId),
      name: formattedName,
      desc: formattedDesc,
    };

    setCategories([...categories, newCategory]);
    setNextId(prev => prev + 1); // Increment ID counter for next entry

    // Reset inputs
    setCatName('');
    setCatDesc('');
  };

  // Delete Category Handler
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="bg-light py-5 min-vh-100">
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            
            {/* Registration Card */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                <h1 className="h5 mb-0 fw-bold">Income Category Registration</h1>
                <span className="badge bg-light text-primary fw-bold">
                  Next ID: {formatCategoryId(nextId)}
                </span>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddCategory}>
                  <div className="mb-3">
                    <label htmlFor="txtCatName" className="form-label fw-semibold">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="txtCatName"
                      className="form-control"
                      placeholder="e.g., Consulting"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="txtCatDesc" className="form-label fw-semibold">
                      Description
                    </label>
                    <input
                      type="text"
                      id="txtCatDesc"
                      className="form-control"
                      placeholder="e.g., Enterprise technical support contract"
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    id="btnAdd"
                    className="btn btn-primary px-4 fw-semibold"
                  >
                    Save Category
                  </button>
                </form>
              </div>
            </div>

            {/* Ledger Table Card */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h2 className="h6 mb-0 text-secondary fw-bold text-uppercase">
                  Registered Categories
                </h2>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: '15%' }}>Cat ID</th>
                      <th scope="col" className="w-35">Category Name</th>
                      <th scope="col">Description</th>
                      <th scope="col" className="text-end" style={{ width: '15%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody id="listIncomeCat">
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
                          No categories registered yet.
                        </td>
                      </tr>
                    ) : (
                      categories.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className="badge bg-secondary">{item.categoryId}</span>
                          </td>
                          <td className="fw-semibold text-dark">{item.name}</td>
                          <td className="text-secondary">{item.desc}</td>
                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteCategory(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}