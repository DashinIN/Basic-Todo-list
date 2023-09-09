
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDateInput = document.querySelector('.todo-date');
const todoTimeInput = document.querySelector('.todo-time');
const todoDescriptionInput = document.querySelector('.todo-description');

const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', fitlerTodo);

const globalTodos = JSON.parse(localStorage.getItem('todos')) || []
let todoIdCounter = JSON.parse(localStorage.getItem('todoIdCounter')) || 1;
if(globalTodos.length) renderTodoList(globalTodos)


function renderTodoList(todos) {
    todoList.innerHTML = '';
    
    for (let todo of todos) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.id = todo.id

        const newTodoName = document.createElement("div");
        newTodoName.classList.add('todo__name')
        newTodoName.textContent = todo.name;
        todoDiv.appendChild(newTodoName);

        if(todo.description.length > 0) {
            const newTodoDescription = document.createElement("div");
            newTodoDescription.classList.add('todo__description')
            newTodoDescription.textContent = todo.description;
            todoDiv.appendChild(newTodoDescription);
        }

        const newTodoDeadline = document.createElement("div");
        newTodoDeadline.classList.add('todo__deadline')
        newTodoDeadline.textContent = todo.time
        todoDiv.appendChild(newTodoDeadline);

        const buttonsArea = document.createElement('div');

        const completedButton = document.createElement('button');
        completedButton.textContent = 'done';
        completedButton.classList.add("complete-btn");
        buttonsArea.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = 'delete';
        trashButton.classList.add("trash-btn");
        buttonsArea.appendChild(trashButton);

        if(todo.complete) {
            todoDiv.classList.add('completed');
        }
        todoDiv.appendChild(buttonsArea);
        todoList.appendChild(todoDiv);
    }
}

function addTodo(e) {
    e.preventDefault();
    if(!todoInput.value || !todoDateInput.value) return

    globalTodos.push({
        id: todoIdCounter,
        name: todoInput.value,
        description: todoDescriptionInput.value ?
            todoDescriptionInput.value : '',
        time: todoTimeInput.value ? 
            new Date(`${todoDateInput.value}T${todoTimeInput.value}`) :
            new Date(todoDateInput.value),
        created: new Date(),
        complete: false
    })

    todoIdCounter++
    renderTodoList(globalTodos)
    localStorage.setItem('todos', JSON.stringify(globalTodos));
    localStorage.setItem('todoIdCounter', JSON.stringify(todoIdCounter));

    e.target.reset(); 
}

function deleteCheck(e) {
    const item = e.target;
    const todoItem = item.parentElement.parentElement;
    const todoIndex = globalTodos.findIndex(todo => todo.id = todoItem.id)

    if(item.classList[0]=== 'trash-btn') {
        todoItem.classList.add("fall");
        todoItem.addEventListener("transitionend", function() {
            todoItem.remove();
            if (todoIndex !== -1) {
                globalTodos.splice(todoIndex, 1);
                todoIdCounter--;
                renderTodoList(globalTodos)
                localStorage.setItem('todos', JSON.stringify(globalTodos));
                localStorage.setItem('todoIdCounter', JSON.stringify(todoIdCounter));
            }
        });
    }

    if(item.classList[0]=== 'complete-btn') {
        todoItem.classList.toggle('completed');
        if (todoIndex !== -1) {
            globalTodos[todoIndex].complete = 
            globalTodos[todoIndex].complete ? false : true;
            localStorage.setItem('todos', JSON.stringify(globalTodos));
        }
    }
}


function fitlerTodo(e) {
    switch(e.target.value) {
        case "all":
            renderTodoList(globalTodos);
            break;
        case "completed":
            renderTodoList(globalTodos.filter(todo => Boolean(todo.complete)))
            break;
        case "uncompleted":
            renderTodoList(globalTodos.filter(todo => Boolean(!todo.complete)))
            break;
    }
}

 




