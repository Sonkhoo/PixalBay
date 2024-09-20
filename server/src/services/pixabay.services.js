// const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// app.get('/api/images', async (req, res) => {
//   try {
//     const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=landscape&image_type=photo`);
//     res.json(response.data.hits);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching images' });
//   }
// });

import axios from 'axios';

const PIXABAY_API_KEY = process.env.API_KEY;
const getImages = async () => {
try {
        const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&image_type=photo`);
        //console.log("Images fetched from services:", response.data.hits);
        
        return response.data.hits;
} catch (error) {
        console.log("Error fetching images");
        console.error(error);
        process.exit(1);
}
};



const searchImages = async (query) => {
    try {
        console.log(query);
        
        const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo`);
        // console.log("Images fetched from services:", response.data.hits);
        
        return response.data.hits;
        } catch (error) {
        console.log("Error fetching images");
        console.error(error);
        process.exit(1);
}
}

export { getImages, searchImages };

