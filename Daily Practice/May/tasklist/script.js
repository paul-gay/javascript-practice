/* Define UI variables */
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

/* Load all event listeners in function instead of global scope */
loadEventListeners();

/* load all event listeners function */
function loadEventListeners() {
    /* DOM load event -- items from localStorage  */
    document.addEventListener('DOMContentLoaded', getTasks);


    /* add task event */
    form.addEventListener('submit', addTask);

    /* remove task event */
    taskList.addEventListener('click', removeTask);

    /* clear all tasks event */
    clearBtn.addEventListener('click', clearTasks);

    /* filter tasks event */
    filter.addEventListener('keyup', filterTasks);

};


/* get tasks from localStorage */
function getTasks() {
    let tasks;
    // check if there are any tasks already in localStorage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // loop through tasks in the array
    tasks.forEach(function(task) {
        /* create DOM element to display them */

        /* create li element */
        const li = document.createElement('li');
        /* add class to li element */
        li.className = 'collection-item';
        /* crate text node (element) and append to li element */
        li.appendChild(document.createTextNode(task));
        /* create new link element (delete icon link) */
        const link = document.createElement('a');
        /* add class to link  using materialize class names*/
        link.className = 'delete-item secondary-content';
        /* add icon HTML */
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        /* append link to li element */
        li.appendChild(link);


        /* append li to ul */
        taskList.appendChild(li);
    });
};


/* add task function */
function addTask(e) {
    /* ensure there is something in task input */
    if (taskInput.value === '') {
        alert('Add a task');
    }

    /* create li element */
    const li = document.createElement('li');
    /* add class to li element */
    li.className = 'collection-item';
    /* crate text node (element) and append to li element */
    li.appendChild(document.createTextNode(taskInput.value));
    /* create new link element (delete icon link) */
    const link = document.createElement('a');
    /* add class to link  using materialize class names*/
    link.className = 'delete-item secondary-content';
    /* add icon HTML */
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    /* append link to li element */
    li.appendChild(link);


    /* append li to ul */
    taskList.appendChild(li);

    /* store in localStorage */
    storeTaskInLocalStorage(taskInput.value);

    
    /* clear the input */
    taskInput.value = '';

    e.preventDefault();
}

/* store task in localStorage function */
function storeTaskInLocalStorage(task) {
    let tasks;
    // check if there are any tasks already in localStorage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // add task to the tasks array 
    tasks.push(task);

    // set to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


/* remove task function */
function removeTask(e) {
    // need to target parent element since the child el will be an icon tag but we want the 'a' tag
    if (e.target.parentElement.classList.contains('delete-item')) {
        // parent of i tag is 'a' tag -- but we want the 'li' element which is the parent of the parent
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
};

/* remove task from localStorage */
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    // check if there are any tasks already in localStorage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // loop through
    tasks.forEach(function(task, index) {
        // check if taskItem text content matches the current task in iteration
        // if yes -- then delete it
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    // set localStorage again
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


/* clear all tasks */
function clearTasks() {
    /* remove task list innerHTML */
    // option 1:
    // tasklist.innerHTML = '';

    // option 2:
    // loop through and remove each one -- faster operation
    // https://jsperf.com/innerhtml-vs-removechild/47
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    };

    /* clear from localStorage */
    clearTasksFromLocalStorage();
};

/* clear tasks from localStorage function */
function clearTasksFromLocalStorage() {
    localStorage.clear();
};


/* filter tasks function */
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
};