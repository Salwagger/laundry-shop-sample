document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from submitting the traditional way
        const formData = new FormData(form)
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Form submitted:', { username, password }); // Debug log

        // Send the data to signup.php using fetch
        try {
            const response = await fetch('http://localhost/zyza-laundry-shop/php/create-account.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send data as JSON
            });            

            // Get the response from signup.php
            const result = await response.text();
            console.log('Response from server:', result); // Debug log

            if (response.ok) {
                alert('Signup successful!');
                window.location.href = 'signin.html'; // Redirect to the sign-in page
            } else {
                alert('Error: ' + result); // Display error message from the server
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('There was an error processing your signup. Please try again later.');
        }
    });
});
