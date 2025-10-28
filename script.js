const orderList = document.getElementsByClassName('task-list')[0]; //Get ol
const submitButton = document.getElementById('submit-button');
const taskContainer = document.getElementsByClassName('')
let deleteButton = document.querySelectorAll('.delete');
let taskIndex = 0;

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputPriority = document.getElementById('priority-form');

let taskArray = [];


//Constructive function for tasks
function task(name, date, priority, index)
{
    this.name = name;
    this.date = date;
    this.priority = priority;
    this.index = index;
}

// Add the new Task
const addTask = (name, date, priority, index) =>
{
    let p;
    let d;
    switch(priority)
    {
        case 'Alta':
            p = 'h';
            break;
        case 'Média':
            p = 'm';
            break;
        case 'Baixa':
            p = 'l';
            break;
        default:
            p = 'disable';
    }

    if(date === '')
    {
        d = 'disable';
    }

    orderList.innerHTML += 
    `
    <li class="to-do" data-index="${index}">
        <div class="info-container">
            <div class="left-side">
                <input type="checkbox" class="task-done">
                <span class="name">${name}</span>
            </div>
            <div class="right-side">
                <div class="date-div ${d}">
                    <span class="date">${date}</span>
                </div>
                <span class="priority ${p}"></span>
                <span class="delete"><img src="./img/trash.png" width="15px" height="15px"></span>
            </div>
        </div>
     </li>

    `

    //Stores task
    taskArray.push(new task(name, date, priority, index));
}


submitButton.addEventListener('click', (event) =>{
    event.preventDefault();

    const nameValue = inputName.value;
    const dateValue = inputDate.value;
    const priorityValue = inputPriority.value;
    let normalizedDate = '';

    if(nameValue === '')
    {
        alert('Por favor nomeie a tarefa');
        return;
    }

    if(dateValue !== '')
    {
        const temp = dateValue.split("-");

        normalizedDate = `${temp[2]}/${temp[1]}/${temp[0]}`;
    }
    else
    {
        normalizedDate = '';
    }



    addTask(nameValue, normalizedDate, priorityValue, taskIndex);

    taskIndex++;

    window.localStorage.setItem('numIndex', JSON.stringify(taskIndex));
    window.localStorage.setItem('userTask', JSON.stringify(taskArray));

    inputName.value = '';
    inputDate.value = '';
    inputPriority.value = '';

});

//Makes the delete button functional by bubbling
orderList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete');

    if(deleteButton)
    {
        const deletedTask = deleteButton.closest('.to-do');

        const dataIndex = parseInt(deletedTask.getAttribute('data-index'));

        const cIndex = taskArray.findIndex(task => task.index === dataIndex);

        taskArray.splice(cIndex, 1);

        taskIndex--;
        window.localStorage.setItem('numIndex', JSON.stringify(taskIndex));

        deletedTask.remove();

        window.localStorage.setItem('userTask', JSON.stringify(taskArray));
    }
})

document.addEventListener('DOMContentLoaded', () =>{
    const savedTasks = JSON.parse(localStorage.getItem('userTask')) || [];
    const numTask = JSON.parse(localStorage.getItem('numIndex') || 0);

    savedTasks.forEach(info => {
        addTask(info.name, info.date, info.priority, info.index);
    });

    taskIndex = numTask

    console.log(taskIndex);
    
})



/* 

Next features:

- Functional check task 
- functional search bar
- recognize late tasks
- functional filter

*/