/* SELECTORS */
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');


/* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);



/* FUNCTIONS */
function addTodo(e) {
    // prevent form from submitting by default
    e.preventDefault();

    // console.log('it works');

    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    // add newTodo to todoDiv
    todoDiv.appendChild(newTodo);
    // add to local storage
    saveLocalTodos(todoInput.value);


    // create completed button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completedBtn.classList.add('completed-btn');
    todoDiv.appendChild(completedBtn);

    // create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // finally, append todoDiv containing all the elements to the todo list
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = '';
}


function deleteCheck(e) {
    // console.log(e.target);

    const item = e.target;
    // console.log(item.classList);

    // delete todo
    if(item.classList[0] === 'delete-btn') {
        // item.remove();
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // remove element after 'fall' animation has completed
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // check off item
    if(item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}


function filterTodos(e) {
    const todos = todoList.childNodes;
    // console.log(todos);

    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                    break;
                } else {
                    todo.style.display = 'none';
                    break;
                }
            case "incomplete":
            if(!todo.classList.contains('completed')) {
                todo.style.display = 'flex';
                break;
            } else {
                todo.style.display = 'none';
                break;
            }
        }

    });
}



function saveLocalTodos(todo) {
    // check if already have todo items stored locally
    let todos;
    // if don't have items in local storage -- create an empty array
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // gets back from local storage in form of an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // push a new todo item to the array
    todos.push(todo);
    // set it back into local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
    let todos;

    // if don't have items in local storage -- create an empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // gets back from local storage in form of an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // loop over the todos
    todos.forEach(function(todo) {
        
        // create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        // add newTodo to todoDiv
        todoDiv.appendChild(newTodo);


        // create completed button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
        completedBtn.classList.add('completed-btn');
        todoDiv.appendChild(completedBtn);

        // create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn);

        // finally, append todoDiv containing all the elements to the todo list
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo) {
    let todos;

    // if don't have items in local storage -- create an empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // gets back from local storage in form of an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children[0].innerText);

    // todo is the div -- need to navigat down the div's elements to the text
    // its first child is the li element or todo-item which has the text inside it
    const todoIndex = todo.children[0].innerText;
    // indexOf method returns the position of the first occurrence of a specified value in a string
    // looking for index of text string inside the todos array
    // then remove 1 item from array
    todos.splice(todos.indexOf(todoIndex), 1);
    // push array back to localstorage without the deleted item
    localStorage.setItem('todos', JSON.stringify(todos));
}