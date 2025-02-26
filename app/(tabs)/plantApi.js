import axios from 'axios';

const PLANT_ID_API_KEY = 'ZOOU9zKf0MyU0THT3SQDbPnQ0nDTVG0NRvh2PF8qd6PGCDmq4F'; // Your API key

export const identifyPlant = async (imageBase64) => {
  const url = 'https://api.plant.id/v2/identify';

  const data = {
    images: [imageBase64],  // Image in Base64 format
    organs: ["leaf"],  // Specify the organ type
    api_key: PLANT_ID_API_KEY
  };

  try {
    const response = await axios.post(url, data, { timeout: 10000 }); // 10s timeout

    if (response.data && response.data.suggestions?.length > 0) {
      return response.data;
    } else {
      return { suggestions: [{ plant_name: "No disease detected", probability: 0 }] }; // Default response
    }
  } catch (error) {
    console.error('Error identifying plant:', error?.response?.data || error.message);
    return { error: 'Failed to analyze the plant. Please try again.' };
  }
};