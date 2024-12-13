import { useState, useEffect } from 'react'

import './App.css'


import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoFrom'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-12">
    <div className="max-w-xl mx-auto">
    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        My Todo List
      </h1>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
            <TodoForm />
        
        <div className="space-y-2">
            {todos.length > 0 ? (
                todos.map((todo) => (
                  <div
                  key={todo.id}
                  className="transition-all duration-300 hover:-translate-y-1"
                >
                    <TodoItem key={todo.id} todo={todo} />
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No todos yet. Add one to get started!</p>
            )}
        </div>
        </div>
    </div>
    
</div>

    </TodoProvider>
  )
}

export default App