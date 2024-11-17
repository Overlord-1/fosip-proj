import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClaudeTest from './components/claudeTest'
import Test from './components/Test'

const App = () => {
  return (  
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/claude" element={<ClaudeTest />} />
    </Routes>
  )
}

export default App