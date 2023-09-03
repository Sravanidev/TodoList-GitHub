let tasks = [];

var taskList = document.getElementById('list');
var addtaskInput = document.getElementById('add');
var tasksCounter = document.getElementById('tasks-counter');
console.log("working");

function fetchTodos(){
    //Get request
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data){
        tasks = data.slice(0, 10);
        renderList();
    })
}

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked': ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <div class="delete" data-id="${task.id}">
    <i class="fa-solid fa-trash"></i>
        </div>
         `;

    taskList.append(li);
}

function renderList(){
    taskList.innerHTML = '';

    for(let i =0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    
    tasksCounter.innerHTML = tasks.length;
}

function addTasks(task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotifications('Task added succesfully');
        return;
    }
    showNotifications('Task cannot be added');
}

function deleteTasks(taskId) {
    const newtasks = tasks.filter(function(task){
      return task.id !== Number(taskId);
    })

    tasks = newtasks;
    renderList();
    showNotifications('task deleted succesfully');

}

function showNotifications(text) {
    alert(text);
}

function toggletasks(taskId) {
    const task = tasks.filter(function(task){
        return task.id === Number(taskId);
    })

    if(task.length > 0){
        const currenttask = task[0];

        currenttask.Done = !currenttask.Done;
        renderList();
        showNotifications('Task toggled succesfully');
        return;
    }
    showNotifications('Task couldnt be toggles');   
}


function handleInputKey(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotifications('Please add task. Task cannot be Empty');
            return;
        }

        const task = {
            title: text,
            id : Date.now(),
            completed: false
        }
        e.target.value = '';
        addTasks(task);
    }
}

function handleClickevents(e){
    const target = e.target;

    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTasks(taskId);
        return;

    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggletasks(taskId);
        return;
    }
}

function initializeApp(){

fetchTodos();
addtaskInput.addEventListener('keyup', handleInputKey);
document.addEventListener('click', handleClickevents);

}

initializeApp();


