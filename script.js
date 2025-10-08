// Valid names - replace with the actual name
const validNames = [
    "sarah johnson",
    "sarah",
    "sarah j",
    "sarah j."
];

// Admin account for testing
const adminName = "@paul";

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('nameInput');
    const inputName = nameInput.value.trim().toLowerCase();
    
    // Check if name is valid
    const isValid = validNames.some(validName => 
        inputName === validName.toLowerCase()
    );
    
    // Check if admin
    const isAdmin = inputName === adminName.toLowerCase();
    
    if (isValid || isAdmin) {
        // Store name and admin status in session storage
        sessionStorage.setItem('verifiedUser', nameInput.value.trim());
        sessionStorage.setItem('isAdmin', isAdmin.toString());
        
        // Redirect to countdown page
        window.location.href = 'countdown.html';
    } else {
        // Show error
        nameInput.classList.add('input-error');
        nameInput.value = '';
        nameInput.placeholder = 'Access denied - please try again';
        
        setTimeout(() => {
            nameInput.classList.remove('input-error');
            nameInput.placeholder = 'Type your complete name';
        }, 2000);
    }
});

// Focus on input when page loads
window.addEventListener('load', function() {
    document.getElementById('nameInput').focus();
});