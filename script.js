const orderList = document.getElementsByClassName('task-list')[0]; //Get ol
const submitButton = document.getElementById('submit-button');

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputPriority = document.getElementById('priority-form');
const inputText = document.getElementById('description');

let taskArray = [];

//Constructive function for tasks
function task(name, date, priority, text)
{
    this.name = name;
    this.date = date;
    this.priority = priority;
    this.text = text;
}

// Add the new Task
const addTask = (name, date, priority, text) =>
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
            <span class="name">${name}</span>
            <span class="priority ${p}">${priority}</span>
            <div class="date-div">
                📅
                <span class="date">${date}</span>
            </div>
            <p class="descrp">- ${text}</p>
        </div>
     </li>

    `

    //Stores task
    taskArray.push(new task(name, date, priority, text));
    window.localStorage.setItem('userTask', JSON.stringify(taskArray));
}


submitButton.addEventListener('click', (event) =>{
    event.preventDefault();

    const nameValue = inputName.value;
    const dateValue = inputDate.value;
    const priorityValue = inputPriority.value;
    const textValue = inputText.value;

    const temp = dateValue.split("-");

    const normalizedDate = `${temp[2]}/${temp[1]}/${temp[0]}`;

    addTask(nameValue, normalizedDate, priorityValue, textValue);

    inputName.value = '';
    inputDate.value = '';
    inputPriority.value = '';
    inputText.value = '';
    
});

document.addEventListener('DOMContentLoaded', () =>{
    const savedTasks = JSON.parse(localStorage.getItem('userTask')) || [];

    savedTasks.forEach(info => {
        addTask(info.name, info.date, info.priority, info.text);
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