document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('onboarding-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const progressBar = document.getElementById('progress');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    let currentStep = 0;

    // Update progress bar
    function updateProgress() {
        const progress = (currentStep / (steps.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        
        progressSteps.forEach((step, idx) => {
            if (idx <= currentStep) {
                step.classList.add('active');
                if (idx < currentStep) {
                    step.classList.add('complete');
                } else {
                    step.classList.remove('complete');
                }
            } else {
                step.classList.remove('active', 'complete');
            }
        });
    }

    // Show current step
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        updateProgress();
    }

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                if (currentStep < steps.length) {
                    showStep(currentStep);
                }
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            if (currentStep >= 0) {
                showStep(currentStep);
            }
        });
    });

    // Validate current step
    function validateStep(stepIndex) {
        const currentStepElement = steps[stepIndex];
        
        switch(stepIndex) {
            case 1: // Learning Goals
                const goalSelected = currentStepElement.querySelector('input[name="goal"]:checked');
                if (!goalSelected) {
                    alert('Please select your learning goal');
                    return false;
                }
                break;
            
            case 3: // Topics
                const topicsSelected = currentStepElement.querySelectorAll('input[name="topics"]:checked');
                if (topicsSelected.length === 0) {
                    alert('Please select at least one topic');
                    return false;
                }
                break;
        }
        
        return true;
    }

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
            return;
        }

        // Get user_id from localStorage (set during login)
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            alert('Please log in first');
            window.location.href = 'signin.html';
            return;
        }

        // Collect form data
        const formData = {
            user_id: user_id,
            goal: document.querySelector('input[name="goal"]:checked')?.value,
            experienceLevel: document.getElementById('experience-level').value,
            topics: Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(cb => cb.value)
        };

        try {
            // Send data to backend
            const response = await fetch('save_preferences.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Store preferences in localStorage for immediate use
                localStorage.setItem('userPreferences', JSON.stringify(formData));

                // Create success message
                const message = `Welcome to your learning journey! We've created a personalized path for ${formData.topics.join(', ')} at ${formData.goal} level.`;
                localStorage.setItem('successMessage', message);

                // Redirect to the landing page with success parameter
                window.location.href = 'index.html?onboarding=success';
            } else {
                alert('Failed to save preferences: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save preferences. Please try again.');
        }
    });

    // Initialize
    showStep(currentStep);
});
