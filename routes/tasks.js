const express = require('express');
const router = express.Router();

const {
    getTasks,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskControllers');

router.route('/').get(getTasks).post(createTask);
router.route('/:id').delete(deleteTask);
router.route('/:id').put(updateTask)

module.exports = router;
