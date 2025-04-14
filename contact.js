// js/contact.js
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission

    const form = event.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const statusDiv = document.getElementById('form-status');

    // Clear previous status and hide
    statusDiv.textContent = '';
    statusDiv.className = 'mt-4 text-center'; // Reset classList, keep margin/text-center if needed
    statusDiv.classList.remove('visible'); // Hide it

    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    };

    // Show sending status
    statusDiv.textContent = 'Sending...';
    statusDiv.classList.add('status-sending', 'visible'); // Use CSS class + make visible

    fetch('/api/contact', { // The backend endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
             // Try to parse error message from backend if available
             return response.json().then(err => {
                 throw new Error(err.message || `Server responded with status ${response.status}`);
             }).catch(() => {
                 // Fallback if no JSON error message
                 throw new Error(`Server responded with status ${response.status}`);
             });
        }
        return response.json(); // Parse JSON response body
    })
    .then(data => {
        console.log('Success:', data);
        statusDiv.textContent = 'Message sent successfully!';
        // Update classes for success style
        statusDiv.classList.remove('status-sending');
        statusDiv.classList.add('status-success', 'visible');
        form.reset(); // Clear the form fields

        // Optional: Hide success message after a few seconds
        // setTimeout(() => {
        //     statusDiv.classList.remove('visible');
        // }, 5000); // Hide after 5 seconds

    })
    .catch((error) => {
        console.error('Error:', error);
        statusDiv.textContent = `Error: ${error.message}. Please try again.`;
         // Update classes for error style
        statusDiv.classList.remove('status-sending');
        statusDiv.classList.add('status-error', 'visible');
    });
});