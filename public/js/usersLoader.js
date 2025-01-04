document.addEventListener('contentLoaded', (event) => {
  const currentItem = event.detail?.currentItem;

  if (!currentItem || currentItem.id !== 'users') {
    return;
  }

  const usersContainer = document.getElementById('users-container');

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
        <button class="user-delete-button" data-id="${user._id}">Delete</button>
      </div>
    `;
    return userDiv;
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const users = await response.json();
      console.log('Users:', users);

      usersContainer.innerHTML = '';

      if (!users.length) {
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

  const deleteUserOnServer = async (userId) => {
    try {
      const response = await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to delete user with ID ${userId}`
        );
      }
      console.log(`User with ID ${userId} deleted successfully on the server.`);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Could not delete the user from the server. Please try again.');
    }
  };

  usersContainer.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.user-delete-button');
    if (!deleteButton) return;

    const userCard = deleteButton.closest('.user-card');
    const userId = deleteButton.dataset.id;

    userCard.remove();

    deleteUserOnServer(userId);
  });

  fetchUsers();
});
