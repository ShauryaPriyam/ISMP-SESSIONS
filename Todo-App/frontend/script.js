const API_URL = "http://localhost:5000/api/todos";

// Fetch Todos on load
async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  renderTodos(todos);
}

// Render Todos
function renderTodos(todos) {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-800 px-4 py-2 rounded";

    li.innerHTML = `
      <span class="${todo.completed ? "line-through text-gray-400" : ""}">
        ${todo.title}
      </span>
      <div class="flex gap-2">
        <button onclick="toggleComplete('${todo._id}', ${todo.completed})"
          class="bg-green-500 px-2 py-1 rounded hover:bg-green-600 text-sm">
          ${todo.completed ? "Undo" : "Done"}
        </button>
        <button onclick="deleteTodo('${todo._id}')"
          class="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-sm">
          Delete
        </button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Add Todo
async function addTodo() {
  const input = document.getElementById("todo-input");
  const title = input.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  fetchTodos();
}

// Toggle Complete
async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTodos();
}

// Delete Todo
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos();
}

// Initial Load
fetchTodos();
