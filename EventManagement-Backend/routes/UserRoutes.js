const express = require("express");
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/UserControlles");
const upload = require("../middleware/upload");
const router = express.Router();

const SECRET = process.env.JWT_SECRET;


// Core User APIs
router.get('/', UserController.getalluser);
router.get('/:id', UserController.getSingleUser);
router.post('/signup', UserController.Signup);
router.post('/login', UserController.login);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', upload.single("image"),UserController.updateUser);
router.post("/logout", UserController.logoutUser);

router.post("/forgot-password/question", UserController.getSecurityQuestion);
router.post("/forgot-password/reset", UserController.resetPasswordWithAnswer);



module.exports = router;
