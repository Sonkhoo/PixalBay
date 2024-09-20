import { searchImages, getImages } from "../services/pixabay.services.js";
import { Router } from "express";

const router = Router();

// Route to get random or search images based on query parameter
router.get("/images", async (req, res) => {
    const { query } = req.query; // Extract the query parameter
    
    try {
        if (query) {
            // If query parameter exists, perform search
            const searchedImages = await searchImages(query);
            console.log("Searched images fetched:", searchedImages.length);
            res.send(searchedImages);
        } else {
            // If no query parameter, fetch random images
            const images = await getImages();
            console.log("Random images fetched:", images.length);
            res.send(images);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching images" });
    }
});

export default router;
