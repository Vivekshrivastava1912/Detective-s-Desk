import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
// Apne header ka sahi path daalein

function App() {
  return (
    <>
      {/* Header hamesha top par dikhega */}
      <Header/>
      
      {/* Ye sabse zaroori hai! Yahan par aapke Login, Register wale pages load honge */}
      <main className='min-h-screen'>
        <Outlet /> 
      </main>
    </>
  )
}

export default App