// This file handles user authentication: signup, login (both normal and Auth0), and logout
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    let { name, email, password, Auth = false } = req.body;
    const originalEmail = email;
    if(!email){
      return res.status(400).json({message:"Email not provided"})
    }
    console.log(email)
    if (Auth) {
      email = email + "Auth0Google";
    }
    console.log(email)
    const existUser = await User.findOne({ email });
    if (existUser) {
      if (Auth) {
        const token = await genToken(existUser._id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
          message: "Signup successful",
          user: {
            name: existUser.name,
            email: originalEmail,
          },
        });
      }
      return res
        .status(400)
        .json({ message: "User already exists", email, Auth });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        name: user.name,
        email: originalEmail,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};







export const logIn = async (req, res) => {
  try {
    let { email, password, Auth = false } = req.body;
    const originalEmail = email;

    if (Auth) {
      email = email + "Auth0Google";
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please send email and password" });
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
    

    const token = await genToken(user._id);
      
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: originalEmail,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Login failed`, error: error.message });
  }
};



export const logOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Logout failed`, error: error.message });
  }
};
