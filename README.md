## Project Documentation

### 1. Deployment
1. Clone the repository:
   ```bash
   git clone https://github.com/TylerGeiger513/CSC418-Project-2.git
   cd CSC418-Project-2
   ```
2. Build and Start Using Docker Compose: Ensure Docker and Docker Compose are installed on your system, then run:
   ```bash
   docker-compose up --build
   ```   
3. Open the client side application in your browser at `http://localhost:4200`.
4. To stop the application use:
   ```bash
   docker-compose down
   ```

### 2. Environment Variables
The global `.env` allows you to customize the port and host address instead of the default 4200 for client and 3000 for server. Additionally allows you to modify the database connection details without modifying the rest of the source code. 
```.env
# Server Configuration
SERVER_HOST=http://localhost
SERVER_PORT=3000

# Client Configuration
CLIENT_PORT=4200
API_URL=${SERVER_HOST}:${SERVER_PORT}/api
API_INTERNAL_URL=http://server:${SERVER_PORT}/api

# MongoDB Configuration
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DB=project3

MONGO_URL=mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}
```
### 3. Server/Client separation (Project 3, Server acts as RestAPI)

#### ./Server/

- The server provides only the `/api` routes at `https://localhost:3000`
- **Endpoints**:
  - **GET** `/api/users?format=json`: Fetch all users in JSON format.
  - **POST** `/api/users/create`: Create a new user.
  - **POST** `/api/users/delete`: Delete a user by email or ID.
  - **GET** `/api/locations/states`: Fetch all states.
  - **GET** `/api/locations/cities?stateCode=STATE_CODE`: Fetch cities by state code.
  - **GET** `/api/health`: Health check endpoint.
 
    Example: `http://localhost:3000/api/users?format=json`
    returns
![image](https://github.com/user-attachments/assets/2d0c1bb5-ad64-4fcb-ab12-8677e41052f0)


### ./Client/

- The client runs on https://localhost:4200 and consumes the server's api for data and functionality. 
The client handles the front end, with only the default endpoint `https://localhost:4200/` which returns the index page ejs `/client/src/views/layout.ejs` 

![image](https://github.com/user-attachments/assets/1e3a043c-e2af-4639-bca6-816d9ce170e3)

Unlike in the previous submissions, the database cannot be accessed through the client connection as seen when calling localhost:4200/users
![image](https://github.com/user-attachments/assets/2e4fac93-f0cc-4415-9e98-a4e7c0c30f8c)

Instead, client calls the server's API on port 3000 to dynamically load the content on the page, similar to the previous submission however now using the server's new endpoint. 
Example: `/client/public/js/usersLoader.js`
```js
const fetchUsers = async () => {
    const apiURL = window.env.API_URL; // (https://localhost:3000/api)
    try {
      const response = await fetch(`${apiURL}/users?format=json`);
      // ...
      const users = await response.json();
      // logic to render response users on page
    } catch (error) {
      // error handling..
    }
  };
  ```



https://github.com/user-attachments/assets/fa9d3287-edbb-46cf-88e1-102e56dbbe4b



