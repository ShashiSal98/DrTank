document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent redirect

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                messageDiv.textContent = "Your message has been sent. Thank you!";
                messageDiv.style.color = "green";
                form.reset(); // clear form
            } else {
                messageDiv.textContent = data.errors ? data.errors.map(e => e.message).join(", ") : "Message failed to send.";
                messageDiv.style.color = "red";
            }
        })
        .catch(error => {
            messageDiv.textContent = "An error occurred. Please try again.";
            messageDiv.style.color = "red";
            console.error(error);
        });
    });
});
