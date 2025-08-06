import express from "express";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import * as AdminObj from "../../model/admin.model.js"; 

dotenv.config();
const SECRET_KEY =
 process.env.secret_key;

// Token generator
const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const CheckAdmin = async (req, res) => {
  const { email, adminCode, pass } = req.body;

  try {
    if (!email || !adminCode || !pass) {
      return res.status(401).json({ message: "Enter All Details" });
    }

    const AdminData = await AdminObj.Admin.findOne({ email });

    if (!AdminData) {
      return res.status(401).json({ message: "Register your Account" });
    }

    if (pass === AdminData.password) {
      // ✅ Generate token with relevant payload
      const token = generateToken({ id: AdminData._id, email: AdminData.email });

      return res.status(200).json({
        message: "Successful Login",
        Studentdata: AdminData,
        token: token,
      });
    } else {
      return res.status(401).json({ message: "Wrong Details" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
