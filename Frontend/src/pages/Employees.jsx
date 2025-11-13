import React, { useEffect, useState } from 'react';
import API from '../api/api';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Pagination from '../components/Pagination';
export default function Employees(){
      const [deps, setDeps] = useState([]);
      const [employeesData, setEmployeesData] = useState({ employees:[], page:1, pageSize:5, total:0 });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [editing, setEditing] = useState(null);
      const fetchDeps = async () => {
            try {
                  const res = await API.get('/departments');
                  setDeps(res.data.data || []);
            }
            catch (err) {
                  console.error('Failed to fetch departments:', err);
            }
      }
      const fetchEmployees = async (page=1) =>{
            setLoading(true); setError('');
            try{
                  const res = await API.get(`/employees?page=${page}`);
                  setEmployeesData(res.data.data);
            }catch(err){ setError('Failed to load employees'); }
            setLoading(false);
      };
      useEffect(()=>{ fetchDeps(); fetchEmployees(1); },[]);
      const onSave = async (payload) =>{
            setError('');
            try{
                  if(editing){
                        await API.put(`/employees/${editing._id}`, payload);
                        setEditing(null);
                  } else {
                        await API.post('/employees', payload);
                  }
                  fetchEmployees(1);
            }catch(err){ setError(err?.response?.data?.error || 'Save failed'); }
      };
      const deleteEmp = async (id) =>{
            if(!window.confirm('Delete employee?')) return;
            try{ await API.delete(`/employees/${id}`);
                  fetchEmployees(employeesData.page); 
            }
            catch(e){ setError('Delete failed'); }
      };
      const startEdit = (emp) =>{
            setEditing(emp);
            window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      const cancelEdit = ()=>{ setEditing(null); };
      const onPageChange = (p) => fetchEmployees(p);
      return (
            <div className="container">
                  <h2>Employees</h2>
                  <div className="card">
                        <EmployeeForm deps={deps} onSave={onSave} editing={editing} onCancel={cancelEdit} />
                        {error && <div className="error">{error}</div>}
                  </div>
                  <div style={{marginTop:12}} className="card">
                        {loading ? <div>Loading...</div> : (
                              <>
                                    <EmployeeList employees={employeesData.employees} onEdit={startEdit} onDelete={deleteEmp} />
                                    <Pagination page={employeesData.page} pageSize={employeesData.pageSize} total={employeesData.total} onChange={onPageChange} />
                              </>
                        )}
                  </div>
            </div>
      );
}