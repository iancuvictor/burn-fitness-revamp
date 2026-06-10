import jwt from "jsonwebtoken";
import User from "../schemas/user.js";

export const protect = (req, res, next) => {
  let cookie = req.cookies.userToken;
  if(cookie !== undefined){
    try {
      jwt.verify(cookie, process.env.SIGN_KEY);
      req.user = jwt.verify(cookie, process.env.SIGN_KEY);
      next();
    } catch (err) {
      res.status(401).json({ status: "unauthorized" });
    }
  } else {
    res.status(401).json({status: "unauthorized"});
  }
};

export const admin = async (req, res, next) => {
  let cookie = req.cookies.userToken;
  req.user = jwt.verify(cookie, process.env.SIGN_KEY);
  let adminUser = await User.findOne({username: req.user.username});
  if(adminUser.isAdmin === true){
    next();
  } else {
    res.json('Unauthorised');
  }
};