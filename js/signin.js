document.getElementById('signin-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = document.getElementById('signin-form');
    const formData = new FormData(form);

    const errorMessage = document.getElementById('errorMessage');
    const button = document.querySelector('button');

    try {
        errorMessage.textContent = ''; // Clear any previous error messages
        button.disabled = true; // Disable the button while waiting for the response
    
        const response = await fetch('php/signin.php', {
            method: 'POST',
            body: formData
        });
    
        const data = await response.json();
    
        if (response.ok) {
            window.location.href = 'index.php';
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        errorMessage.textContent = 'Error during sign-in: ' + error.message;
    } finally {
        button.disabled = false; // Enable button again after request finishes
    }
});
