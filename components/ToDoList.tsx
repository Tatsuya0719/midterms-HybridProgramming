"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/todos?limit=15")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
        setLoading(false);
      });
  }, []);

  // New function to handle checking/unchecking items locally
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  if (loading) return <p className="page-subtitle">Loading browser client states...</p>;

  return (
    <div className="dashboard-panel" style={{ maxWidth: "600px" }}>
      {/* Interactive Controls */}
      <div className="todo-filters">
        {( ["all", "completed", "pending"] as ("all" | "completed" | "pending")[] ).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`btn-filter ${filter === type ? "active" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo Items */}
      <ul className="data-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item" style={{ cursor: "pointer" }}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)} // Fires the state update on click
              style={{ cursor: "pointer" }}
            />
            <span 
              className={todo.completed ? "todo-completed" : ""}
              onClick={() => toggleTodo(todo.id)} // Let users click the text to toggle too!
              style={{ flex: 1 }}
            >
              {todo.todo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}