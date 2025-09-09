const express = require("express");
const router = express.Router();
const expoController = require("../controllers/EventController");

// Get all
router.get("/", expoController.getAllExpoEvents);

// Get single
router.get("/:id", expoController.getSingleExpoEvent);

// Create
router.post("/", expoController.createExpoEvent);

// Update
router.put("/:id", expoController.updateExpoEvent);

// Delete
router.delete("/:id", expoController.deleteExpoEvent);

// exhibitor  request for event
router.post('/exporegisterrequest', expoController.exhibitorRequest)


// http://localhost:3000/api/expos/approve-exhibitor
router.post('/approve-exhibitor',expoController.approveExhibitorRequest)

// http://localhost:3000/api/expos/reject-exhibitor
router.post('/reject-exhibitor',expoController.rejectExhibitorRequest)

// // http://localhost:3000/api/expos/attendeeregister
router.post('/attendeeregister', expoController.attendeeRegister)

// // http://localhost:3000/api/expo/schedule/id
router.post('/schedule/:id', expoController.scheduleExpo)

module.exports = router;
