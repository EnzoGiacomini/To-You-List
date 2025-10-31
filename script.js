const orderList = document.getElementsByClassName('task-list')[0]; //Get ol
const submitButton = document.getElementById('submit-button');
const taskContainer = document.getElementsByClassName('')
const statusGroup = document.getElementById('groups-select');
let deleteButton = document.querySelectorAll('.delete');
let taskIndex = 0;

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputPriority = document.getElementById('priority-form');

let taskArray = [];

const getDays = (formatedDate) => {
    const date = formatedDate.split('-');
    const days = parseInt(date[2]);
    const months = parseInt(date[1]);
    const years = parseInt(date[0]);

    const total = days + 30*(months) + 365*(years);

    return total;
}

const checkStatus = () => {
    const todayDate = new Date();

    const tDay = todayDate.getDate();
    const tMonth = todayDate.getMonth() + 1;
    const tYear = todayDate.getFullYear();

    const fDay = String(tDay).padStart(2, '0');
    const fMonth = String(tMonth).padStart(2, '0');

    const date = `${tYear}-${fMonth}-${fDay}`;

    const totalDays = getDays(date);

    taskArray.forEach(task => {
        if(task.status === 'done') return;

        let taskDates = task.date

        if(taskDates === '' || taskDates === null) return;

        const taskItem =  orderList.querySelector(`[data-index="${task.index}"]`);

        if (!taskItem) return;

        const label = taskItem.querySelector('.name');

        const temp = taskDates.split('/');

        taskDates = `${temp[2]}-${temp[1]}-${temp[0]}`;

        const taskDayss =  getDays(taskDates);

        label.classList.remove('on-going', 'late');

        if(taskDayss < totalDays)
        {
            task.status = 'late';
            label.classList.add('late');
        }
        else
        {
            task.status = 'on-going';
            label.classList.add('on-going');
        }

    });

    window.localStorage.setItem('userTask', JSON.stringify(taskArray));

}

//Constructive function for tasks
function task(name, date, priority, index, status)
{
    this.name = name;
    this.date = date;
    this.priority = priority;
    this.index = index;
    this.status = status;
}

// Add the new Task
const addTask = (name, date, priority, index, status) =>
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

    const html = 
    `
        <li class="to-do list-group-item d-flex justify-content-between align-items-center" data-index="${index}">
            <div class="info-container d-flex align-items-center w-100">
                
                <div class="left-side form-check me-3"> 
                    
                    <input type="checkbox" class="task-done form-check-input border border-secondary rounded-1 fs-5" id="task-${index}">
                    
                    <label class="name ${status} form-check-label" for="task-${index}"> 
                        ${name}
                    </label>
                    
                </div>
                
                <div class="right-side d-flex align-items-center">
                    <div class="date-div ${d} me-3">
                        <span class="date">${date}</span>
                    </div>
                    <span class="priority ${p} me-3"></span>
                    <span class="delete" style="cursor: pointer;"><img src="./img/trash.png" width="15px" height="15px"></span>
                </div>
            </div>
        </li>
    `;

    orderList.insertAdjacentHTML('beforeend', html);

    if(status === 'done')
    {
        const checkB = document.getElementById('task-'+index);

        checkB.checked = true;
    }

    //Stores task
    taskArray.push(new task(name, date, priority, index, status));
    checkStatus();
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



    addTask(nameValue, normalizedDate, priorityValue, taskIndex, 'on-going');

    taskIndex++;

    window.localStorage.setItem('numIndex', JSON.stringify(taskIndex));
    window.localStorage.setItem('userTask', JSON.stringify(taskArray));

    inputName.value = '';
    inputDate.value = '';
    inputPriority.value = '';

});

//Checkbox Logic
orderList.addEventListener('click', (event) =>{
    
    const checkBox = event.target.closest('.task-done');
    const taskItem = checkBox.closest('.to-do');
    const taskText = taskItem.querySelector('.name');

    const dataIndex = parseInt(taskItem.getAttribute('data-index'));

    const cIndex = taskArray.findIndex(task => task.index === dataIndex);

    if(checkBox.checked && checkBox)
    {
        taskText.classList.add('done');
        taskText.classList.remove('on-going', 'late');
        taskArray[cIndex].status = 'done';
        window.localStorage.setItem('userTask', JSON.stringify(taskArray));
    }
    else if(!checkBox.checked && checkBox)
    {
        taskText.classList.remove('done');
        if(taskArray[cIndex].status !== 'on-going')
        {
            taskArray[cIndex].status = 'on-going'
            taskText.classList.add('on-going');
            checkStatus();
        }
        else
        {
            taskText.classList.add('on-going');
            taskArray[cIndex].status = 'on-going';
        }
        window.localStorage.setItem('userTask', JSON.stringify(taskArray));
    }


});

statusGroup.addEventListener('change', (event) =>{
    const selectedValue = event.target.value;

    const allTasks = orderList.querySelectorAll('.to-do');

    allTasks.forEach(taskItem => {
        const label = taskItem.querySelector('.name');

        taskItem.classList.remove('disable');

        if(selectedValue === 'all')
        {
            return;
        }

        if(!label.classList.contains(selectedValue))
        {
            taskItem.classList.add('disable');
        }
    })
})

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
        addTask(info.name, info.date, info.priority, info.index, info.status);
    });

    taskIndex = numTask


    
})



/* 

Next features:

- Functional check task 
- functional search bar
- recognize late tasks
- functional filter

*/