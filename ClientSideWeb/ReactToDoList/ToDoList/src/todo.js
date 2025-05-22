const API_URL = "http://localhost:3000";

// Cookie helpers
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}



let editingTodoId = null;
let currentUser = null;

// Show/hide sections
function showUserSection(username) {
    authSection.style.display = 'none';
    userSection.style.display = '';
    welcomeUser.textContent = `Welcome ${username}`;
}
function showAuthSection() {
    authSection.style.display = '';
    userSection.style.display = 'none';
    welcomeUser.textContent = '';
}

// Fetch todos
async function fetchTodos() {
    const token = getCookie('authToken');
    try {
        const res = await fetch(`${API_URL}/todos`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Failed to fetch todos');
        const todos = await res.json();
        renderTodos(todos);
    } catch (err) {
        alert('Fetch todos error: ' + err.message);
    }
}

// Render todos
function renderTodos(todos) {
    todoList.innerHTML = '';
    if (!todos.length) {
        todoList.innerHTML = '<li>No todos yet.</li>';
        return;
    }
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="todo-title${todo.completed ? ' completed' : ''}">${todo.title}</span>
            <span class="todo-desc">${todo.description}</span>
            <input type="checkbox" class="todo-complete" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
            <button class="edit-btn" data-id="${todo.id}">Edit</button>
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Delete todo
async function deleteTodo(id) {
    const token = getCookie('authToken');
    try {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok && res.status !== 204) throw new Error('Delete failed');
        fetchTodos();
    } catch (err) {
        alert('Delete error: ' + err.message);
    }
}

// Update completion
async function updateTodoCompletion(id, completed) {
    const token = getCookie('authToken');
    try {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ completed })
        });
        if (!res.ok) throw new Error('Update failed');
        fetchTodos();
    } catch (err) {
        alert('Update error: ' + err.message);
    }
}

// Edit modal logic
async function openEditModal(id) {
    const token = getCookie('authToken');
    try {
        const res = await fetch(`${API_URL}/todos`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const todos = await res.json();
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        editingTodoId = id;
        editTitle.value = todo.title;
        editDesc.value = todo.description;
        editCompleted.checked = !!todo.completed;
        editModal.style.display = '';
    } catch (err) {
        alert('Edit modal error: ' + err.message);
    }
}

function setupDomEventHandlers() {
    // DOM elements
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const authSection = document.getElementById('auth-section');
    const userSection = document.getElementById('user-section');
    const welcomeUser = document.getElementById('welcome-user');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDesc = document.getElementById('todo-desc');
    const todoList = document.getElementById('todo-list');
    const editModal = document.getElementById('edit-modal');
    const editTodoForm = document.getElementById('edit-todo-form');
    const editTitle = document.getElementById('edit-title');
    const editDesc = document.getElementById('edit-desc');
    const editCompleted = document.getElementById('edit-completed');
    const editCancel = document.getElementById('edit-cancel');

    // Handle edit/delete/complete

    todoList.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;
        if (target.classList.contains('delete-btn')) {
            if (!confirm('Delete this todo?')) return;
            await deleteTodo(id);
        } else if (target.classList.contains('edit-btn')) {
            openEditModal(id);
        } else if (target.classList.contains('todo-complete')) {
            await updateTodoCompletion(id, target.checked);
        }
    });

    editTodoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = getCookie('authToken');
        try {
            const res = await fetch(`${API_URL}/todos/${editingTodoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    title: editTitle.value.trim(),
                    description: editDesc.value.trim(),
                    completed: editCompleted.checked
                })
            });
            if (!res.ok) throw new Error('Edit failed');
            editModal.style.display = 'none';
            fetchTodos();
        } catch (err) {
            alert('Edit error: ' + err.message);
        }
    });

    editCancel.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Registration failed');
            const data = await res.json();
            setCookie('authToken', data.token, 7);
            currentUser = data.username;
            showUserSection(currentUser);
            fetchTodos();
        } catch (err) {
            alert('Registration error: ' + err.message);
        }
    });

    // Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Login failed');
            const data = await res.json();
            setCookie('authToken', data.token, 7);
            currentUser = data.username;
            showUserSection(currentUser);
            fetchTodos();
        } catch (err) {
            alert('Login error: ' + err.message);
        }
    });

    // Logout
    logoutBtn.addEventListener('click', async () => {
        const token = getCookie('authToken');
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token }
            });
        } catch { }
        eraseCookie('authToken');
        currentUser = null;
        showAuthSection();
        todoList.innerHTML = '';
    });

    // Add todo
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = todoInput.value.trim();
        const description = todoDesc.value.trim();
        if (!title) return;
        const token = getCookie('authToken');
        try {
            const res = await fetch(`${API_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ title, description })
            });
            if (!res.ok) throw new Error('Failed to add todo');
            todoInput.value = '';
            todoDesc.value = '';
            fetchTodos();
        } catch (err) {
            alert('Add todo error: ' + err.message);
        }
    });

    // On load: check auth
    const token = getCookie('authToken');
    if (token) {
        // Try to fetch todos to check if token is valid
        fetch(`${API_URL}/todos`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(todos => {
                // Try to get username from /todos (not available, so just show user section)
                currentUser = 'User';
                showUserSection(currentUser);
                renderTodos(todos);
            })
            .catch(() => {
                eraseCookie('authToken');
                showAuthSection();
            });
    } else {
        showAuthSection();
    }
}

// Call this after React page renders
window.setupDomEventHandlers = setupDomEventHandlers;





export default {
}
