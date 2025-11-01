const orderList = document.getElementsByClassName('task-list')[0]; //Get ol
const submitButton = document.getElementById('submit-button');
const taskContainer = document.getElementsByClassName('')
const statusGroup = document.getElementById('groups-select');
let deleteButton = document.querySelectorAll('.delete');
let taskIndex = 0;

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputPriority = document.getElementById('priority-form');

let taskArray = []; // Array to store task objects

// Helper function: Converts date to a numerical value for comparison.
const getDays = (formatedDate) => {
    const date = formatedDate.split('-');
    const days = parseInt(date[2]);
    const months = parseInt(date[1]);
    const years = parseInt(date[0]);

    const total = days + 30 * (months) + 365 * (years);

    return total;
}

// Checks all tasks and updates status to 'late' if overdue.
const checkStatus = () => {
    // Get today's date in numerical value
    const todayDate = new Date();
    const tDay = todayDate.getDate();
    const tMonth = todayDate.getMonth() + 1;
    const tYear = todayDate.getFullYear();
    const fDay = String(tDay).padStart(2, '0');
    const fMonth = String(tMonth).padStart(2, '0');
    const date = `${tYear}-${fMonth}-${fDay}`;
    const totalDays = getDays(date);

    taskArray.forEach(task => {
        if (task.status === 'done') return; // Skip if task is already done

        let taskDates = task.date

        if (taskDates === '' || taskDates === null) return; // Skip if task has no date

        // Find the matching DOM element
        const taskItem = orderList.querySelector(`[data-index="${task.index}"]`);

        if (!taskItem) return; // Skip if DOM element doesn't exist

        const label = taskItem.querySelector('.name');
        const dateSpan = taskItem.querySelector('.date');

        // Convert date format for comparison (DD/MM/YYYY to YYYY-MM-DD)
        const temp = taskDates.split('/');
        taskDates = `${temp[2]}-${temp[1]}-${temp[0]}`;

        const taskDayss = getDays(taskDates);

        label.classList.remove('on-going', 'late'); // Reset visual status

        if (taskDayss < totalDays) {
            // Update array and DOM for 'late' tasks
            task.status = 'late';
            label.classList.add('late');
            dateSpan.textContent = `${-(taskDayss - totalDays)} dias atrasados`;
            dateSpan.style.fontSize = '10px'
        }
        else {
            // Update array and DOM for 'on-going' tasks
            task.status = 'on-going';
            label.classList.add('on-going');
        }

    });

    window.localStorage.setItem('userTask', JSON.stringify(taskArray)); // Save changes to localStorage

}

// Task object constructor
function task(name, date, priority, index, status) {
    this.name = name;
    this.date = date;
    this.priority = priority;
    this.index = index;
    this.status = status;
}

// Creates and adds a new task element to the DOM
const addTask = (name, date, priority, index, status) => {
    let p; // Priority class
    let d; // Date disabled class
    
    // Map priority string to CSS class
    switch (priority) {
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

    // Disable date/priority elements visually if no date or 'done'
    if (date === '' || status === 'done') {
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
                    <span class="priority ${p} ${d} me-3"></span>
                    <span class="delete" style="cursor: pointer;"><img src="./img/trash.png" width="15px" height="15px"></span>
                </div>
            </div>
        </li>
    `;

    // Use insertAdjacentHTML for better performance
    orderList.insertAdjacentHTML('beforeend', html);

    // If loading a 'done' task, check the box
    if (status === 'done') {
        const checkB = document.getElementById('task-' + index);
        if (checkB) { // Safety check
            checkB.checked = true;
        }
    }

    // Add to array and re-check all statuses
    taskArray.push(new task(name, date, priority, index, status));
    checkStatus();
}

// Handle new task submission
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents form submission and page reload

    const nameValue = inputName.value;
    const dateValue = inputDate.value;
    const priorityValue = inputPriority.value;
    let normalizedDate = '';

    if (nameValue === '') {
        alert('Por favor nomeie a tarefa');
        return;
    }

    // Normalize date format (YYYY-MM-DD to DD/MM/YYYY)
    if (dateValue !== '') {
        const temp = dateValue.split("-");
        normalizedDate = `${temp[2]}/${temp[1]}/${temp[0]}`;
    }
    else {
        normalizedDate = '';
    }


    // Add task with default 'on-going' status
    addTask(nameValue, normalizedDate, priorityValue, taskIndex, 'on-going');

    taskIndex++;

    // Update localStorage
    window.localStorage.setItem('numIndex', JSON.stringify(taskIndex));
    window.localStorage.setItem('userTask', JSON.stringify(taskArray));

    // Clear form inputs
    inputName.value = '';
    inputDate.value = '';
    inputPriority.value = '';

});

// Event delegation for checkbox clicks
orderList.addEventListener('click', (event) => {

    const checkBox = event.target.closest('.task-done');
    // Safety check: ensure a checkbox was clicked (implicit in logic below)
    if (!checkBox) return; // If no checkbox, do nothing (prevents errors)

    const taskItem = checkBox.closest('.to-do');
    const taskDate = taskItem.querySelector('.date-div');
    const taskP = taskItem.querySelector('.priority');
    const taskText = taskItem.querySelector('.name');

    // Find the task in the array
    const dataIndex = parseInt(taskItem.getAttribute('data-index'));
    const cIndex = taskArray.findIndex(task => task.index === dataIndex);

    // Logic for marking task as DONE
    if (checkBox.checked && checkBox) {
        taskText.classList.add('done');
        taskText.classList.remove('on-going', 'late');
        taskArray[cIndex].status = 'done';
        // Hide date/priority and save
        taskDate.classList.add('disable');
        taskP.classList.add('disable');
        window.localStorage.setItem('userTask', JSON.stringify(taskArray));
    }
    // Logic for UN-marking a task
    else if (!checkBox.checked && checkBox) {
        taskText.classList.remove('done');
        // Show date only if it exists
        if(taskArray[cIndex].date != '')
        {
            taskDate.classList.remove('disable');
        }
        // Show priority only if it exists
        if (taskArray[cIndex].priority != '') {
            taskP.classList.remove('disable');
        }
        
        // Reset status to 'on-going' and force re-evaluation
        taskArray[cIndex].status = 'on-going'
        checkStatus(); // Recalculates if it should be 'late'

        window.localStorage.setItem('userTask', JSON.stringify(taskArray));
    }


});

// Handle filter selection change
statusGroup.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    const allTasks = orderList.querySelectorAll('.to-do');

    // Loop through all visible tasks
    allTasks.forEach(taskItem => {
        const label = taskItem.querySelector('.name');

        // Always remove 'disable' first (clean slate for filtering)
        taskItem.classList.remove('disable');

        if (selectedValue === 'all') {
            return; // Show all
        }

        // Hide tasks that don't match the filter
        if (!label.classList.contains(selectedValue)) {
            taskItem.classList.add('disable');
        }
    })
})

// Event delegation for delete button
orderList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete');

    // Safety check: ensure delete was clicked
    if (deleteButton) {
        const deletedTask = deleteButton.closest('.to-do');

        // Find the task in the array
        const dataIndex = parseInt(deletedTask.getAttribute('data-index'));
        const cIndex = taskArray.findIndex(task => task.index === dataIndex);

        // Remove from array
        taskArray.splice(cIndex, 1);

        taskIndex--;
        window.localStorage.setItem('numIndex', JSON.stringify(taskIndex));

        // Remove from DOM and save
        deletedTask.remove();
        window.localStorage.setItem('userTask', JSON.stringify(taskArray));
    }
})


// Runs when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve data from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('userTask')) || [];
    const numTask = JSON.parse(localStorage.getItem('numIndex') || 0);

    // Load and render saved tasks
    savedTasks.forEach(info => {
        addTask(info.name, info.date, info.priority, info.index, info.status);
    });

    taskIndex = numTask;
    // NOTE: checkStatus() is called inside addTask for all initial tasks.

})



/* Next features:

- functional search bar

*/