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

    let plus = 3; // Сколько времени прибавляем (+3 это время по Москве)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Europe/London', false); // Делаем запрос по Лондону
    xhr.send(); // отправляем
    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // Если статус не равен 200, то выводим ошибку.
    } else {
        let time = xhr.responseText; // получаем текст ответа
        let z = JSON.parse(time).utc_datetime; // Получаем время utc
        let time1 = new Date(z).getTime(); // Переводим в timestamp
        let timestampPlus = time1 + (plus * 60 * 60 * 1000); // Воемя +3 часа. Если надо получить время UTC, то убираем просто параметр plus
        let timePlus = new Date(timestampPlus); // Переводим во время (Тут надо понимать, что система сама переведёт его в текущую временную зону
        let result = timePlus.toUTCString();  // Переводим в строку UTC;
        console.log(result); // Выводим дату. 
    }


 
  const buttons =  document.querySelectorAll('.header__menu-item');
  const buttonsArea = document.querySelector('.header__menu');
  const bodyBlock = document.querySelector('body');
  console.log(bodyBlock.style.backgroundImage);

  buttonsArea.addEventListener('click', itemToggle);
   

    function itemToggle(e) {
        const item = e.target;
        for (let button of buttons) {
            if (button != item) button.classList.remove("active");
        }
        item.classList.toggle("active");
        
        switch (item.classList[1]) {
            case 'item-winter':
                bodyBlock.className = 'winter';
                break;
            case 'item-spring':
                bodyBlock.className = 'spring';
                break;
            case 'item-summer':
                bodyBlock.className = 'summer';
                break;

            case 'item-autumn':
                bodyBlock.className = 'autumn';
                break;
            default:
               
          }
          
          if(!item.classList.contains('active')) {
            bodyBlock.className = 'classic';
          }
        
        
       
        console.log(item.classList[2]);
    }