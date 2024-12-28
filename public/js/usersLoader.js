// Client-side script to fetch and display users from the server on the users page
document.addEventListener('contentLoaded', (event) => {
  const currentItem = event.detail?.currentItem;

  if (!currentItem || currentItem.id !== 'users') {
    return;
  }

  const usersContainer = document.getElementById('users-container');

  // Create user card
  const createUser = (user) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-card');
    userDiv.innerHTML = `
        <div class="user-card-image">
          <img src="./images/default_user.jpg" alt="User Placeholder" />
          <p class="user-card-name">${user.name}</p>
        </div>
        <div class="user-card-details">
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>State:</strong> ${user.state}</p>
          <p><strong>City:</strong> ${user.city}</p>
        </div>
      `;
    return userDiv;
  };

  // Fetch and display users
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();

      usersContainer.innerHTML = ''; // Clear existing content
      if (users.length === 0) {
        usersContainer.textContent = 'No users found.';
        return;
      }

      users.forEach((user) => {
        const userDiv = createUser(user);
        usersContainer.appendChild(userDiv);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      usersContainer.textContent = 'Failed to load users.';
    }
  };

  fetchUsers();
});
