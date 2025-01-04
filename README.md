### Deployment
   1. Clone the repository:
      ```bash
      > git clone https://github.com/TylerGeiger513/CSC418-Project-2.git
      ```
   2. Build and Start Using Docker Compose: Ensure Docker and Docker Compose are installed on your system, then run:
      ```bash
      > docker-compose up --build
      ```   
   3. Open the application in your browser at `http://localhost:3000`.
   4. To stop the application use
      ```bash
      > docker-compose down
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
   const userSchema = new Schema(
   {
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
    },
   },
  {
     timestamps: true,
   }
);```
3.
