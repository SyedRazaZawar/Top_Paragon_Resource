let users = JSON.parse(localStorage.getItem('users')) || [];
let broadcasts = JSON.parse(localStorage.getItem('broadcasts')) || [];

// User session
let currentUser = null;

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    currentUser = user;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    loadBroadcasts();
  } else {
    alert('Invalid credentials!');
  }
});

// Forgot Password functionality
document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('forgotPasswordPage').style.display = 'block';
});

// Reset password
document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('forgotEmail').value;

  const user = users.find(user => user.email === email);

  if (user) {
    // Simulate password reset (you can replace this with actual logic)
    user.password = "newPassword"; // Set new password
    localStorage.setItem('users', JSON.stringify(users)); // Save updated users list
    alert('Your password has been reset! You can now login with the new password.');
    
    // Redirect to login page
    document.getElementById('forgotPasswordPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
  } else {
    alert('No account found with that email address.');
  }
});

// Sign Up functionality
document.getElementById('signUpLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('signUpPage').style.display = 'block';
});

// Sign Up form submission
document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;

  const userExists = users.some(user => user.email === email);
  
  if (userExists) {
    alert('Email is already registered!');
  } else {
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign Up successful! You can now login.');
    
    // Redirect to login page
    document.getElementById('signUpPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
  }
});

// Back to login page from sign up page
document.getElementById('backToLoginLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('signUpPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
});

// Post Broadcast functionality
document.getElementById('postBtn').addEventListener('click', function() {
  document.getElementById('postPage').style.display = 'block';
  document.getElementById('mainPage').style.display = 'none';
});

document.getElementById('backBtn').addEventListener('click', function() {
  document.getElementById('postPage').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
});

document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const category = document.getElementById('category').value;
  const partNumber = document.getElementById('partNumber').value;
  const condition = document.getElementById('condition').value;

  const broadcast = { category, partNumber, condition, user: currentUser.email };
  broadcasts.push(broadcast);
  localStorage.setItem('broadcasts', JSON.stringify(broadcasts));

  alert('Broadcast posted!');
  document.getElementById('postPage').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
  loadBroadcasts();
});

// Remove Broadcast functionality
document.getElementById('removeBtn').addEventListener('click', function() {
  document.getElementById('removePage').style.display = 'block';
  document.getElementById('mainPage').style.display = 'none';
});

document.getElementById('backRemoveBtn').addEventListener('click', function() {
  document.getElementById('removePage').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
});

document.getElementById('removeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const category = document.getElementById('removeCategory').value;
  const partNumber = document.getElementById('removePartNumber').value;

  broadcasts = broadcasts.filter(broadcast => broadcast.category !== category || broadcast.partNumber !== partNumber);
  localStorage.setItem('broadcasts', JSON.stringify(broadcasts));

  alert('Broadcast removed!');
  document.getElementById('removePage').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
  loadBroadcasts();
});

// Display all broadcasts
function loadBroadcasts() {
  const broadcastList = document.getElementById('broadcastList');
  broadcastList.innerHTML = '';
  
  broadcasts.forEach(broadcast => {
    const broadcastItem = document.createElement('div');
    broadcastItem.classList.add('broadcastItem');
    broadcastItem.innerHTML = `
      <p><strong>${broadcast.category}</strong>: ${broadcast.partNumber} (Condition: ${broadcast.condition})</p>
      <button onclick="emailUser('${broadcast.user}')">Email User</button>
    `;
    broadcastList.appendChild(broadcastItem);
  });
}

// Filter broadcasts by category
document.getElementById('filterBtn').addEventListener('click', function() {
  const category = prompt('Enter category to filter (WTB, WTS, RFQ, or ALL):');
  
  let filteredBroadcasts = broadcasts;
  
  if (category !== 'ALL') {
    filteredBroadcasts = broadcasts.filter(broadcast => broadcast.category === category);
  }

  const broadcastList = document.getElementById('broadcastList');
  broadcastList.innerHTML = '';

  filteredBroadcasts.forEach(broadcast => {
    const broadcastItem = document.createElement('div');
    broadcastItem.classList.add('broadcastItem');
    broadcastItem.innerHTML = `
      <p><strong>${broadcast.category}</strong>: ${broadcast.partNumber} (Condition: ${broadcast.condition})</p>
      <button onclick="emailUser('${broadcast.user}')">Email User</button>
    `;
    broadcastList.appendChild(broadcastItem);
  });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();

  const filteredBroadcasts = broadcasts.filter(broadcast => {
    return broadcast.partNumber.toLowerCase().includes(searchQuery);
  });

  displayFilteredBroadcasts(filteredBroadcasts);
});

// Display filtered broadcasts
function displayFilteredBroadcasts(filteredBroadcasts) {
  const broadcastList = document.getElementById('broadcastList');
  broadcastList.innerHTML = '';

  filteredBroadcasts.forEach(broadcast => {
    const broadcastItem = document.createElement('div');
    broadcastItem.classList.add('broadcastItem');
    broadcastItem.innerHTML = `
      <p><strong>${broadcast.category}</strong>: ${broadcast.partNumber} (Condition: ${broadcast.condition})</p>
      <button onclick="emailUser('${broadcast.user}')">Email User</button>
    `;
    broadcastList.appendChild(broadcastItem);
  });
}

// Email user functionality
function emailUser(user) {
  alert(`Emailing ${user}... (this is a placeholder)`);
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
  currentUser = null;
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
});