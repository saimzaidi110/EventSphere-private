const bcrypt = require('bcrypt');
const UserSchema = require("../models/UserSchema");
const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || ' '
let UserController = {
  getSingleUser: async (req, res) => {
    const { id } = req.params

    const user = await UserSchema.findById(id)

    if (!user) {
      res.json({
        message: "User not found",
        status: false
      })
    } else {
      res.json({
        message: "User found",
        user,
        status: true
      })
    }
  },
  getalluser: async (req, res) => {
    try {
      const users = await UserSchema.find({})
      res.json({
        message: "All users get successfully",
        status: true,
        users
      })
    } catch (error) {
      res.json({
        message: "Failed to get User",
        status: false,
        error
      })
    }
  },

  Signup: async (req, res) => {
    const { username, email, password, role, securityQuestion, securityAnswer } = req.body;

    if (!username || !email || !password || !securityQuestion || !securityAnswer) {
      return res.json({
        message: "Required fields are missing",
        status: false,
      });
    }

    const existinguser = await UserSchema.findOne({ email });
    if (existinguser) {
      return res.json({
        message: "User already exists with this email",
        status: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const hashAnswer = await bcrypt.hash(securityAnswer.toLowerCase(), 10); // lowercase for consistency

    let user = new UserSchema({
      username,
      email,
      password: hashPassword,
      role,
      securityQuestion,
      securityAnswer: hashAnswer
    });

    await user.save();

    res.json({
      message: "SignUp Successfully",
      status: true,
      user
    });
  },
  getSecurityQuestion: async (req, res) => {
    const { email } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", status: false });
    }

    res.json({
      message: "Security question fetched",
      status: true,
      question: user.securityQuestion
    });
  },
  resetPasswordWithAnswer: async (req, res) => {
    const { email, answer, newPassword } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", status: false });
    }

    const isAnswerMatch = await bcrypt.compare(answer.toLowerCase(), user.securityAnswer);
    if (!isAnswerMatch) {
      return res.json({ message: "Incorrect answer", status: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password reset successful",
      status: true
    });
  },


  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: "Email and password are required",
        status: false,
      });
    }

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found with this email",
        status: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Invalid password",
        status: false,
      });
    }

    // ✅ Create token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || "user", // Add role if it exists
      },
      SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: false, // Use true in production (HTTPS)
    });

    // ✅ Return success (but not password!)
    res.json({
      message: "Login successful",
      status: true,
      user
    });
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    try {
      const user = await UserSchema.findByIdAndDelete(id)
      res.json({
        message: "User Deleted Successfully",
        status: true,
        user,
      });
    } catch (error) {
      res.json({
        message: "Failed to Delete User",
        status: false,
        error
      });
    }
  },

    // ✅ NEWLY ADDED: Update User
  updateUser: async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    console.log(req.params)
    const { username, email, bio, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("=====================user",{image, username, email, bio, location})

    try {
      const existinguser = await UserSchema.findOne({ email });
      console.log("====existinguser",existinguser)
      // if (existinguser && existinguser._id.toString() !== id) {
      //   return res.json({
      //     message: "User is already exist with this email",
      //     status: false,
      //   });
      // }

      const updateData = { username, email:existinguser.email, bio, location };
      if (image) updateData.image = image;

      console.log(updateData)
      const updatedUser = await UserSchema.findByIdAndUpdate(id, updateData, { new: true });

      if (updatedUser) {
        res.json({
          message: "User updated successfully",
          status: true,
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            username: updatedUser.username,
            role: updatedUser.role || "user",
            bio: updatedUser.bio,
            location: updatedUser.location,
            image: updatedUser.image
          },
        });
      } else {
        res.json({ message: "User not found", status: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to update user",
        status: false,
        error
      });
    }
  },



  
  logoutUser: (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  }
}

module.exports = UserController;





