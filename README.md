### Deployment
   1. Clone the repository:
      ```bash
      git clone https://github.com/TylerGeiger513/CSC418-Project-2.git
      cd CSC418-Project-2
      ```
   2. Build and Start Using Docker Compose: Ensure Docker and Docker Compose are installed on your system, then run:
      ```bash
      docker-compose up --build
      ```   
   3. Open the application in your browser at `http://localhost:3000`.
   4. To stop the application use
      ```bash
      docker-compose down
      ```
### (New Demo with MongoDB Integrated)
https://github.com/user-attachments/assets/6648eb21-26cf-4443-8e4f-0d793fbd0e15

### Project 2 (Mongo DB Integration)
For project 2 we added MongoDB as a persistent data store, allowing creation and deletion of users to throughout server restarts.

#### Explanation

1. `docker-compose.yml`: exposes the ports:
   - MongoDB: ``27017``
   - Node/Express App: ``3000``
2. Mongoose defines the user schema as:
   ```js
   email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    }

4. When the 'create' or 'delete' user buttons are clicked - client side js in `usersLoader.js` or `formHandler.js` make their respective calls with the user data parameters:
```js
// formHandler.js - create
const response = await fetch('/api/users/create', {
   method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, state, city }),
});
```
```js
// usersLoader.js - delete
try {
      const response = await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }), 
      });
```
5. The server recieves the request and reads/writes to the database
```js
// usersRouter.js
   usersRouter.post('/create', async (req, res) => {
      const { email, name, state, city } = req.body;
      //... other logic
      const newUser = new User({ email, name, state, city });
       await newUser.save(); // save the user 
       res.status(201).json({ message: 'User created successfully', user: newUser });
```
