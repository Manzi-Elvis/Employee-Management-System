import React, { useEffect, useState } from 'react';
import API from '../api/api';
import DepartmentForm from '../components/DepartmentForm';
import DepartmentList from '../components/DepartmentList';

//Local (non-exported) component for showing employees in a department
function DepartmentEmployeesModal({ department, onClose }) {
  const [data, setData] = useState({ employees: [], page: 1, pageSize: 5, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async (page = 1) => {
    setLoading(true);
    try {
      const res = await API.get(`/employees/by-department/${department._id}?page=${page}`);
      setData(res.data.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(1);
  }, [department._id]);

  return (
    <div className="modal">
      <div className="panel">
        <h3>Employees in {department.department_name}</h3>
        <button style={{ float: 'right' }} onClick={onClose}>Close</button>
        <div style={{ clear: 'both' }} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Position</th><th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map(e => (
                  <tr key={e._id}>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.position}</td>
                    <td>{e.salary}</td>
                  </tr>
                ))}
                {data.employees.length === 0 && (
                  <tr>
                    <td colSpan={4} className="small">No employees in this department.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="btn"
                onClick={() => fetchEmployees(Math.max(1, data.page - 1))}
                disabled={data.page <= 1}
              >
                Prev
              </button>
              <div className="small">
                Page {data.page} of {Math.max(1, Math.ceil(data.total / data.pageSize))}
              </div>
              <button
                className="btn"
                onClick={() => fetchEmployees(Math.min(Math.ceil(data.total / data.pageSize), data.page + 1))}
                disabled={data.page >= Math.ceil(data.total / data.pageSize)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//  Main component for Departments page
export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [showDeptEmployees, setShowDeptEmployees] = useState(null);

  const fetchDeps = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/departments');
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch departments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeps();
  }, []);

  const onSave = async (payload) => {
    setError('');
    try {
      if (editing) {
        await API.put(`/departments/${editing._id}`, payload);
        setEditing(null);
      } else {
        await API.post('/departments', payload);
      }
      fetchDeps();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to save department.');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete department?')) return;
    try {
      await API.delete(`/departments/${id}`);
      fetchDeps();
    } catch {
      setError('Delete failed');
    }
  };

  const startEdit = (dept) => {
    setEditing(dept);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h2>Departments</h2>

      <div className="card">
        <DepartmentForm onSave={onSave} editing={editing} />
        {editing && (
          <button className="btn" onClick={() => setEditing(null)}>
            Cancel edit
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </div>

      <div style={{ marginTop: 12 }} className="card">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DepartmentList
            departments={departments}
            onEdit={startEdit}
            onDelete={remove}
            onShowEmployees={setShowDeptEmployees}
          />
        )}
      </div>

      {showDeptEmployees && (
        <DepartmentEmployeesModal
          department={showDeptEmployees}
          onClose={() => setShowDeptEmployees(null)}
        />
      )}
    </div>
  );
}
