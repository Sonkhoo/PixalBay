import { Router } from "express";
import { addUser } from "../controllers/user.controllers.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { addBookmarks, getBookmarks } from "../controllers/user.controllers.js";

const router = Router();

// Test route
router.route("/test").get((req, res) => {
    res.send("Test Route check");
});

// POST route for adding bookmarks
router.route('/bookmarks').post(
    ClerkExpressWithAuth(),
    async (req, res) => {
        console.log("Incoming request to add bookmark");
        
        try {
            const { imageId } = req.body;
            const { userId: clerkUserId } = req.auth;
            
            // Check if imageId is provided
            if (!imageId) {
                return res.status(400).send({ message: 'Image ID is required.' });
            }
            
            console.log("Adding bookmark for user:", clerkUserId, "Image ID:", imageId);
            
            // Add bookmark
            const user = await addBookmarks(clerkUserId, imageId);
            
            // Send updated bookmarks list
            res.status(200).send(user.bookmarks);
        } catch (error) {
            console.error("Error in adding bookmarks: ", error.message);
            res.status(500).send({ message: error.message });
        }
    }
);

// GET route for fetching bookmarks
router.route('/bookmarks').get(
    ClerkExpressWithAuth(),
    async (req, res) => {
        try {
            const { userId: clerkUserId } = req.auth;
            console.log("Fetching bookmarks for user:", clerkUserId);

            // Get bookmarks for the user
            const bookmarks = await getBookmarks(clerkUserId);
            console.log(bookmarks);
            res.status(200).send(bookmarks);
        } catch (error) {
            console.error("Error in fetching bookmarks: ", error.message);
            res.status(500).send({ message: error.message });
        }
    }
);

// Clerk webhook route
router.route("/clerk-webhook").post(async (req, res) => {
    const { object, id } = req.body;
    console.log("Clerk webhook triggered for object:", object, "ID:", id);
    
    if (object === "user") {
        await addUser(id); // Create a new user in MongoDB
    }
    res.sendStatus(200);
});

export default router;
