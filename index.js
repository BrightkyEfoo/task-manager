const express = require('express');
const morgan = require('morgan');
require('dotenv').config()
const connectDB = require('./db/connect.js');
const taskRoutes = require('./routes/tasks.js');

const app = express();

app.use(morgan('dev')).use(express.json());
 
const PORT = process.env.PORT || 5000;



connectDB(process.env.MONGODB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
    console.log('successfully connected to DataBase...');
  })

  .catch(err => {
    console.log('server starting failed due to ')
    console.error(err.message);
    console.log('err : ', { ...err });
  });
  

//routes

app.get('/', (req, res) => res.send("THAT'S WORKS"));
app.use('/api/v1/tasks', taskRoutes);
