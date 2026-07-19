import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try{
     const { name , email , password } = req.body;
     const existingUser = await User.findOne({ email });
     if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all fields"});
     }
     if(existingUser){
        return res.status(400).json({message: "User already exists"});
     }
     console.log("Creating new user...");
     const hashPassword = await bcrypt.hash(password, 10);

     const newUser = new User({
           name,
           email,
           password: hashPassword,
         });
     
         await newUser.save();
     
         res.status(201).json(newUser);
  }catch(error){
    res.status(500).json({
        message: "Registration failed"
    });
  }
};

export const loginUser = async (req, res) => {
    try{
        const { email , password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        const existingUser = await User.findOne({ email });
        if(!existingUser){
          return res.status(400).json({
            message: "Invalid email or password"
          });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
             return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            { userId: existingUser._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });
    }catch(error){
        res.status(500).json({
            message: "Login failed"
        });
    }
};