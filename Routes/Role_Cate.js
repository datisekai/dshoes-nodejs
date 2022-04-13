const express = require('express');
const router = express.Router();
const isLogin = require('../middleware/isLogin')
const isExist = require('../middleware/isExist')
const isManagerUser = require('../middleware/isManagerUser');
const { addRoleCate, deleteRoleCate, getRoleCate } = require('../Controller/RoleCateController');

router.post('/',isLogin,isExist,isManagerUser,addRoleCate)

router.delete('/:id',isLogin,isExist,isManagerUser,deleteRoleCate)

router.get('/',isLogin,isExist,getRoleCate)

module.exports = router;