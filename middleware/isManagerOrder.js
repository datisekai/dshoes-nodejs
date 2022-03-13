const jwt = require("jsonwebtoken");
const DetailUser = require("../models/DetailUser");

const verifyToken = async(req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(400).json({
      success: false,
      message: "You must login!",
    });
  try {
    const detoken = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = detoken.userId;
    const roleUser = await DetailUser.find({
      userId: detoken.userId,
    });

    const rolesId = roleUser.map(item => item.roleId)
    
    if (rolesId.includes(2)) {
      next();
    } else {
     return res.status(403).json({
        success: false,
        message: "Error Token",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Error Token",
    });
  }
};

module.exports = verifyToken;
