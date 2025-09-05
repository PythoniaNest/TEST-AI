// Profile Information State
let profileData = {
    name: 'Alex Johnson',
    title: 'Computer Science Student',
    email: 'alex.johnson@email.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
};

// Handle avatar edit
document.querySelector('.edit-avatar').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('.avatar-img').src = event.target.result;
                profileData.avatarUrl = event.target.result;
                // Here you would typically upload the image to a server
                saveProfileData();
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

// Handle profile edit
document.querySelector('.edit-profile-btn').addEventListener('click', function() {
    const profileInfo = document.querySelector('.profile-info');
    const currentName = profileInfo.querySelector('h1').textContent;
    const currentTitle = profileInfo.querySelector('.profile-title').textContent;
    const currentEmail = profileInfo.querySelector('.profile-email').textContent;

    // Create edit form
    profileInfo.innerHTML = `
        <form id="edit-profile-form">
            <input type="text" id="edit-name" value="${currentName}" class="edit-input">
            <input type="text" id="edit-title" value="${currentTitle}" class="edit-input">
            <input type="email" id="edit-email" value="${currentEmail}" class="edit-input">
            <div class="edit-buttons">
                <button type="submit" class="save-btn">Save</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
        </form>
    `;

    // Handle form submission
    document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        profileData.name = document.getElementById('edit-name').value;
        profileData.title = document.getElementById('edit-title').value;
        profileData.email = document.getElementById('edit-email').value;
        
        updateProfileDisplay();
        saveProfileData();
    });

    // Handle cancel
    document.querySelector('.cancel-btn').addEventListener('click', function() {
        updateProfileDisplay();
    });
});

// Update profile display
function updateProfileDisplay() {
    const profileInfo = document.querySelector('.profile-info');
    profileInfo.innerHTML = `
        <h1>${profileData.name}</h1>
        <p class="profile-title">${profileData.title}</p>
        <p class="profile-email">${profileData.email}</p>
        <button class="edit-profile-btn"><i class="fas fa-edit"></i> Edit Profile</button>
    `;
}

// Save profile data to localStorage
function saveProfileData() {
    localStorage.setItem('profileData', JSON.stringify(profileData));
}

// Load profile data from localStorage
function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        profileData = JSON.parse(savedData);
        updateProfileDisplay();
        document.querySelector('.avatar-img').src = profileData.avatarUrl;
    }
}

// Initialize profile
document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
});
