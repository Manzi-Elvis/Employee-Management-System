import React, { useState } from "react";
import axios from "axios";

export default function DepartmentForm({ onAdd }) {
      const [name, setName] = useState("");
      const handleSubmit = async (e) => {
            e.preventDefault();
            if (!name) return;
            await axios.post("http://localhost:5000/api/departments", { department_name: name });
            setName("");
            if (onAdd) onAdd();
      };
      return (
            <form onSubmit={handleSubmit}>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Department Name" />
                  <button type="submit">Add Department</button>
            </form>
      );
};