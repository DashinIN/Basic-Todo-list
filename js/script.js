
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDateInput = document.querySelector('.todo-time');
const todoTimeInput = document.querySelector('.todo-time');
const todoDescriptionInput = document.querySelector('.todo-description');

const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


todoForm.addEventListener('submit', e => addTodo(e));
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', fitlerTodo);


function addTodo(e) {
    e.preventDefault();
    if(!todoInput.value || !todoDateInput.value) return
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodoName = document.createElement("div");
    newTodoName.classList.add('todo__name')
    newTodoName.textContent = todoInput.value;
    todoDiv.appendChild(newTodoName);
    
    if(todoDescriptionInput.value) {
        const newTodoDescription = document.createElement("div");
        newTodoDescription.classList.add('todo__description')
        newTodoDescription.textContent = todoDescriptionInput.value;
        todoDiv.appendChild(newTodoDescription);
    }

    const completedButton = document.createElement('button');
    completedButton.textContent = 'done';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = 'delete';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    e.target.reset(); 
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0]=== 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    if(item.classList[0]=== 'complete-btn') {
        item.parentElement.classList.toggle('completed');
    }

}


function fitlerTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
            
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
} 

 




