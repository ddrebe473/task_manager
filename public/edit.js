const getTaskId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('task');
    return taskId;
};

const getTasks = async () => {
    const taskRes = await fetch('/api/tasks');
    const tasks = await taskRes.json();
    return tasks;
};

const load = async () => {
    console.log('load');

    //get task id from url
    const taskId = getTaskId();
    console.log('load0:', taskId);

    //get task from tasks array based on id
    const tasks = await getTasks();
    console.log('taskList:', tasks);

    const task = tasks.find((task) => task.id.toString() === taskId.toString());
    console.log(task);

    if (!task) {
        console.log('task not found');
        window.location = '/';
    }
    //set input text as task name
    document.querySelector('#task').value = task.name;
};
load();

const updateTaskFromForm = async () => {
    console.log('print');
    // get task id from url
    const taskId = getTaskId();

    //get value from task input
    const taskValue = document.querySelector('#task').value;
    console.log('taskVal:', taskId, taskValue);

    if (!taskValue){
        alert('Please enter  task name')
        return
    }

    try {
        const taskRes = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: taskValue,
            }),
        });
        console.log('updateRes:', taskRes);
        if (taskRes.status == 200) {
            window.location = '/';
        } else {
            console.log('error');
            return
        }
    } catch (err) {
        console.log('update:', err);
    }
};

const cancel = () => {
    window.location = '/';
};
