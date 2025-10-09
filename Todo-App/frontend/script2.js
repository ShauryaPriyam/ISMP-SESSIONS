// ==========================
// 🧩 API URL & LOCAL STORAGE
// ==========================
const API_URL = "http://localhost:5000/api/todos";

// ==========================
// 🗂️ FETCH TODOS
// ==========================
async function fetchTodos() {
  const res = await fetch(API_URL);      // GET all todos from server
  const todos = await res.json();              // Store in local array
  renderTodos(todos);                    // Render list on page
}

// ==========================
// 🖋️ RENDER TODOS
// ==========================
const renderTodos = (todos) => {
  const list = document.getElementById("todo-list");
  list.innerHTML = ""; // Clear current list

  todos.forEach(e => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${e.completed ? "line" : ""}">
        ${e.title}
      </span>
      <div class="btn-container">
        <button onclick="toggleComplete('${e._id}',${e.completed})" class="done-btn">
          ${e.completed ? "Undo" : "Done"}
        </button>
        <button onclick="deleteTodo('${e._id}')" class="done-btn danger">
          Delete
        </button>
      </div>
    `;
    list.appendChild(li);
  });
}

// ==========================
// ➕ ADD TODO
// ==========================
async function addTodo() {
  const input = document.getElementById("todo-input");
  const title = input.value.trim();
  if (!title) return; // Stop if empty

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }) // Send new todo to server
  });

  input.value = "";    // Clear input
  fetchTodos();        // Refresh list
}

// ==========================
// ✅ TOGGLE COMPLETE
// ==========================
async function toggleComplete(id, completed) {
  // Update server
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTodos();
}

// ==========================
// 🗑️ DELETE TODO
// ==========================
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos(); // Refresh list
}

// ==========================
// 🚀 INITIAL LOAD
// ==========================
fetchTodos(); // Fetch and render todos when page loads
