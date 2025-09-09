const { Schema, default: mongoose } = require("mongoose");
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "No description provided. You can edit your profile to add more details about yourself."
    },
    location: {
        type: String,
        default: "Pakistan"
    },
    securityQuestion: {
        type: String,
        required: true,
    },
    securityAnswer: {
        type: String,
        required: true,
    },


    //role
    role: {
        type: String,
        enum: ["organizer", "exhibitor", "attendee"],
        default: "attendee",
    },
    image: { type: String, default: "/uploads/1756879463295.jpg" },

     notifications: [
    {
      message: String,
      type: { type: String }, // "approval" | "rejection"
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ]

})

module.exports = mongoose.model("user", UserSchema)