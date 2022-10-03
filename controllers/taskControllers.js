const { tasks } = require('../data.json');
const fs = require('fs');
const { uuid } = require('uuidv4');

const getTasks = (req, res) => {
    console.log('The tasks', tasks);
    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    //create a new task
    const { name } = req.body;

    //create a new task
    const newId = uuid();
    const newTask = {
        id: newId,
        name: name,
    };

    const tasksList = [...tasks, newTask];

    const data = {};
    data.tasks = tasksList;

    console.log('list', data);
    fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8');
    return res.status(200).json(true);
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    console.log('deleteTask', id);

    const taskList = {
        tasks: tasks.filter((task) => task.id.toString() !== id.toString()),
    };

    fs.writeFileSync('./data.json', JSON.stringify(taskList), 'utf-8');
    return res.status(200).json(true);
};
const updateTask = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const taskList = [...tasks];

    taskList.forEach((task) => {
        if (task.id.toString() === id.toString()) {
            task.name = name;
        }
    });
    const data = {};
    data.tasks = taskList;

    console.log('list', data);
    fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8');

    return res.status(200).json(true);
};
module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
};
