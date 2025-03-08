import jwt from "jsonwebtoken";
import User from "../models/user.module.js";

export const userAuth = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    console.log({token});
    if (!token)
      return res
        .status(401)
        .json({ error: "UnAuthorized - No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decoded)
      return res.status(401).json({ error: "UnAuthorized - Invalid Token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json("Account Not Found");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};


