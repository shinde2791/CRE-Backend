const ManualData = require('../model/manualDataModel')

exports.getManualData=async(req,res)=>{
    try {
        const data=await ManualData.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({message:'Error Fetching manual data' , error:err.message});
    }
};

