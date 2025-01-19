const axios = require('axios');

const consumeAPI = async (apiURL) => {
    try {
        const response = await axios.get(`${apiURL}/users?format=json`);
        console.log('Users:', response.data);
        return response.data; // Return the fetched users
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error; // Rethrow the error for further handling
    }
};

module.exports = consumeAPI;
