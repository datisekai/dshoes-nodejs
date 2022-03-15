const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const isLogin = require("../middleware/isLogin");
const isManagerComments = require("../middleware/isManagerComment");
const isExist = require("../middleware/isExist");
const {addComment, deleteComment, getCommentByProductId} = require('../Controller/CommentController')


//them comments
// query: userId=abc&productId=abc
router.post('/',isLogin,isExist,isManagerComments, addComment)


//xoa comments
// query: userId=abc&productId=abc
router.delete('/:id',isLogin,isExist, isManagerComments, deleteComment)

// get comments by productId
// /api/comments/:id
router.get('/:id', getCommentByProductId)

module.exports = router