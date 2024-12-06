document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-btn");
    const mainContent = document.getElementById("main-content");

    const loadContent = (url) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;

                // Dynamically load orders.js if orders.html is loaded
                if (url.includes('orders.html')) {
                    const script = document.createElement("script");
                    script.src = "../js/orders.js"; // Path to your orders.js file
                    script.onload = () => {
                        if (typeof initializeOrdersPage === "function") {
                            initializeOrdersPage(); // Call the initialization function after script loads
                        } else {
                            console.error("initializeOrdersPage is not defined in orders.js.");
                        }
                    };
                    document.body.appendChild(script); // Add the script to the body
                }
            })
            .catch(error => {
                console.error(`Error loading ${url}:`, error);
                mainContent.innerHTML = `<p>Error loading content. Please try again later.</p>`;
            });
    };

    // Load default content (Dashboard)
    loadContent("dashboard.html");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url");
            loadContent(url);
        });
    });
});
