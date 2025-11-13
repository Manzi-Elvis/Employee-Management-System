import { useState } from 'react'
import DepartmentList from './components/DepartmentList.jsx'
import DepartmentForm from './components/DepartmentForm.jsx'
import './App.css'

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);
  return (
    <div className=''App>
      <h1>Employee Management System</h1>
      <DepartmentForm onAdd={handleRefresh} />
      <DepartmentList refresh={refresh} />
    </div>
  )
}

export default App
