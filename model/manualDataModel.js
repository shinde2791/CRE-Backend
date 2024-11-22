const mongoose = require('mongoose')

const manualDataSchema = new mongoose.Schema({
    title:String,
    description:String,
    date:{type:Date,default:Date.now},
});

module.exports=mongoose.model('ManualData',manualDataSchema);