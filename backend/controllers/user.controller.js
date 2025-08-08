import User from "../models/user.model.js"
import Todo from "../models/todo.model.js";
import bcrypt from "bcryptjs";

export const getCurrentUser =async(req , res)=>{
    try{
        let user =await User.findById(req.userId).select("-password")

        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({message:`getCurrentUser error ${error}`})
    }
}

export const delUser = async (req, res) => {
  try {
    let { email, Auth} = req.body;

    if (Auth) {
      email = email + "Auth0Google";
    }

    const existUser = await User.findOne({ email });
if (!email ) {
        return res
          .status(400)
          .json({ message: "Email not recieved " });
      }
      if (!existUser) {
        return res.status(400).json({ message: "User not found" });
      }
    const user_id = existUser._id;

    await Todo.deleteMany({ user: user_id });
    await User.findOneAndDelete({ email });
     res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "User and todos deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
