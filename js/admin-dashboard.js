document.addEventListener("DOMContentLoaded", function () {
    // Fetch the dashboard data from the PHP backend
    fetch('http://localhost/zyza-laundry-shop/php/dashboard-stats.php')
        .then(response => response.json())
        .then(data => {
            // Populate the dashboard with the fetched data
            document.getElementById("total-orders").textContent = data.totalOrders;
            document.getElementById("todays-orders").textContent = data.todaysOrders;
            document.getElementById("total-delivered").textContent = data.totalDelivered;
            document.getElementById("pending-orders").textContent = data.pendingOrders;
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
        });
});
