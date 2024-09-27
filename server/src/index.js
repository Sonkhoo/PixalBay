import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path: "../.env"
})
const port = process.env.PORT || 3000
connectDB()
.then(() => {
    app.on('error', (error) => {
        console.log("Express cant connect with MongoDB");
        console.log(error)
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${port}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection errror");
    console.log(error)
})

//http://localhost:3000/api/v1/users