const express = require('express')
const router = express.Router();
const {getManualData}=require('../controller/manualDataController');


router.get('/',getManualData);

module.exports = router;

