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
## How It Works
https://github.com/user-attachments/assets/de372e46-bc54-4b85-aa6b-4695134e15b1

### 1. Page Carousel
I wanted to do a little bit more than the basic navigation bar and URL-based page switching. For this project, I mocked the functionality of a page-based application by using a carousel to rotate between pages. However, to avoid the static rendering that comes without page reloads/url redirects, this project dynamically re-renders each page when the carousel rotates, allowing it to still fetch content dynamically while appearing as if there is no reload/navigation.

To do this, I separated the page rendering from carousel functionality. A client-side JavaScript file, `pageLoader.js`, manages the fetching and unloading of content dynamically. When the carousel rotates, it fetches the relevant page content from the server and replaces the current page's content:

```javascript
// pageLoader.js
const response = await fetch(`/pages/${pageId}`);
const html = await response.text();
contentDiv.innerHTML = html;
```

This happens after the previous page has been unloaded.

---

### 2. Client-Server Separation
The client and server are separated to handle their necessary functionalities

#### Server Responsibilities:
- **Endpoints:**
  - `(GET) /`: Returns the main layout or index page.
  - `(GET) /pages/:id`: Returns a specific page as EJS/HTML based on the `id`. For example:
    ```javascript
    // pageModel.js
    const pages = [
      { id: 'home', navTitle: 'Home', defaultLanding: true },
      { id: 'users', navTitle: 'Users', defaultLanding: false },
      { id: 'contacts', navTitle: 'Add Contacts', defaultLanding: false }
    ];
    ```
    - Where /pages/contacts would return:
  
   ```ejs
  <form id="user-form">
    <h2>Add User</h2>
    <label for="name">Name:</label>
    <input type="name" id="name" name="name" placeholder="Enter the user's name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter the user's email" required>

    <label for="state">State:</label>
    <select id="state" name="state" required>
        <option value="">Select a state</option>
    </select>

    <label for="city">City:</label>
    <select id="city" name="city" required disabled>
        <option value="">Select a city</option>
    </select>

    <button id="submit">Add User</button>
</form>
```

  - `(GET) /api/locations/states`: Returns a list of states using the [country-state-city-js](https://www.npmjs.com/package/country-state-city-js) package.
  - `(GET) /api/locations/cities`: Returns a list of cities for a specific state (e.g., `/api/locations/cities?stateCode=PA`).
  - `(POST) /api/users/create`: Accepts user data (`email`, `name`, `state`, `city`) and stores it on the server.
  - `(GET) /api/users`: Returns a list of all users in JSON format.

- **Server-Side Form Validation:** The server also handles form validation (kinda? - enough for the basic requirements of this demo project).


#### Client Responsibilities:
The client handles all UI-related logic, including:
- The carousel functionality and dynamic content loading.
- Forms, clocks, and other interactive elements.

I wanted to keep the server as light-weight as possible and handle the bulk of the UI logic, animations, etc... on the client side, and keep only the necessary endpoints on the servers end.  


