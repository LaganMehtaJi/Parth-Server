import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();
const SECRET_KEY = process.env.secret_key; 

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token){ 
    return res.status(401).json({ message: 'Token required' });
    console.log("Token not found");
   }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
