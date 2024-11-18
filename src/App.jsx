import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Teacher from './components/Teacher'
import Login from './components/Login'
import Student from './components/Student'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/student" element={<Student />} />
    </Routes>
  )
}

export default App