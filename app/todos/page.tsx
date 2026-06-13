// app/todos/page.tsx
import ToDoList from "@/components/ToDoList";

// Server Container passes execution boundary control off smoothly
export default function TodosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Interactive System Tasks (CSR)</h1>
      <ToDoList />
    </div>
  );
}