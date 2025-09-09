const eventSchema = require("../models/eventSchema");
const UserSchema = require("../models/UserSchema");

// Create and Get all Expo Events
const expoController = {
    createExpoEvent: async (req, res) => {
        try {
            const { title, date, location, description, theme, imageUrl, booths } = req.body;

            const newExpo = new eventSchema({
                title,
                date,
                location,
                description,
                theme,
                imageUrl,
                booths
            });

            const savedExpo = await newExpo.save();
            res.status(201).json({ message: 'Expo created successfully', expo: savedExpo });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create expo', error: error.message });
        }
    },

    // ✅ Get All
    getAllExpoEvents: async (req, res) => {
        try {
            const expos = await eventSchema.find().sort({ date: 1 });
            res.status(200).json(expos);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch expos', error: error.message });
        }
    },

    // ✅ Get Single
    getSingleExpoEvent: async (req, res) => {
        try {
            const expo = await eventSchema.findById(req.params.id);
            if (!expo) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(expo);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch event", error: error.message });
        }
    },

    // Delete
    deleteExpoEvent: async (req, res) => {
        try {
            await eventSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete event", error: error.message });
        }
    },

    // Update
    updateExpoEvent: async (req, res) => {
        try {
            const updated = await eventSchema.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.status(200).json({ message: "Event updated successfully", event: updated });
        } catch (error) {
            res.status(500).json({ message: "Failed to update event", error: error.message });
        }
    },
    exhibitorRequest: async (req, res) => {
        const { expoId, username, email, companyName, productsServices, documents } = req.body;
        console.log(req.body)
        try {
            const expo = await eventSchema.findById(expoId);
            if (!expo) {
                return res.status(404).json({ message: 'Expo not found' });
            }
            expo.exhibitorRequests.push({ username, email, companyName, productsServices, documents });
            await expo.save();
            res.status(200).json({ message: 'Exhibitor request submitted successfully', status: true });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    },
    approveExhibitorRequest: async (req, res) => {
        const { expoId, exhibitorRequestId } = req.body;
        try {
            // Find the expo by ID
            const expo = await eventSchema.findById(expoId);

            if (!expo) {
                return res.status(404).json({ message: 'Expo not found' });
            }

            // Find the exhibitor request by requestId
            const exhibitorRequest = expo.exhibitorRequests.id(exhibitorRequestId);
            if (!exhibitorRequest) {
                return res.status(404).json({ message: 'Exhibitor request not found' });
            }

            // Check if booths are already full
            const totalBooths = expo.booths; // max booths from schema
            const allocatedBoothsCount = expo.exhibitorList.length;

            if (allocatedBoothsCount >= totalBooths) {
                return res.status(400).json({ message: 'All booths are already allocated. Cannot approve more exhibitors.' });
            }

            // Assign next booth number
            const allocatedBoothNumber = allocatedBoothsCount + 1;

            // Push to exhibitorList with booth number
            expo.exhibitorList.push({
                username: exhibitorRequest.username,
                email: exhibitorRequest.email,
                companyName: exhibitorRequest.companyName,
                productsServices: exhibitorRequest.productsServices,
                documents: exhibitorRequest.documents,
                allocatedBooth: allocatedBoothNumber
            });

            // Remove the exhibitor request from exhibitorRequests
            expo.exhibitorRequests.pull(exhibitorRequestId);

            // Save updated expo document
            await expo.save();

            // ✅ Add notification for exhibitor
            const user = await UserSchema.findOne({ email: exhibitorRequest.email });
            if (user) {
                user.notifications.push({
                    message: `✅ Your exhibitor request for "${expo.title}" has been approved. Booth #${allocatedBoothNumber} allocated.`,
                    type: "approval"
                });
                await user.save();
            }

            return res.status(200).json({
                message: `Exhibitor approved and allocated booth #${allocatedBoothNumber}`,
                expo
            });
        } catch (error) {
            console.error('Error approving exhibitor:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },


    rejectExhibitorRequest: async (req, res) => {
        const { expoId, exhibitorRequestId } = req.body;

        try {
            const expo = await eventSchema.findById(expoId);
            if (!expo) {
                return res.status(404).json({ status: false, message: 'Expo not found' });
            }

            // Find the exhibitor request
            const exhibitorRequest = expo.exhibitorRequests.id(exhibitorRequestId);
            if (!exhibitorRequest) {
                return res.status(404).json({ status: false, message: 'Exhibitor request not found' });
            }

            // ✅ Notify the user before removing
            const user = await UserSchema.findOne({ email: exhibitorRequest.email });
            if (user) {
                user.notifications.push({
                    message: `❌ Your exhibitor request for "${expo.title}" has been rejected.`,
                    type: "rejection"
                });
                await user.save();
            }
            // Filter out the rejected exhibitor request
            expo.exhibitorRequests = expo.exhibitorRequests.filter(
                (request) => request._id.toString() !== exhibitorRequestId
            );

            await expo.save();
            res.status(200).json({ status: true, message: 'Exhibitor request rejected successfully', expo });
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Error rejecting exhibitor request', error });
        }
    },


    attendeeRegister: async (req, res) => {
        const { expoId, username, email } = req.body;

        // Validate the input
        if (!expoId || !username || !email) {
            return res.status(400).json({ message: 'expoId, username, and email are required' });
        }

        try {
            // Find the Expo by ID
            const expo = await eventSchema.findById(expoId);

            if (!expo) {
                return res.status(404).json({ message: 'Expo not found' });
            }

            // Check if the attendee is already registered
            const isAlreadyRegistered = expo.attendeeList.some(
                (attendee) => attendee.email === email
            );

            if (isAlreadyRegistered) {
                return res.json({ message: 'Attendee already registered', status: false });
            }

            // Add the new attendee to the attendee list
            expo.attendeeList.push({ username, email });

            // Save the updated Expo document
            await expo.save();

            return res.status(200).json({
                message: 'Successfully registered for the expo',
                attendeeCount: expo.attendeeList.length,
                attendeeList: expo.attendeeList,
                status: true
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    // Update expo schedule
    scheduleExpo: async (req, res) => {
        const { id } = req.params; // Get the expo ID from the URL
        const { title, date, time, speaker, location } = req.body; // Extract fields from the request body
        console.log(req.body)

        try {
            // Validate the incoming data
            if (!title || !date || !time || !speaker || !location) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Find the expo by ID and update it
            const updatedExpo = await eventSchema.findByIdAndUpdate(
                id,
                { title, date, time, speaker, location },
                { new: true, runValidators: true } // Return the updated document and run schema validators
            );

            if (!updatedExpo) {
                return res.status(404).json({ message: 'Expo not found' });
            }

            res.status(200).json({ message: 'Expo updated successfully', data: updatedExpo });
        } catch (error) {
            console.error('Error updating expo:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = expoController;
