// Set current year in footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Navbar hamburger toggle
const navBar = document.getElementById("navigation_bar");
const hamburgerButton = document.getElementById("hamburger_button");
hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("show");
    navBar.classList.toggle("show");
});

// Dark mode toggle
const darkModeButton = document.getElementById("header_icon_button");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
}
darkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark");
    const currentTheme = body.classList.contains("dark") ? "dark" : "";
    localStorage.setItem("theme", currentTheme);
});

// Planner functionality
import { getJournalEntries } from "./reflection";
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskForm = document.getElementById('goal-form');
    const taskInput = document.getElementById('goal-title');
    const descInput = document.getElementById('goal-description');
    const deadlineInput = document.getElementById('goal-deadline');
    const categorySelect = document.getElementById('goal-category');
    const taskList = document.getElementById('active-goals-list');
    const addButton = document.getElementById('add-goal-button');
    const clearButton = document.getElementById('clear-all-button');
    const filterDaily = document.getElementById('filter-daily');
    const filterWeekly = document.getElementById('filter-weekly');
    const filterMonthly = document.getElementById('filter-monthly');
    const showAll = document.getElementById('show-all');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // Initialize tasks array
    let tasks = JSON.parse(localStorage.getItem('soulSyncTasks')) || [];
    let currentFilter = null; // Track current filter

    // Load tasks on startup
    renderTasks();

    

    // Event Listeners
    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearAllTasks);
    filterDaily.addEventListener('click', () => filterTasks('daily'));
    filterWeekly.addEventListener('click', () => filterTasks('weekly'));
    filterMonthly.addEventListener('click', () => filterTasks('monthly'));
    showAll.addEventListener('click', () => renderTasks());

    // Add new task
    function addTask(e) {
        e.preventDefault();
        
        
        const newTask = {
            id: Date.now(),
            title: taskInput.value.trim(),
            description: descInput.value.trim(),
            deadline: deadlineInput.value,
            category: categorySelect.value,
            completed: false
        };

        if (!newTask.title) {
            alert('Please enter a task title!');
            return;
        }

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        // Clear form
        taskInput.value = '';
        descInput.value = '';
        deadlineInput.value = '';
    }

    // Render tasks (with optional filtering)
    // function renderTasks(taskArray = tasks) {
    //     taskList.innerHTML = '';
        
    //     taskArray.forEach(task => {
    //         const taskItem = document.createElement('li');
    //         taskItem.className = `task ${task.completed ? 'completed' : ''}`;
    //         taskItem.dataset.id = task.id;
            
    //         taskItem.innerHTML = `
    //             <div class="task-content">
    //                 <h3>${task.title}</h3>
    //                 <p>${task.description}</p>
    //                 <small>${task.category} • Due: ${formatDate(task.deadline)}</small>
    //             </div>
    //             <div class="task-actions">
    //                 <button class="complete-btn">${task.completed ? '✓ Done' : 'Mark Done'}</button>
    //                 <button class="delete-btn">Delete</button>
    //             </div>
    //         `;
    // Modified renderTasks function
    function renderTasks() {
        taskList.innerHTML = '';
        
        // Filter tasks if needed
        const tasksToShow = currentFilter 
            ? tasks.filter(task => task.category === currentFilter)
            : tasks;
        
        tasksToShow.forEach(task => {
            const taskItem = document.createElement('li');
            
            taskItem.className = `task ${task.completed ? 'completed' : ''}`;
            
            taskItem.dataset.id = task.id;

            
            taskItem.innerHTML = `
                <div class="task-content">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <small>${task.category} • Due: ${formatDate(task.deadline)}</small>
                </div>
                <div class="task-actions">
                    <button class="complete-btn">${task.completed ? '✓ Done' : 'Mark Done'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `
            ;
            
            // Add event listeners
            taskItem.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
            taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
            
            taskList.appendChild(taskItem);
        });
        
        updateProgress();
        updateActiveFilterButton();
    }

    // // Filter tasks by category
    // function filterTasks(category) {
    //     const filtered = tasks.filter(task => task.category === category);
    //     renderTasks(filtered);
        
    //     // Highlight active filter button
    //     [filterDaily, filterWeekly, filterMonthly, showAll].forEach(btn => {
    //         btn.classList.remove('active');
    //     });
    //     document.getElementById(`filter-${category}`).classList.add('active');
    // }
 // New function to update active filter button style
    function updateActiveFilterButton() {
        const buttons = [filterDaily, filterWeekly, filterMonthly, showAll];
        buttons.forEach(button => button.classList.remove('active'));
        
        if (currentFilter === 'daily') filterDaily.classList.add('active');
        else if (currentFilter === 'weekly') filterWeekly.classList.add('active');
        else if (currentFilter === 'monthly') filterMonthly.classList.add('active');
        else showAll.classList.add('active');
    }

    // Filter functions
    function filterTasks(category) {
        currentFilter = category;
        renderTasks();
    }

    function showAllTasks() {
        currentFilter = null;
        renderTasks();
    }

     // Event listeners for filter buttons
    filterDaily.addEventListener('click', () => filterTasks('daily'));
    filterWeekly.addEventListener('click', () => filterTasks('weekly'));
    filterMonthly.addEventListener('click', () => filterTasks('monthly'));
    showAll.addEventListener('click', showAllTasks);
    // Toggle task completion
    function toggleComplete(taskId) {
        tasks = tasks.map(task => 
            task.id === taskId ? {...task, completed: !task.completed} : task
        );
        saveTasks();
        renderTasks();
    }

    // Delete task
    function deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderTasks();
        }
    }

    // Clear all tasks
    function clearAllTasks() {
        if (tasks.length > 0 && confirm('Delete ALL tasks permanently?')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }

    // Update progress tracker
    function updateProgress() {
        const completed = tasks.filter(task => task.completed).length;
        const total = tasks.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        progressFill.style.width = `${percentage}%`;
        progressFill.textContent = `${percentage}%`;
        progressText.textContent = `${completed} of ${total} completed`;
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('soulSyncTasks', JSON.stringify(tasks));
    }

    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return 'No deadline';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});