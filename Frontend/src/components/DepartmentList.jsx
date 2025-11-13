import React, {useEffect, useState} from "react";
import axios from "axios";

export default function DepartmentList({refresh}) {
    const [departments, setDepartments] = useState([]);
    
    const fetchDepartments = async () => {
      const res = await axios.get("http://localhost:5000/api/departments/");
      setDepartments(res.data.data);
    };

    useEffect(() => {
      fetchDepartments();
    }, [refresh]);

      return (
            <ul>
                  {departments.map((dept) => (
                        <li key={dep._id}>{dep.department_name}</li>
                  ))}
            </ul>
      );
};