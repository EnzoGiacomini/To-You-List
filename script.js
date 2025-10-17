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
    <li class="to-do">
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

- Functional check task
- new font 
- functional search bar
- Delete Button
- recognize late tasks
- functional filter


*/