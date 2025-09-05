document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.signin-btn');

    // Show/hide password toggle
    const togglePassword = document.createElement('button');
    togglePassword.type = 'button';
    togglePassword.className = 'toggle-password';
    togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    passwordInput.parentElement.appendChild(togglePassword);

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Input validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        input.classList.add('error');
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }

    // Real-time validation
    emailInput.addEventListener('input', function() {
        clearError(this);
        if (this.value && !validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('input', function() {
        clearError(this);
    });

    let isSubmitting = false;

    signinForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('remember').checked;

        // Clear previous errors
        clearError(emailInput);
        clearError(passwordInput);

        // Validate inputs
        let hasError = false;
        if (!email) {
            showError(emailInput, 'Email is required');
            hasError = true;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            hasError = true;
        }

        if (!password) {
            showError(passwordInput, 'Password is required');
            hasError = true;
        }

        if (hasError) return;

        try {
            isSubmitting = true;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

            const response = await fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.status === 'success') {
                // Store user data
                localStorage.setItem('user_id', result.data.user.id);
                localStorage.setItem('username', result.data.user.username);
                if (rememberMe) {
                    localStorage.setItem('remember_me', 'true');
                }

                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful!';
                document.body.appendChild(successMessage);

                // Redirect after animation
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showError(passwordInput, result.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            showError(passwordInput, 'An error occurred. Please try again.');
        } finally {
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.innerHTML = 'SIGN IN';
        }
    });

    // Clear errors when switching input fields
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => clearError(input));
    });
});
