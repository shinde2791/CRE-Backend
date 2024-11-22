const express = require('express');
const router = express.Router();
const {getUserData,addUserData}=require('../controller/userDataController')

router.get('/',getUserData);
router.post('/',addUserData);

module.exports=router;