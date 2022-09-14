const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.js');

//route api/v1/tasks/
router.route('/').get(getAllTasks).post(createTask);
//route api/v1/tasks/:id
router.route('/:id').get(getOneTask).delete(deleteTask).put(updateTask);

module.exports = router;
