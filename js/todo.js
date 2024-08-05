document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // tasks are stored as a string in local storage. JSON.parse converts them back to an array.

    // Load tasks from localStorage
    tasks.forEach(task => addTaskToDOM(task)); // Use array forEach method to loop over array of tasks and add each one to the DOM.

    // Event listener for adding a new task
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault(); // stops default behaviour for form submission. The page was reloading without it.
        const taskText = taskInput.value; // get the value from the input element.
        const newTask = { text: taskText, completed: false }; // create a js object with text and task complete status
        tasks.push(newTask); // add the new task to the tasks list
        updateLocalStorage(); // call updateLocalStorage to store the new task
        addTaskToDOM(newTask); // call addTaskToDOM with the new task as an argument
        taskInput.value = ''; // Clear the input field
    });

    // Function to add a task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li'); // create new list element
        li.classList.add('task-item'); // add class to list element
        if (task.completed) {  // check the complete status of the task
            li.classList.add('completed'); // if task completed is true add completed class to l;ist element
        }
        // Set the inner html of the list element. The elements created here are the to-do tasks.
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <input type="text" class="edit-input" value="${task.text}" style="display:none;">
            <div>
                <button class="complete-btn">Complete</button>
                <button class="edit-btn">Edit</button>
                <button class="save-btn" style="display:none;">Save</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(li); // add the list item to the task list, appendChild will add it to the end of the list

        // create variables for the interactive elements of the list item for adding listeners to each of them.
        const completeBtn = li.querySelector('.complete-btn');
        const editBtn = li.querySelector('.edit-btn');
        const saveBtn = li.querySelector('.save-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        const taskTextElement = li.querySelector('.task-text');
        const editInputElement = li.querySelector('.edit-input');

        // Toggle task completion
        completeBtn.addEventListener('click', function () {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            updateLocalStorage();
        });

        // Edit task
        editBtn.addEventListener('click', function () {
            taskTextElement.style.display = 'none';
            editInputElement.style.display = 'inline';
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline';
        });

        // Save edited task
        saveBtn.addEventListener('click', function () {
            const updatedText = editInputElement.value.trim();
            if (updatedText !== '') {
                task.text = updatedText;
                taskTextElement.innerText = updatedText;
                updateLocalStorage();
            }
            taskTextElement.style.display = 'inline';
            editInputElement.style.display = 'none';
            editBtn.style.display = 'inline';
            saveBtn.style.display = 'none';
        });

        // Delete task
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            tasks.splice(tasks.indexOf(task), 1); // Delete 1 item at index of the task to be removed.
            updateLocalStorage();
        });
    }

    // Function to update localStorage with the current tasks
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
