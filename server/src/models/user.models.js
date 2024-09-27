import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId: { type: String, required: true }, // Clerk User ID
    bookmarks: [{ type: String }] // Store other user-related data
  });
  
const User = mongoose.model("User", userSchema);
export default User  

