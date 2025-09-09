const express = require("express");
const axios = require("axios");
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyDxfkpg5xEIb-QecFjyzWiTOF1K5ioX1HE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System prompt to define chatbot's scope and personality
const SYSTEM_PROMPT = `
You are an AI assistant for an Expo Management Platform. Your primary role is to help users with:

WEBSITE SERVICES:
- Event Management: Creating, viewing, and managing expo events
- User Registration: Attendee and exhibitor registration
- Bookmarking: Saving favorite events
- Feedback System: Collecting and managing event feedback
- Messaging: Communication between users
- File Uploads: Managing event-related documents and images

AVAILABLE USER ROLES:
- Exhibitors: Can register for booth spaces at events
- Attendees: Can register for events and bookmark favorites

PLATFORM FEATURES:
- Real-time event listings with filtering
- Booth allocation system for exhibitors
- User authentication and profiles
- Event feedback and rating system
- Direct messaging between users
- File upload capabilities for event materials

RESPONSE GUIDELINES:
- Always prioritize information about events, users, and platform features
- Be helpful and concise
- If asked about topics unrelated to expo management, politely redirect to platform features
- Use the current event data to provide accurate, up-to-date information
- Encourage users to explore platform features they might not know about

If you don't have specific information about an event or feature, suggest how users can find it on the platform or contact support.
`;

const monthMap = {
    january: 0, february: 1, march: 2, april: 3,
    may: 4, june: 5, july: 6, august: 7,
    september: 8, october: 9, november: 10, december: 11,
};

const getMonthFromPrompt = (prompt) => {
    const lower = prompt.toLowerCase();
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    if (lower.includes("this month")) return now.getMonth();
    if (lower.includes("next month")) return nextMonth.getMonth();

    for (let name in monthMap) {
        if (lower.includes(name)) return monthMap[name];
    }
    return null;
};

// Enhanced function to get comprehensive platform data
const getPlatformData = async () => {
    try {
        const [expoResponse, usersResponse, feedbackResponse] = await Promise.allSettled([
            axios.get("http://localhost:3000/api/expos"), // Updated endpoint
            axios.get("http://localhost:3000/users"),   // If you have this endpoint
            axios.get("http://localhost:3000/api/feedback") // If you have this endpoint
        ]);

        return {
            events: expoResponse.status === 'fulfilled' ? expoResponse.value.data : [],
            users: usersResponse.status === 'fulfilled' ? usersResponse.value.data : [],
            feedback: feedbackResponse.status === 'fulfilled' ? feedbackResponse.value.data : []
        };
    } catch (error) {
        console.error('Error fetching platform data:', error);
        return { events: [], users: [], feedback: [] };
    }
};

// Function to check if query is platform-related
const isPlatformRelated = (prompt) => {
    const platformKeywords = [
        'event', 'expo', 'exhibition', 'booth', 'exhibitor', 'attendee',
        'registration', 'bookmark', 'feedback', 'message', 'profile',
        'organize', 'speaker', 'location', 'date', 'time', 'theme',
        'company', 'product', 'service', 'upload', 'document',
        'platform', 'website', 'app', 'system', 'feature'
    ];
    
    const lower = prompt.toLowerCase();
    return platformKeywords.some(keyword => lower.includes(keyword));
};

// Enhanced normalize function for better text matching
const normalize = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .replace(/\b(expo|exhibition|&)\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    try {
        const lowerPrompt = prompt.toLowerCase();
        const platformData = await getPlatformData();
        const { events, users, feedback } = platformData;

        let response = null;

        // Handle platform overview questions
        if (lowerPrompt.includes("what can") || lowerPrompt.includes("what do") || 
            lowerPrompt.includes("features") || lowerPrompt.includes("services")) {
            response = `Our Expo Management Platform offers:

📅 **Event Management**: Create and manage expo events with custom themes, locations, and schedules
👥 **User Roles**: Support for organizers, exhibitors, and attendees with different permissions
🏢 **Booth Management**: Automated booth allocation system for exhibitors
💾 **Bookmarking**: Save your favorite events for easy access
💬 **Messaging**: Direct communication between platform users
📊 **Feedback System**: Rate and review events (1-5 stars)
📁 **File Management**: Upload and manage event-related documents and images

Currently, we have ${events.length} active events on the platform. Would you like to know more about any specific feature?`;
        }

        // Platform statistics
        if (lowerPrompt.includes("stats") || lowerPrompt.includes("statistics") || 
            lowerPrompt.includes("how many")) {
            const totalAttendees = events.reduce((sum, e) => sum + e.attendeeList.length, 0);
            const totalExhibitors = events.reduce((sum, e) => sum + e.exhibitorList.length, 0);
            const totalBooths = events.reduce((sum, e) => sum + e.booths, 0);
            
            response = `📊 **Platform Statistics**:
- **Events**: ${events.length} total events
- **Registered Attendees**: ${totalAttendees}
- **Active Exhibitors**: ${totalExhibitors}
- **Available Booths**: ${totalBooths}
- **Feedback Received**: ${feedback.length} reviews

Our platform is growing! ${events.filter(e => new Date(e.date) > new Date()).length} upcoming events are scheduled.`;
        }

        // 1️⃣ Find events by month (existing logic)
        const month = getMonthFromPrompt(lowerPrompt);
        if (month !== null && !response) {
            const monthEvents = events.filter(e => new Date(e.date).getMonth() === month);
            response = monthEvents.length > 0
                ? `📅 Events in ${Object.keys(monthMap)[month]}:\n` + 
                  monthEvents.map(e => `- **${e.title}** (${e.location}, ${new Date(e.date).toDateString()})`).join("\n")
                : "No events found for that month.";
        }

        // 2️⃣ Next week events (existing logic)
        if (lowerPrompt.includes("next week") && !response) {
            const now = new Date();
            const weekLater = new Date();
            weekLater.setDate(now.getDate() + 7);

            const weekEvents = events.filter(e => {
                const date = new Date(e.date);
                return date >= now && date <= weekLater;
            });

            response = weekEvents.length > 0
                ? `📅 Events in the next week:\n` + 
                  weekEvents.map(e => `- **${e.title}** on ${new Date(e.date).toDateString()} at ${e.location}`).join("\n")
                : "No events scheduled for next week.";
        }

        // 3️⃣ Upcoming events
        if (lowerPrompt.includes("upcoming") || lowerPrompt.includes("future")) {
            const now = new Date();
            const upcomingEvents = events.filter(e => new Date(e.date) > now)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5); // Show next 5 events

            response = upcomingEvents.length > 0
                ? `🔜 **Upcoming Events**:\n` + 
                  upcomingEvents.map(e => `- **${e.title}** on ${new Date(e.date).toDateString()} at ${e.location}`).join("\n")
                : "No upcoming events scheduled.";
        }

        // 4️⃣ Specific event details (enhanced existing logic)
        if (!response) {
            const promptNorm = normalize(prompt);
            const promptWords = promptNorm.split(" ");

            // Find matching events
            let matchedEvents = events.filter(e => {
                const titleNorm = normalize(e.title);
                return promptNorm.includes(titleNorm) || titleNorm.includes(promptNorm);
            });

            if (matchedEvents.length === 0) {
                matchedEvents = events.filter(e => {
                    const titleWords = normalize(e.title).split(" ");
                    return promptWords.some(w => titleWords.includes(w));
                });
            }

            if (matchedEvents.length > 0) {
                let responses = [];

                for (let matchedEvent of matchedEvents) {
                    let eventInfo = [`📍 **${matchedEvent.title}**`];

                    // Specific information requests
                    if (lowerPrompt.includes("host") || lowerPrompt.includes("speaker")) {
                        eventInfo.push(`🎤 **Speaker**: ${matchedEvent.speaker || "TBD"}`);
                    }

                    if (lowerPrompt.includes("time")) {
                        eventInfo.push(`⏰ **Time**: ${matchedEvent.time || "TBD"} on ${new Date(matchedEvent.date).toDateString()}`);
                    }

                    if (lowerPrompt.includes("date")) {
                        eventInfo.push(`📅 **Date**: ${new Date(matchedEvent.date).toDateString()}`);
                    }

                    if (lowerPrompt.includes("location")) {
                        eventInfo.push(`📍 **Location**: ${matchedEvent.location}`);
                    }

                    if (lowerPrompt.includes("description")) {
                        eventInfo.push(`📋 **Description**: ${matchedEvent.description || "No description available"}`);
                    }

                    if (lowerPrompt.includes("theme")) {
                        eventInfo.push(`🎨 **Theme**: ${matchedEvent.theme}`);
                    }

                    if (lowerPrompt.includes("booth")) {
                        const allocatedBooths = matchedEvent.exhibitorList.filter(ex => ex.allocatedBooth).length;
                        const availableBooths = matchedEvent.booths - allocatedBooths;
                        eventInfo.push(`🏢 **Booths**: ${availableBooths}/${matchedEvent.booths} available`);
                    }

                    if (lowerPrompt.includes("exhibitor")) {
                        eventInfo.push(
                            matchedEvent.exhibitorList.length > 0 
                                ? `🏢 **Exhibitors** (${matchedEvent.exhibitorList.length}):\n` 
                                  + matchedEvent.exhibitorList.map(ex => `   • ${ex.companyName} - ${ex.productsServices}`).join("\n")
                                : `🏢 **Exhibitors**: None registered yet`
                        );
                    }

                    if (lowerPrompt.includes("attendee")) {
                        eventInfo.push(`👥 **Attendees**: ${matchedEvent.attendeeList.length} registered`);
                    }

                    // If no specific info requested, show general event details
                    if (eventInfo.length === 1) {
                        eventInfo.push(
                            `📅 **Date**: ${new Date(matchedEvent.date).toDateString()}`,
                            `📍 **Location**: ${matchedEvent.location}`,
                            `🎤 **Speaker**: ${matchedEvent.speaker || "TBD"}`,
                            `⏰ **Time**: ${matchedEvent.time || "TBD"}`,
                            `🎨 **Theme**: ${matchedEvent.theme}`,
                            `👥 **Attendees**: ${matchedEvent.attendeeList.length} registered`,
                            `🏢 **Exhibitors**: ${matchedEvent.exhibitorList.length} registered`
                        );
                    }

                    responses.push(eventInfo.join("\n"));
                }

                response = responses.join("\n\n");
            }
        }

        // 5️⃣ Platform guidance for unrelated queries
        if (!response) {
            if (isPlatformRelated(prompt)) {
                // Use Gemini but with context about the platform
                const contextualPrompt = `${SYSTEM_PROMPT}

Current platform data:
- Total events: ${events.length}
- Total registered attendees: ${events.reduce((sum, e) => sum + e.attendeeList.length, 0)}
- Total exhibitors: ${events.reduce((sum, e) => sum + e.exhibitorList.length, 0)}

User question: ${prompt}

Provide a helpful response focusing on our expo management platform features and current data.`;

                const result = await model.generateContent(contextualPrompt);
                response = result.response.text();
            } else {
                // Redirect non-platform queries
                response = `I'm here to help you with our Expo Management Platform! I can assist you with:

🔹 **Finding Events**: Search by month, location, or theme
🔹 **Event Details**: Get information about speakers, dates, locations, and booths
🔹 **Registration**: Learn about attendee and exhibitor registration
🔹 **Platform Features**: Bookmarking, messaging, feedback system
🔹 **Statistics**: Current platform usage and event data

Currently, we have ${events.length} events available. Would you like to know more about any of these features or explore our upcoming events?`;
            }
        }

        return res.json({ response });

    } catch (error) {
        console.error('❌ Chatbot error:', error.message);
        return res.status(500).json({ 
            error: 'I encountered an issue. Please try asking about our expo events or platform features!' 
        });
    }
});

// Helper function to check platform relevance
// function isPlatformRelated(prompt) {
//     const platformKeywords = [
//         'event', 'expo', 'exhibition', 'booth', 'exhibitor', 'attendee',
//         'registration', 'bookmark', 'feedback', 'message', 'profile',
//         'organize', 'speaker', 'location', 'date', 'time', 'theme',
//         'company', 'product', 'service', 'upload', 'document',
//         'platform', 'website', 'app', 'system', 'feature', 'login',
//         'register', 'create', 'manage', 'search', 'filter'
//     ];
    
//     const lower = prompt.toLowerCase();
//     return platformKeywords.some(keyword => lower.includes(keyword));
// }

module.exports = router;