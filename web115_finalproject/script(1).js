document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];
    let nextId = 1;

    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskPrioritySelect = document.getElementById('task-priority');
    const taskImportantCheckbox = document.getElementById('task-important');
    const taskManager = document.getElementById('taskmanager');

    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameValue = taskNameInput.value.trim();

            if (nameValue === "") {
                alert("Please enter a task name.");
                return;
            }

            const today = new Date().toLocaleDateString();

            const newTask = {
                id: nextId++,
                name: nameValue,
                priority: taskPrioritySelect.value,
                isImportant: taskImportantCheckbox.checked,
                isCompleted: false, // Starts as false by default
                date: today
            };

            tasks.push(newTask);
            logAndRender();
            taskForm.reset();
        });
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        logAndRender();
    }

    function toggleComplete(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
        logAndRender();
    }

    function logAndRender() {
        console.log(JSON.stringify(tasks));
        render();
    }

    function render() {
        if (!taskManager) return;
        taskManager.innerHTML = "";

        tasks.forEach(task => {
            const item = document.createElement('div');
            item.className = 'task-item';

            item.innerHTML = `
                <div>
                    <strong id="text-${task.id}">${task.name}</strong>
                </div>
                <div>
                    Priority: <span id="priority-${task.id}">${task.priority}</span> | Date: ${task.date}
                </div>
                <div class="task-buttons">
                    <button class="toggle-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            const toggleBtn = item.querySelector('.toggle-btn');
            const deleteBtn = item.querySelector('.delete-btn');

            toggleBtn.addEventListener('click', () => toggleComplete(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskManager.appendChild(item);

            const textSpan = item.querySelector(`#text-${task.id}`);
            const prioritySpan = item.querySelector(`#priority-${task.id}`);

            
            if (task.priority === "High") {
                prioritySpan.style.color = "red";
                prioritySpan.style.fontWeight = "bold";
            } else if (task.priority === "Medium") {
                prioritySpan.style.color = "orange";
                prioritySpan.style.fontWeight = "bold";
            } else if (task.priority === "Low") {
                prioritySpan.style.color = "green";
                prioritySpan.style.fontWeight = "bold";
            }

                        if (task.isImportant) {
                item.style.backgroundColor = "#ffcccc";
                item.style.borderColor = "red";
                textSpan.style.color = "darkred";
            }

            
            if (task.isCompleted) {
                textSpan.style.textDecoration = "line-through";
                textSpan.style.color = "gray";
            }
        });
    }

    render();
});
