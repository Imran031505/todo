import { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("")
    }

  return (
    <form onSubmit={add} className="flex gap-3 pt-3 pb-5 ">
    <input
        type="text"
        placeholder="Add a new todo..."
        className="flex-1 px-6 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all duration-300 placeholder:text-gray-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
    />
    <button
        type="submit"
        className="px-6 py-3 text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-400 transform transition-all duration-300 hover:shadow-lg"
    >
        Add
    </button>
</form>

  );
}

export default TodoForm;