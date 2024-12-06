let currentIndex = 0;

document.getElementById('orderForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = document.getElementById("orderForm");
    const formData = new FormData(form);

    // Collect selected services as a comma-separated string
    const selectedServices = Array.from(document.getElementById("service").selectedOptions)
                                    .map(option => option.value)
                                    .join(", ");

    // Add the selected services to the formData
    formData.append('service', selectedServices);

    fetch("http://localhost/zyza-laundry-shop/php/create-order.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert("Order is made: " + data);
        window.location.href = "index.php";
        form.reset();
    })
    .catch(error => {
        console.error("Error:", error); // Log any errors
    });
});


// document.getElementById("orderForm").addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const form = document.getElementById("orderForm");
//     const formData = new FormData(form);

//     const selectedService = document.getElementById("service").value;

//     if (!selectedService) {
//         alert("Please select a service before submitting.");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost/zyza-laundry-shop/php/create-order.php", {
//             method: "POST",
//             body: formData
//         });

//         const data = await response.text();
//         alert("Order is made: " + data);

//         window.location.href = "index.php";
//     } catch (error) {
//         console.error("Error:", error); // Log any errors
//         alert("An error occurred while creating the order.");
//     }
// });

function createOrder() {
    window.location.href = "create-order.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const services = [
        "Wash & Fold",
        "Dry Cleaning",
        "Ironing",
        "Pickup and Delivery"
    ];

    const serviceDropdown = document.getElementById("service");
    serviceDropdown.innerHTML = `<option value="">Select a service</option>`; // Add a default option

    services.forEach(service => {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = service;
        serviceDropdown.appendChild(option);
    });
});
