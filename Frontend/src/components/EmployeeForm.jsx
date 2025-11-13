import React, { useState, useEffect } from "react";

export default function EmployeeForm({ deps, onSave, editing, onCancel}) {
      const [form, setForm] = useState({
            name: "",
            email: "",
            department_id: "",
      });
      useEffect(() => {
            if (editing) {
                  setForm({
                        name: editing.employee_name || "",
                        email: editing.employee_email || "",
                        department_id: editing.department_id || "",
                  });
            } else {
                  setForm({ name: "", email: "", department_id: "" });
            }
      }, [editing]);
      const submit = async (e) => {
            e.preventDefault();
            if (!form.name.trim() || !form.email.trim() || !form.department_id) return;
            onSave({
                  employee_name: form.name.trim(),
                  employee_email: form.email.trim(),
                  department_id: form.department_id,
            });
            setForm({ name: "", email: "", department_id: "" });
      };
      return (
            <form onSubmit={submit} className="form-row" style={{alignItems:'center'}}>
                  <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <select className="input" value={form.department_id} onChange={(e) => setForm({ ...form, department_id: e.target.value })}>
                        <option value="">Select Department</option>
                        {deps && deps.map((dept) => (
                              <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                  </select>
                  <div style={{display:'flex', gap:8}}>
                        <button className="btn btn-primary" type="submit">{editing? 'Update' : 'Add'}</button>
                        <button type="button" onClick={onCancel}>Cancel</button>
                        {editing && <button type="button" className="btn" onClick={onCancel}>Cancel</button>}
                  </div>
                  
            </form>
      );
}