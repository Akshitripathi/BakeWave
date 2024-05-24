document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (!isLoggedIn) {
            window.location.href = 'index.html'; // Ensure this points to your login page
            return;
        }

        if (userData) {
            document.getElementById('username').value = userData.username;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('address').value = userData.address || '';
        } else {
            alert('No user data found');
        }

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveProfile();
        });
    }

    function enableEdit() {
        document.querySelectorAll('#profileForm input').forEach(input => input.disabled = false);
        document.getElementById('editBtn').style.display = 'none';
        document.getElementById('saveBtn').style.display = 'inline-block';
        document.getElementById('cancelBtn').style.display = 'inline-block';
    }

    function cancelEdit() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            document.getElementById('username').value = userData.username;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('address').value = userData.address || '';
        }

        document.querySelectorAll('#profileForm input').forEach(input => input.disabled = true);
        document.getElementById('editBtn').style.display = 'inline-block';
        document.getElementById('saveBtn').style.display = 'none';
        document.getElementById('cancelBtn').style.display = 'none';
    }

    function saveProfile() {
        const updatedUserData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        alert('Profile updated successfully!');

        document.querySelectorAll('#profileForm input').forEach(input => input.disabled = true);
        document.getElementById('editBtn').style.display = 'inline-block';
        document.getElementById('saveBtn').style.display = 'none';
        document.getElementById('cancelBtn').style.display = 'none';
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        alert('Logged out successfully!');
        window.location.href = 'index.html'; // Ensure this points to your login page
    }

    // Expose functions to the global scope
    window.enableEdit = enableEdit;
    window.cancelEdit = cancelEdit;
    window.logout = logout;
});
