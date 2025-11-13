import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DepartmentForm({ onSave, editing }) {
      const [name, setName] = useState("");
      useEffect(()=>{ 
            if(editing) setName(editing.department_name || ''); 
           else setName(''); },[editing]
      );

      const submit = async (e) => {
            e.preventDefault();
            if (!name.trim()) return;
            onSave({ department_name: name.trim() });
            setName("");
      };
      return (
            <form onSubmit={submit}>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Department Name" />
                  <div style={{display: 'flex', gap:8}}>
                        <button className="btn btn-primary" type="submit">{editing ? "Update Department" : "Add Department"}</button>
                  </div>
            </form>
      );
};