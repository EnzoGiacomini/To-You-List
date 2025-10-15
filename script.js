const orderList = document.getElementsByClassName('task-list')[0]; //Get ol


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
