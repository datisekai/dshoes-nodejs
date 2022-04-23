const express = require('express');
const router = express.Router()
const isLogin = require('../middleware/isLogin')
const isExist = require('../middleware/isExist')
const isManagerUser = require('../middleware/isManagerUser')
const {getBenefitAllProduct} = require('../Controller/StatisticController')

router.get('/',isLogin,isExist,isManagerUser, getBenefitAllProduct)

module.exports = router;