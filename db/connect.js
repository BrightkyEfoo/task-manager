const mongoose = require('mongoose');

const connectDB = url => {
  return mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    
};
// .then(() => console.log('successfully connected to DataBase...'))
//     .catch(err => {
//       console.error(err.message);
//       console.log('err : ', { ...err });
//     });
module.exports = connectDB