import User from "../models/user.models.js";
import axios from "axios";

const addUser = async (clerkUserId) => {
    const existingUser = await User.findOne({ clerkUserId });
    console.log("Check/controllers/addUser:", clerkUserId);
    if (!existingUser) {
      const newUser = new User({ clerkUserId, bookmarks: [] });
      await newUser.save();
      return newUser;
    }
    return existingUser;
  };

export { addUser }

const addBookmarks = async (clerkUserId, imageId) => {
    const user = await User.findOne({ clerkUserId });
    const PIXABAY_API_KEY = process.env.API_KEY;

    if (!user) {
        throw new Error("User not found");
    }

    // Fetch image details from Pixabay API using imageId
    const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${imageId}`);
    const image = response.data.hits[0];

    if (!image) {
        throw new Error("Image not found");
    }

    // Check if the image is already bookmarked
    const isBookmarked = user.bookmarks.some(bookmark => bookmark.id === imageId);
    
    if (!isBookmarked) {
        // Push the full image data to the user's bookmarks
        user.bookmarks.push({
            id: image.id,
            pageURL: image.pageURL,
            type: image.type,
            tags: image.tags,
            previewURL: image.previewURL,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            user: image.user,
            userImageURL: image.userImageURL
        });

        // Save the user with updated bookmarks
        await user.save();
    }

    return user.bookmarks;
};


const getBookmarks = async (clerkUserId) => {
    const user = await User.findOne({ clerkUserId });
    if (user) {
        return user.bookmarks;
    }
    throw new Error("User not found");
};

export { addBookmarks, getBookmarks }