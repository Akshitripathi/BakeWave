document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.link .signup-link');
    const signInLink = document.querySelector('.link .signin-link');

    signUpLink.addEventListener('click', () => {
        wrapper.classList.add('animated-signin');
        wrapper.classList.remove('animated-signup');
    });

    signInLink.addEventListener('click', () => {
        wrapper.classList.add('animated-signup');
        wrapper.classList.remove('animated-signin');
    });

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = signupForm.username.value;
            const email = signupForm.email.value;
            const password = signupForm.password.value;
            const confirmPassword = signupForm.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const userData = { username, email, password };
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            alert('Sign up successful!');
            signupForm.reset();
            window.location.href = '../html/profile.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = loginForm.username.value;
            const password = loginForm.password.value;
            const storedUserData = JSON.parse(localStorage.getItem('userData'));

            if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = '../html/profile.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = '../html/index.html';
        });
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = '../html/profile.html';
    }
});
