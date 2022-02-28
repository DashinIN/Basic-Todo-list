const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', fitlerTodo);

let todosLocal;
function toLocal() {
todosLocal = todoList.innerHTML; // получаем html блока с пунктами
localStorage.setItem('todosLocal', todosLocal); // элементу 'todosLocal' хранилища присваивают html код.
}



function addTodo(event) {
    console.log("hello");
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    toLocal();

    const newTodo = document.createElement("li");
    
    if(todoInput.value.trim() !== "") {
    newTodo.innerText = todoInput.value;
    toLocal();
    } else {
        return
    }
    
    newTodo.classList.add('todo-item');
    toLocal();
    todoDiv.appendChild(newTodo);
    toLocal();

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    toLocal();
    completedButton.classList.add("complete-btn");
    toLocal();
    todoDiv.appendChild(completedButton);
    toLocal();

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    toLocal();
    trashButton.classList.add("trash-btn");
    toLocal();
    todoDiv.appendChild(trashButton);
    toLocal();

    todoList.appendChild(todoDiv);
    toLocal();

    todoInput.value = "";
    toLocal();
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0]=== 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function() {
            todo.remove();
            toLocal();
        });
        
    }
    
    if(item.classList[0]=== 'complete-btn') {
        const todo = item.parentElement.classList.toggle('completed');
        toLocal();
    }

}


function fitlerTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                toLocal();
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    toLocal();
                } else {
                    todo.style.display = "none";
                    toLocal();
                   
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    toLocal();
                } else {
                    todo.style.display = "none";
                    toLocal();
                   
                }
                break;
        }
    });
} 

if(localStorage.getItem('todosLocal')) {
    todoList.innerHTML = localStorage.getItem('todosLocal');
    }
    