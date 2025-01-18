
const consumeAPI = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/users?format=json');
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        const users = await response.json();
        console.log('Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}


module.exports = consumeAPI;

