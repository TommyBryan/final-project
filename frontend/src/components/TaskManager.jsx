import { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, done: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Task Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          placeholder="New task..."
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, idx) => (
          <li
            key={idx}
            onClick={() => toggleTask(idx)}
            className={`cursor-pointer px-2 py-1 rounded ${
              task.done ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
