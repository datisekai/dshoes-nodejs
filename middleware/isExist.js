
const existUser = (req, res, next) => {
  const userId = req.userId;
  if(!userId)
  {
      return res.status(403).json({success:false,message:"Error token"});
  }
  else {
      next();
  }
};

module.exports = existUser;