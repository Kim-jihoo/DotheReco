document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Perform your login logic here

        // Redirect to the main page after login
        window.location.href = 'main.html';
    });
});
