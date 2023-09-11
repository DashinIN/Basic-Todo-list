import { formatTime } from "./formatTime.js";
import { checkDeadlines } from "./notifications.js";

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDescriptionInput = document.querySelector('.todo-description');
const todoTimeInput = document.querySelector('.todo-time');


const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')
const filterDeadlineOption = document.querySelector('.filter-deadline')
const filterCreateOption = document.querySelector('.filter-create')


todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', fitlerTodo);
filterDeadlineOption.addEventListener('click', fitlerDeadlineTodo);
filterCreateOption.addEventListener('click', fitlerCreateTodo);


const globalTodos = JSON.parse(localStorage.getItem('todos')) || []
let todoIdCounter = JSON.parse(localStorage.getItem('todoIdCounter')) || 1;
if(globalTodos.length) renderTodoList(globalTodos)

Notification.requestPermission()
.then(permission => {
  if (permission === 'granted') {
    setInterval(checkDeadlines(globalTodos), 60000);
  }
} )


const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.close');
const editForm = document.querySelector(".edit__form");
const editNameInput = document.getElementById("editName");
const editDescriptionInput = document.getElementById("editDescription");
const editDeadlineInput = document.getElementById("editDeadline");



const openModal = (modal) => {
    document.body.style.overflow = "hidden";
    modal.style.display = 'flex';
}

const closeModal = (modal) => {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

closeModalButton.addEventListener('click', () => closeModal(modal))

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal(modal)
    }
}

// Обработка отправки формы редактирования
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Получаем значения из формы
    const editedName = editNameInput.value;
    const editedDescription = editDescriptionInput.value;
    const editedDeadline = new Date(editDeadlineInput.value);
    // Находим ближайший элемент с классом "todo"
    const todoId = editForm.id;
    // Находим задачу в массиве по ID
    const todoIndex = globalTodos.findIndex((todo) => todo.id === Number(todoId));
    if (todoIndex !== -1) {
        const todo = globalTodos[todoIndex];
        // Обновляем информацию о задаче
        todo.name = editedName;
        todo.description = editedDescription;
        todo.time = editedDeadline;
        // Перерисовываем список задач
        renderTodoList(globalTodos);
        // Закрываем модальное окно
        closeModal(modal);
        localStorage.setItem('todos', JSON.stringify(globalTodos));
    }
});

function renderTodoList(todos) {
    todoList.innerHTML = '';
    
    for (let todo of todos) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.id = todo.id

        const newTodoContent = document.createElement("div");
        newTodoContent.classList.add('todo__content')

        const newTodoName = document.createElement("div");
        newTodoName.classList.add('todo__name')
        newTodoName.textContent = todo.name;
        newTodoContent.appendChild(newTodoName);

        if(todo.description.length > 0) {
            const newTodoDescription = document.createElement("div");
            newTodoDescription.classList.add('todo__description')
            newTodoDescription.textContent = todo.description;
            newTodoContent.appendChild(newTodoDescription);
        }
        todoDiv.appendChild(newTodoContent);

        const newTodoDeadline = document.createElement("div");
        newTodoDeadline.classList.add('todo__deadline')
        newTodoDeadline.textContent = `deadline: ${formatTime(todo.time)}`
        todoDiv.appendChild(newTodoDeadline);

        const buttonsArea = document.createElement('div');
        buttonsArea.classList.add('buttons__area')

        const editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.classList.add("edit-btn");
        buttonsArea.appendChild(editButton);

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
    if(!todoInput.value || !todoTimeInput.value) return

    globalTodos.push({
        id: todoIdCounter,
        name: todoInput.value,
        description: todoDescriptionInput.value ?
            todoDescriptionInput.value : '',
        time: new Date(todoTimeInput.value),
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
    const todoIndex = globalTodos.findIndex(todo => todo.id == todoItem.id)
    
    if(item.classList[0]=== 'trash-btn') {
        todoItem.classList.add("fall");
        let isTransitionHandled = false;
        todoItem.addEventListener("transitionend", function() {
            if (!isTransitionHandled) {
                isTransitionHandled = true;
                todoItem.remove();
                if (todoIndex !== -1) {
                    globalTodos.splice(todoIndex, 1);
                    renderTodoList(globalTodos)
                    localStorage.setItem('todos', JSON.stringify(globalTodos));
                }
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

    if(item.classList[0]=== 'edit-btn') {
        const todoDiv = item.closest(".todo");
        const todoId = todoDiv.id;
        const todo = globalTodos.find((todo) => todo.id === Number(todoId));
        editForm.id = todo.id;
        editNameInput.value = todo.name;
        editDescriptionInput.value = todo.description;
        editDeadlineInput.value = new Date(todo.time).toISOString().slice(0, 16);
        openModal(modal)
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

function fitlerCreateTodo(e) {
    const filteredTodos = [...globalTodos];
    switch(e.target.value) {
        case "asc":
            renderTodoList(filteredTodos.sort((a, b) => new Date(a.created) - new Date(b.created)));
            break;
        case "desc":
            renderTodoList(filteredTodos.sort((a, b) => new Date(b.created) - new Date(a.created)));
            break;
    }
}

function fitlerDeadlineTodo(e) {
    const filteredTodos = [...globalTodos];
    switch(e.target.value) {
        case "asc":
            renderTodoList(filteredTodos.sort((a, b) => new Date(a.time) - new Date(b.time)));
            break;
        case "desc":
            renderTodoList(filteredTodos.sort((a, b) => new Date(b.time) - new Date(a.time)));
            break;
    }
}

 




