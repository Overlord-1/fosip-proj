import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClaudeTest from './components/claudeTest'
import Login from './components/Login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/claude" element={<ClaudeTest />} />
    </Routes>
  )
}

export default App