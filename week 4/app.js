// Task class to represent individual tasks
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    // Method to toggle the task's completion status
    toggleComplete() {
        this.completed = !this.completed;
    }

    // Method to delete the task (return null in this example, actual removal is done outside)
    deleteTask() {
        return null;
    }
}

// Variables
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
let tasks = []; // Array to store all tasks

// Function to display tasks in the list
function displayTasks() {
    taskList.innerHTML = ""; // Clear the list before re-rendering
    tasks.forEach((task, index) => {
        // Create a list item for each task
        const listItem = document.createElement('li');
        listItem.classList.add('task');
        
        // Add a class for completed tasks
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Add task description
        listItem.textContent = task.description;

        // Event listener to toggle task completion
        listItem.addEventListener('click', () => {
            task.toggleComplete(); // Toggle the completed status of the task
            displayTasks(); // Re-render the tasks
        });

        // Event listener to delete task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the task from being marked as complete
            tasks.splice(index, 1); // Remove the task from the array
            displayTasks(); // Re-render the tasks
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask() {
    const taskDescription = taskInput.value.trim();

    // Check if the input is not empty
    if (taskDescription) {
        const newTask = new Task(taskDescription); // Create a new Task object
        tasks.push(newTask); // Add the task to the array
        taskInput.value = ''; // Clear the input field
        displayTasks(); // Re-render the tasks
    } else {
        alert('Please enter a valid task.');
    }
}

// Event listener to add a task when the "Add Task" button is clicked
addTaskBtn.addEventListener('click', addTask);

// Event listener to add a task when the "Enter" key is pressed
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask(); // Add the task when the Enter key is pressed
    }
});

// Display initial tasks (if any)
displayTasks();
