const mongoose=require('mongoose');

const userDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  });

  const UserData = mongoose.model('UserData', userDataSchema);
  module.exports = UserData;


