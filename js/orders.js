// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://localhost/zyza-laundry-shop/php/fetch-orders.php")
//         .then(response => response.json())
//         .then(data => {
//             const ordersContainer = document.getElementById("ordersContainer");

//             data.forEach(order => {
//                 // Create card container
//                 const card = document.createElement("div");
//                 card.className = "order-card";

//                 // Check if the delivered status is 1 (Delivered) or 0 (Not Delivered)
//                 const isDelivered = order.delivered == 1;

//                 // Create card content
//                 const content = `
//                     <div class="order-details">
//                         <p><strong>Name:</strong> ${order.recipient_name}</p>
//                         <p><strong>Phone:</strong> ${order.recipient_phone}</p>
//                         <p><strong>Address:</strong> ${order.recipient_address}</p>
//                         <p><strong>Order Created:</strong> ${order.date_created}</p>
//                         <p><strong>Order Info:</strong> ${order.order_information}</p>
//                     </div>
//                     <div class="order-status">
//                         <label>
//                             <input type="checkbox" ${isDelivered ? "checked disabled" : ""}>
//                             ${isDelivered ? "Delivered" : "Pending"}
//                         </label>
//                     </div>
//                 `;

//                 // Add content to card
//                 card.innerHTML = content;
//                 ordersContainer.appendChild(card);

//                 // Add event listener for checkbox (only if it's not disabled)
//                 if (!isDelivered) {
//                     const checkbox = card.querySelector("input[type='checkbox']");
//                     const statusText = card.querySelector(".order-status label");

//                     checkbox.addEventListener("change", () => {
//                         const updatedStatus = checkbox.checked ? "Delivered" : "Pending";

//                         // Update the status text
//                         statusText.textContent = `${updatedStatus}`;

//                         // Only update the order status if the checkbox is checked (i.e., order is delivered)
//                         if (checkbox.checked) {
//                             // Send updated status to server when checkbox is checked
//                             fetch("http://localhost/zyza-laundry-shop/php/update-order.php", {
//                                 method: "POST",
//                                 headers: { "Content-Type": "application/json" },
//                                 body: JSON.stringify({
//                                     id: order.id, 
//                                     delivered: 1 // Set to 1 to mark as delivered
//                                 })
//                             }).then(response => {
//                                 if (!response.ok) {
//                                     console.error("Failed to update order status");
//                                 } else {
//                                     console.log("Order status updated to delivered.");
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching orders:", error);
//         });

//         // Add event listener to the date picker
//         document.getElementById("datePicker").addEventListener("change", function(event) {
//             const selectedDate = event.target.value; // Get the selected date

//             if (selectedDate) {
//                 const filteredOrders = ordersData.filter(order => {
//                     // Get the date part of the date_created field (ignoring time)
//                     const orderDate = new Date(order.date_created).toISOString().split('T')[0];
//                     return orderDate === selectedDate; // Compare only the date part
//                 });

//                 displayOrders(filteredOrders); // Display filtered orders
//             } else {
//                 displayOrders(ordersData); // If no date is selected, show all orders
//             }
//         });
// });


document.addEventListener("DOMContentLoaded", function () {
    let ordersData = []; // Store the fetched orders here

    // Fetch orders from the server
    fetch("http://localhost/zyza-laundry-shop/php/fetch-orders.php")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            ordersData = data;
            displayOrders(ordersData);
        })
        .catch(error => {
            console.error("Error fetching orders:", error);
        });

    // Function to display orders dynamically
    function displayOrders(orders) {
        const ordersContainer = document.getElementById("ordersContainer");
        ordersContainer.innerHTML = '';

        orders.forEach(order => {
            const card = document.createElement("div");
            card.className = "order-card";

            const isDelivered = order.delivered == 1;

            const content = `
                <div class="order-details">
                    <p><strong>Name:</strong> ${order.recipient_name}</p>
                    <p><strong>Phone:</strong> ${order.recipient_phone}</p>
                    <p><strong>Address:</strong> ${order.recipient_address}</p>
                    <p><strong>Order Created:</strong> ${order.date_created}</p>
                    <p><strong>Service/s:</strong> ${order.services || "N/A"}</p>
                    <p><strong>Order Info:</strong> ${order.order_information}</p>
                </div>
                <div class="order-status">
                    <label>
                        <input type="checkbox" ${isDelivered ? "checked disabled" : ""}>
                        ${isDelivered ? "Delivered" : "Pending"}
                    </label>
                </div>
            `;

            card.innerHTML = content;
            ordersContainer.appendChild(card);

            if (!isDelivered) {
                const checkbox = card.querySelector("input[type='checkbox']");
                const statusText = card.querySelector(".order-status label");

                checkbox.addEventListener("change", () => {
                    const updatedStatus = checkbox.checked ? "Delivered" : "Pending";

                    statusText.textContent = `${updatedStatus}`;

                    if (checkbox.checked) {
                        fetch("http://localhost/zyza-laundry-shop/php/update-order.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                id: order.id,
                                delivered: 1
                            })
                        }).then(response => {
                            if (!response.ok) {
                                console.error("Failed to update order status");
                            } else {
                                console.log("Order status updated to delivered.");
                            }
                        });
                    }
                });
            }
        });
    }

    document.getElementById("datePicker").addEventListener("change", function (event) {
        const selectedDate = event.target.value;

        if (selectedDate) {
            const filteredOrders = ordersData.filter(order => {
                const orderDate = new Date(order.date_created).toISOString().split('T')[0];
                return orderDate === selectedDate;
            });

            displayOrders(filteredOrders);
        } else {
            displayOrders(ordersData);
        }
    });
});

// function initializeOrdersPage() {
//     let ordersData = []; // Store the fetched orders here

//     // Fetch orders from the server
//     fetch("http://localhost/zyza-laundry-shop/php/fetch-orders.php")
//         .then(response => response.json())
//         .then(data => {
//             ordersData = data;
//             displayOrders(ordersData);
//         })
//         .catch(error => {
//             console.error("Error fetching orders:", error);
//         });

//     function displayOrders(orders) {
//         const ordersContainer = document.getElementById("ordersContainer");
//         if (!ordersContainer) {
//             console.error("Orders container not found.");
//             return;
//         }
//         ordersContainer.innerHTML = '';

//         orders.forEach(order => {
//             const card = document.createElement("div");
//             card.className = "order-card";

//             const isDelivered = order.delivered == 1;

//             const content = `
//                 <div class="order-details">
//                     <p><strong>Name:</strong> ${order.recipient_name}</p>
//                     <p><strong>Phone:</strong> ${order.recipient_phone}</p>
//                     <p><strong>Address:</strong> ${order.recipient_address}</p>
//                     <p><strong>Order Created:</strong> ${order.date_created}</p>
//                     <p><strong>Order Info:</strong> ${order.order_information}</p>
//                 </div>
//                 <div class="order-status">
//                     <label>
//                         <input type="checkbox" ${isDelivered ? "checked disabled" : ""}>
//                         ${isDelivered ? "Delivered" : "Pending"}
//                     </label>
//                 </div>
//             `;

//             card.innerHTML = content;
//             ordersContainer.appendChild(card);

//             if (!isDelivered) {
//                 const checkbox = card.querySelector("input[type='checkbox']");
//                 const statusText = card.querySelector(".order-status label");

//                 checkbox.addEventListener("change", () => {
//                     const updatedStatus = checkbox.checked ? "Delivered" : "Pending";

//                     statusText.textContent = `${updatedStatus}`;

//                     if (checkbox.checked) {
//                         fetch("http://localhost/zyza-laundry-shop/php/update-order.php", {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                                 id: order.id,
//                                 delivered: 1
//                             })
//                         }).then(response => {
//                             if (!response.ok) {
//                                 console.error("Failed to update order status");
//                             } else {
//                                 console.log("Order status updated to delivered.");
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
// }
