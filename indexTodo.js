let tasks = [];

var taskList = document.getElementById('list');
var addtaskInput = document.getElementById('add');
var tasksCounter = document.getElementById('tasks-counter');
console.log("working");

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.Done ? 'checked': ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
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
      return task.id !== taskId;
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
        return task.id === taskId;
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
            text,
            id : Date.now().toString(),
            Done: false
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

addtaskInput.addEventListener('keyup', handleInputKey);
document.addEventListener('click', handleClickevents);



