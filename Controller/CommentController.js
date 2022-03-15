const Comment = require("../models/Comment");

const addComment = async (req, res) => {
  const { userId, productId } = req.query;
  if (!userId || !productId) {
    return res
      .status(401)
      .json({ success: false, message: "Not Found Userid or productId" });
  }

  const { content } = req.body;
  if (!content) {
    return res
      .status(401)
      .json({ success: false, message: "Not found content comment!" });
  }

  try {
    const newContent = new Comment({
      productId,
      userId,
      content,
    });
    await newContent.save();
    return res.json({success:true, message:'Add successfull'})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const userToken = req.userId;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Not found id",
    });
  }

  try {
    const isUser = await Comment.findOne({ userId, productId });
    if (isUser.userId == userToken) {
      const deleteCm = await Comment.findOneAndDelete({ _id: id });
      if (!deleteCm) {
        return res
          .status(400)
          .json({ success: false, message: "Delete failed" });
      }

      return res.json({
        success: true,
        message: "Delete successfully",
        deleteCm,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Error userToken && userid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getCommentByProductId = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(401).json({ success: false, message: "Not found id" });
  }
  try {
    const comments = await Comment.find({ productId }).populate('userId');
    return res.json({ success: true, comments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

module.exports = { addComment, deleteComment, getCommentByProductId };
