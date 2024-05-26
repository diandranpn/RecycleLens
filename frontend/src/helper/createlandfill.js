const axios = require('axios');

// Helper function to generate random coordinates around a central point
const generateRandomCoordinates = (longitude, latitude, offset) => {
  const randomOffset = () => (Math.random() - 0.5) * offset;
  return [longitude + randomOffset(), latitude + randomOffset()];
};

// Central coordinates and offset
const centralLongitude = 110.37279787479208;
const centralLatitude = -7.7654462773425825;
const offset = 0.01; // Adjust the offset as needed to vary the coordinates

// Sample data for landfills
const landfills = [
  {
    name: 'Landfill A',
    location: {
      type: 'Point',
      coordinates: generateRandomCoordinates(centralLongitude, centralLatitude, offset)
    },
    description: 'A large landfill near the specified location.',
    city: 'Central City'
  },
  {
    name: 'Landfill B',
    location: {
      type: 'Point',
      coordinates: generateRandomCoordinates(centralLongitude, centralLatitude, offset)
    },
    description: 'Another landfill near the specified location.',
    city: 'Central City'
  },
  {
    name: 'Landfill C',
    location: {
      type: 'Point',
      coordinates: generateRandomCoordinates(centralLongitude, centralLatitude, offset)
    },
    description: 'A third landfill near the specified location.',
    city: 'Central City'
  },
  // Add more landfill objects as needed
];

// Function to create a landfill
const createLandFill = async (landfill) => {
  try {
    const response = await axios.post('http://localhost:5001/landfill/create-landfill', landfill);
    console.log(`Created landfill: ${response.data.name}`);
  } catch (error) {
    console.error(`Error creating landfill: ${error.response ? error.response.data : error.message}`);
  }
};

// Function to create multiple landfills
const createMultipleLandFills = async () => {
  for (const landfill of landfills) {
    await createLandFill(landfill);
  }
};

// Run the script
createMultipleLandFills();
