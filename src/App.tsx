import { useState } from 'react'
import './App.css'
import Todos from './components/todo'

function App() {
  return (
    <>
      <header>
        <h1>funDo</h1>
      </header>
      <Todos />
    </>
  )
}

export default App
