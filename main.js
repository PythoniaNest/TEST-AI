document.addEventListener('DOMContentLoaded', function() {
    // Check if we're returning from onboarding
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('onboarding') === 'success') {
        const successMessage = localStorage.getItem('successMessage');
        if (successMessage) {
            showSuccessMessage(successMessage);
            // Clear the message so it doesn't show again on refresh
            localStorage.removeItem('successMessage');
        }
    }

    // Function to show success message
    function showSuccessMessage(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
                <button class="close-btn"><i class="fas fa-times"></i></button>
            </div>
        `;

        // Add to document
        document.body.appendChild(successDiv);

        // Add close button functionality
        const closeBtn = successDiv.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            successDiv.remove();
        });

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 8000);
    }
});
