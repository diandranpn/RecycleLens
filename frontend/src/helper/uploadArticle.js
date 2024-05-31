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
const imagePath = path.resolve(__dirname, 'image1.jpg');
let base64Image;

try {
  base64Image = convertImageToBase64(imagePath);
} catch (error) {
  process.exit(1); // Exit the process if there's an error reading the file
}

// Prepare the article data
const articleData = {
  title: "Daur Ulang dan Kepedulian Lingkungan: Strategi untuk Masa Depan Berkelanjutan",
  image: base64Image,
  timeToRead: 10,
  creator: "Wafi Ajam",
  description: "Kepedulian terhadap lingkungan dan daur ulang merupakan dua strategi kunci dalam upaya mencapai masa depan yang berkelanjutan. Dengan meningkatnya ancaman dari perubahan iklim, polusi, dan kerusakan ekosistem, setiap individu memiliki peran penting dalam menjaga kelestarian bumi. Tindakan seperti mengurangi penggunaan plastik sekali pakai, mendaur ulang sampah, menghemat energi dan air, serta menanam pohon dapat memberikan dampak positif yang besar. Kesadaran dan edukasi lingkungan perlu ditingkatkan melalui kampanye dan program pendidikan agar masyarakat memahami pentingnya menjaga lingkungan. Pemerintah dan sektor swasta juga harus bekerja sama dalam menerapkan kebijakan dan praktik bisnis yang ramah lingkungan. Dengan upaya bersama dari semua pihak, kita dapat menciptakan dunia yang lebih hijau, sehat, dan berkelanjutan untuk generasi mendatang. "
};

// Function to create an article
async function createArticle() {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/article/create-article', articleData, {
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
