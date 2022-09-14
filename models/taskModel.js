const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type : String,
    trim : true,
    required : [true , 'the title cant be empty'],
    maxlength : [20,'name cant be over 20 characters']
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
