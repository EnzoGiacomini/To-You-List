const orderList = document.getElementsByClassName('task-list')[0]; //Get ol
const submitButton = document.getElementById('submit-button');

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputPriority = document.getElementById('priority-form');
const inputText = document.getElementById('description');

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
}

submitButton.addEventListener('click', (event) =>{
    event.preventDefault();

    const nameValue = inputName.value;
    const dateValue = inputDate.value;
    const priorityValue = inputPriority.value;
    const textValue = inputText.value;

    addTask(nameValue, dateValue, priorityValue, textValue);

    inputName.value = '';
    inputDate.value = '';
    inputPriority.value = '';
    inputText.value = '';
    
});
