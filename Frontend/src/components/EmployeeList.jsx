import React from "react";
export default function EmployeeList( {employees, onEdit, onDelete} ) {
      return (
            <table className="table">
                  <thead>
                        <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Department</th>
                              <th>Actions</th>
                        </tr>
                  </thead>
                  <tbody>
                        {employees.map(emp => (
                              <tr key={emp._id}>
                                    <td>{emp._id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department_id?.department_name || '-'}</td>
                                    <td>
                                          <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(emp)}>Edit</button>
                                          <button className="btn btn-danger btn-sm" style={{marginLeft:8}} onClick={() => onDelete(emp._id)}>Delete</button>
                                    </td>
                              </tr>
                        ))}
                        {employees.length === 0 && (
                              <tr>
                                    <td colSpan="6" className="text-center small">No employees found.</td>
                              </tr>
                        )}
                  </tbody>
            </table>
      );
}