import React from 'react'
import { Header } from './layout/header/Header'
import './App.scss'
import { Sidebar } from './layout/Sidebar'
import { Template } from './pages/Template'

function App() {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header></Header>
      <Sidebar></Sidebar>
      <main className="p-4 md:ml-64 h-auto pt-20">
        <Template></Template>
      </main>
    </div>
  )
}

export default App
