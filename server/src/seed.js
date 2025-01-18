const User = require('./models/userModel'); 

const defaultUsers = [
    { email: 'tyler@outlook.com', name: 'Tyler Geiger', state: 'PA', city: 'West Chester' },
    { email: 'janeDoe@example.com', name: 'Jane Doe', state: 'CA', city: 'Los Angeles' },
    { email: 'johnsmith@example.com', name: 'John Smith', state: 'TX', city: 'Houston' },
];

const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        console.log('Existing user data cleared.');

        await User.insertMany(defaultUsers);
        console.log('Sample user data inserted successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error; 
    }
};

module.exports = seedDatabase;
