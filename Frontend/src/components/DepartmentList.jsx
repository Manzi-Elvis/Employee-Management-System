import React from 'react';
export default function DepartmentList({ departments, onEdit, onDelete, onShowEmployees }){
      return (
            <ul>
                  {departments.map(d=> (
                        <li key={d._id} style={{display:'flex',justifyContent:'spacebetween',padding:'8px 0'}}>
                              <div>
                                    <strong style={{cursor:'pointer'}} onClick={()=>onShowEmployees(d)}>{d.department_name}</strong>
                                    <div className="small">ID: {d._id}</div>
                              </div>
                              <div>
                                    <button className="btn" onClick={()=>navigator.clipboard.writeText(d._id)}>Copy ID</button>
                                    <button className="btn" style={{marginLeft:8}} onClick={()=>onEdit(d)}>Edit</button>
                                    <button className="btn btn-danger" style={{marginLeft:8}} onClick={()=>onDelete(d._id)}>Delete</button>
                              </div>
                        </li>
                  ))}
                  {departments.length===0 && <div className="small">No departments created yet.</div>}
            </ul>
      );
}