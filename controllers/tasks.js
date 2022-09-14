const Tasks = require('../models/taskModel.js');
const { options } = require('../routes/tasks.js');

const getAllTasks = (req, res) => {
  Tasks.find().then(taskList => {
    res.json({ taskList });
  });
};

const getOneTask = (req, res) => {
  const id = req.params.id;
  Tasks.findById(id)
    .then(task => {
      if (task) {
        res.json({ msg: 'a task was found', task });
      } else {
        res.status(404).json({ msg: 'there is no task for that id' });
      }
    })
    .catch(err => {
      res.status(404).json({ msg: 'You provided an invalid id', err });
    });
};

const createTask = (req, res) => {
  const task = req.body;
  if (
    !task.title ||
    typeof task.title !== 'string' ||
    task.title instanceof String ||
    /^ *$/.test(task.title)
  ) {
    res.status(400).json({ msg: "title can't be empty" });
  } else {
    Tasks.create(task)
      .then(newTask => {
        res
          .status(201)
          .json({ msg: 'new task successfully created', task: newTask });
      })
      .catch(err => {
        res.status(500).json({
          msg: 'something went wrong please try again later... ',
          err,
        });
      });
  }
};

const updateTask = (req, res) => {
  const id = req.params.id;
  const task = req.body;
  if (!id) {
    res.status(404).json({ msg: 'id cant be empty' });
  } else {
    Tasks.findByIdAndUpdate(
      id,
      task,
      { runValidators: true , new : true },
      (err, newTask) => {
        if (err) {
          res.status(404).json({ msg: err.message , err });
        } else {
          if (newTask) {
            res.json({ msg: 'successfully updated', task: newTask });
          } else {
            res.status(404).json({ msg: "there's no task for that id" });
          }
        }
      }
    );
  }
  // res.json({id : req.params.id})
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  Tasks.findByIdAndDelete(id, (err, prevTask) => {
    if (err) {
      res.status(404).json({ msg: 'you ust provide a valid id' });
    } else {
      if (prevTask) {
        res.json({ msg: 'succesfully deleted', task: prevTask });
      } else {
        res.status(404).json({ msg: "there's no task for that id" });
      }
    }
  });
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
