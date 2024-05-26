const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Function to convert an image to a base64-encoded string
function convertImageToBase64(filePath) {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error.message);
    throw error;
  }
}

// Get the absolute path to the image file
const imagePath = path.resolve(__dirname, 'image.jpg');
let base64Image;

try {
  base64Image = convertImageToBase64(imagePath);
} catch (error) {
  process.exit(1); // Exit the process if there's an error reading the file
}

// Prepare the article data
const articleData = {
  title: "The Future of Recycling: Innovations and Challenges",
  image: base64Image,
  timeToRead: 10,
  creator: "John Doe",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt..."
};

// Function to create an article
async function createArticle() {
  try {
    const response = await axios.post('http://localhost:5001/article/create-article', articleData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Article created successfully:', response.data);
  } catch (error) {
    console.error('Error creating article:', error.response ? error.response.data : error.message);
  }
}

// Call the function to create an article
createArticle();
