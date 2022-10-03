const LOAD_TIMEOUT = 1000;

const deleteTask = async (id) => {
    const taskRes = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
    });
    console.log('deleteTask:', id, taskRes);

    setTimeout(() => load(), LOAD_TIMEOUT);
};

const getTasks = async () => {
    const taskRes = await fetch('/api/tasks');
    const tasks = await taskRes.json();
    return tasks;
};

const load = async () => {
    const tasks = await getTasks();

    console.log('load', tasks);

    const listDiv = document.querySelector('#taskList');

    listDiv.innerHTML = [];

    tasks.forEach((task) => {
        //makes task row
        const taskRow = document.createElement('div');
        taskRow.style.display = 'flex';
        taskRow.style.justifyContent = 'space-between';
        taskRow.style.alignItems = 'center';
        taskRow.innerText = task.name;

        const buttonDiv = document.createElement('div');

        //make delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.style.width = '50px';
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.innerText = 'X';
        deleteBtn.onclick = () => deleteTask(task.id);

        const editBtn = document.createElement('button');

        editBtn.onclick = () => {
            window.location = `/edit.html?task=${task.id}`;
        };
        editBtn.style.width = '50px';
        editBtn.style.backgroundColor = 'green';
        editBtn.innerText = 'Edit';

        //add button to buttonDiv
        buttonDiv.appendChild(deleteBtn);
        buttonDiv.appendChild(editBtn);

        //add button to the row
        taskRow.appendChild(buttonDiv);

        //add row to list
        listDiv.appendChild(taskRow);
    });
};

load();

const createTaskFromForm = async () => {
    const taskValue = document.querySelector('#task').value;
    if (!taskValue) return;

    document.querySelector('#task').value = ''

    console.log('createTaskFromForm:', taskValue);

    const taskRes = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: taskValue,
        }),
    });
    console.log('Res:', taskRes);
    setTimeout(() => load(), LOAD_TIMEOUT);
};
