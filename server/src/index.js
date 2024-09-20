import app from './app.js'
import dotenv from 'dotenv'

dotenv.config({
    path: "../.env"
})
const port = process.env.PORT || 3000

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${port}`)
})

//http://localhost:3000/api/v1/users