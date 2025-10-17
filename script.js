const orderList = document.getElementsByClassName('task-list')[0]; //Get ol
const submitButton = document.getElementById('submit-button');

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputPriority = document.getElementById('priority-form');

let taskArray = [];

//Constructive function for tasks
function task(name, date, priority)
{
    this.name = name;
    this.date = date;
    this.priority = priority;
}

// Add the new Task
const addTask = (name, date, priority) =>
{
    let p;
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
            alert('Bug at priority status');
    }

    orderList.innerHTML += 
    `
    <li class="to-do">
        <div class="info-container">
            <div class="left-side">
                <input type="checkbox" class="task-done">
                <span class="name">${name}</span>
            </div>
            <div class="right-side">
                <div class="date-div">
                    📅
                    <span class="date">${date}</span>
                </div>
                <span class="priority ${p}"></span>
            </div>
        </div>
     </li>

    `

    //Stores task
    taskArray.push(new task(name, date, priority));
    window.localStorage.setItem('userTask', JSON.stringify(taskArray));
}


submitButton.addEventListener('click', (event) =>{
    event.preventDefault();

    const nameValue = inputName.value;
    const dateValue = inputDate.value;
    const priorityValue = inputPriority.value;

    const temp = dateValue.split("-");

    const normalizedDate = `${temp[2]}/${temp[1]}/${temp[0]}`;

    addTask(nameValue, normalizedDate, priorityValue);

    inputName.value = '';
    inputDate.value = '';
    inputPriority.value = '';
    
});

document.addEventListener('DOMContentLoaded', () =>{
    const savedTasks = JSON.parse(localStorage.getItem('userTask')) || [];

    savedTasks.forEach(info => {
        addTask(info.name, info.date, info.priority);
    });
})

/* 

Next features:

In order:

- functional search bar
- completed button
- Delete Button
- recognize late tasks
- functional filter
- new task design


*/