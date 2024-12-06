function checkCredentials() {
    // Get username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
  
    // Clear any previous error message
    errorMessage.textContent = "";
  
    // Check credentials
    if (username === "admin" && password === "024Admin") {
      // Redirect to admin.html if credentials are correct
      window.location.href = "admin.html";
      return false; // Prevent form submission
    } else {
      // Show error message if credentials are incorrect
      errorMessage.textContent = "Invalid username or password.";
      errorMessage.style.color = "red";
      return false; // Prevent form submission
    }
  }
  