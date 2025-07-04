// Application State
let currentUser = null;
let todos = [];
let currentEditId = null;
let filters = {
    category: 'all',
    priority: 'all',
    status: 'all',
    search: ''
};

// DOM Elements
const authModal = document.getElementById('authModal');
const app = document.getElementById('app');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutBtn = document.getElementById('logoutBtn');
const themeToggle = document.getElementById('themeToggle');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const closeModal = document.getElementById('closeModal');
const cancelTask = document.getElementById('cancelTask');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priorityFilter = document.getElementById('priorityFilter');
const statusFilter = document.getElementById('statusFilter');
const modalTitle = document.getElementById('modalTitle');
const saveTaskBtn = document.getElementById('saveTask');

// Statistics elements
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadTheme();
});

function initializeApp() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserTodos();
        showApp();
    } else {
        showAuthModal();
    }
}

function setupEventListeners() {
    // Authentication
    showRegisterLink.addEventListener('click', showRegisterForm);
    showLoginLink.addEventListener('click', showLoginForm);
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    logoutBtn.addEventListener('click', handleLogout);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Task management
    addTaskBtn.addEventListener('click', showAddTaskModal);
    taskForm.addEventListener('submit', handleTaskSubmit);
    closeModal.addEventListener('click', hideTaskModal);
    cancelTask.addEventListener('click', hideTaskModal);
    
    // Search and filters
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleFilterChange);
    priorityFilter.addEventListener('change', handleFilterChange);
    statusFilter.addEventListener('change', handleFilterChange);
    
    // Close modals on outside click
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            // Don't close auth modal on outside click
        }
    });
    
    taskModal.addEventListener('click', function(e) {
        if (e.target === taskModal) {
            hideTaskModal();
        }
    });
}

// Authentication Functions
function showAuthModal() {
    authModal.classList.add('active');
    app.classList.add('hidden');
}

function hideAuthModal() {
    authModal.classList.remove('active');
    app.classList.remove('hidden');
}

function showRegisterForm(e) {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    authTitle.textContent = 'Create Account';
    authSubtitle.textContent = 'Join TaskMaster today';
}

function showLoginForm(e) {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    authTitle.textContent = 'Welcome Back';
    authSubtitle.textContent = 'Please login to continue';
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        loadUserTodos();
        showApp();
        showNotification('Welcome back, ' + user.username + '!', 'success');
    } else {
        showNotification('Invalid username or password', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username)) {
        showNotification('Username already exists', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showApp();
    showNotification('Account created successfully!', 'success');
}

function handleLogout() {
    currentUser = null;
    todos = [];
    localStorage.removeItem('currentUser');
    showAuthModal();
    showNotification('Logged out successfully', 'success');
}

function showApp() {
    hideAuthModal();
    welcomeMessage.textContent = `Welcome back, ${currentUser.username}!`;
    updateStats();
    renderTodos();
}

// Theme Functions
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Task Management Functions
function showAddTaskModal() {
    currentEditId = null;
    modalTitle.textContent = 'Add New Task';
    saveTaskBtn.textContent = 'Save Task';
    taskForm.reset();
    taskModal.classList.add('active');
    
    // Set default due date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDueDate').value = today;
}

function showEditTaskModal(taskId) {
    currentEditId = taskId;
    modalTitle.textContent = 'Edit Task';
    saveTaskBtn.textContent = 'Update Task';
    
    const task = todos.find(t => t.id === taskId);
    if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskDueDate').value = task.dueDate;
    }
    
    taskModal.classList.add('active');
}

function hideTaskModal() {
    taskModal.classList.remove('active');
    currentEditId = null;
    taskForm.reset();
}

function handleTaskSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;
    
    if (currentEditId) {
        // Edit existing task
        const taskIndex = todos.findIndex(t => t.id === currentEditId);
        if (taskIndex !== -1) {
            todos[taskIndex] = {
                ...todos[taskIndex],
                title,
                description,
                category,
                priority,
                dueDate,
                updatedAt: new Date().toISOString()
            };
            showNotification('Task updated successfully!', 'success');
        }
    } else {
        // Add new task
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            category,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        todos.push(newTask);
        showNotification('Task added successfully!', 'success');
    }
    
    saveTodos();
    updateStats();
    renderTodos();
    hideTaskModal();
}

function toggleTask(taskId) {
    const task = todos.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        saveTodos();
        updateStats();
        renderTodos();
        showNotification(
            task.completed ? 'Task completed!' : 'Task marked as pending',
            task.completed ? 'success' : 'warning'
        );
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(t => t.id !== taskId);
        saveTodos();
        updateStats();
        renderTodos();
        showNotification('Task deleted successfully!', 'success');
    }
}

function duplicateTask(taskId) {
    const task = todos.find(t => t.id === taskId);
    if (task) {
        const duplicatedTask = {
            ...task,
            id: Date.now().toString(),
            title: task.title + ' (Copy)',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        todos.push(duplicatedTask);
        saveTodos();
        updateStats();
        renderTodos();
        showNotification('Task duplicated successfully!', 'success');
    }
}

// Search and Filter Functions
function handleSearch(e) {
    filters.search = e.target.value.toLowerCase();
    renderTodos();
}

function handleFilterChange(e) {
    const filterType = e.target.id.replace('Filter', '');
    filters[filterType] = e.target.value;
    renderTodos();
}

function getFilteredTodos() {
    return todos.filter(todo => {
        const matchesSearch = !filters.search || 
            todo.title.toLowerCase().includes(filters.search) ||
            todo.description.toLowerCase().includes(filters.search);
        
        const matchesCategory = filters.category === 'all' || todo.category === filters.category;
        const matchesPriority = filters.priority === 'all' || todo.priority === filters.priority;
        const matchesStatus = filters.status === 'all' || 
            (filters.status === 'completed' && todo.completed) ||
            (filters.status === 'pending' && !todo.completed);
        
        return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
}

// Render Functions
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Sort todos: incomplete first, then by priority, then by due date
    const sortedTodos = filteredTodos.sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (a.priority !== b.priority) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        
        if (a.dueDate !== b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    todoList.innerHTML = sortedTodos.map(todo => createTodoHTML(todo)).join('');
}

function createTodoHTML(todo) {
    const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed;
    const formattedDate = new Date(todo.dueDate).toLocaleDateString();
    
    return `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-header-item">
                <div class="todo-content">
                    <h3>${escapeHtml(todo.title)}</h3>
                    ${todo.description ? `<p>${escapeHtml(todo.description)}</p>` : ''}
                    <div class="todo-meta">
                        <span class="todo-tag category">${capitalizeFirst(todo.category)}</span>
                        <span class="todo-tag priority-${todo.priority}">${capitalizeFirst(todo.priority)} Priority</span>
                        <span class="todo-tag due-date ${isOverdue ? 'overdue' : ''}">
                            Due: ${formattedDate} ${isOverdue ? '(Overdue)' : ''}
                        </span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="btn btn-success" onclick="toggleTask('${todo.id}')" title="${todo.completed ? 'Mark as pending' : 'Mark as completed'}">
                        <i class="fas fa-${todo.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="showEditTaskModal('${todo.id}')" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="duplicateTask('${todo.id}')" title="Duplicate task">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="btn btn-error" onclick="deleteTask('${todo.id}')" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Storage Functions
function saveTodos() {
    const userTodos = {
        userId: currentUser.id,
        todos: todos
    };
    localStorage.setItem(`todos_${currentUser.id}`, JSON.stringify(userTodos));
}

function loadUserTodos() {
    const userTodos = localStorage.getItem(`todos_${currentUser.id}`);
    if (userTodos) {
        const data = JSON.parse(userTodos);
        todos = data.todos || [];
    } else {
        todos = [];
    }
}

// Utility Functions
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add some demo data for first-time users
function addDemoTasks() {
    if (todos.length === 0) {
        const demoTasks = [
            {
                id: '1',
                title: 'Welcome to TaskMaster!',
                description: 'This is your first task. You can edit, complete, or delete it.',
                category: 'personal',
                priority: 'medium',
                dueDate: new Date().toISOString().split('T')[0],
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'Try adding a new task',
                description: 'Click the "Add Task" button to create your own tasks.',
                category: 'other',
                priority: 'low',
                dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        
        todos = demoTasks;
        saveTodos();
        updateStats();
        renderTodos();
    }
}

// Initialize demo tasks when user first logs in
function showApp() {
    hideAuthModal();
    welcomeMessage.textContent = `Welcome back, ${currentUser.username}!`;
    
    // Add demo tasks for new users
    if (todos.length === 0) {
        addDemoTasks();
    }
    
    updateStats();
    renderTodos();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N to add new task
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (!authModal.classList.contains('active')) {
            showAddTaskModal();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        if (taskModal.classList.contains('active')) {
            hideTaskModal();
        }
    }
});

// Auto-save feature
setInterval(() => {
    if (currentUser && todos.length > 0) {
        saveTodos();
    }
}, 30000); // Auto-save every 30 seconds
