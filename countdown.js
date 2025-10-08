let countdownActive = true;
let testMode = false;

function updateCountdown() {
    if (!countdownActive) return;
    
    const now = new Date();
    // Set target date to October 28, 2025 at 00:00:00 (more reliable format)
    const targetDate = new Date(2025, 9, 28, 0, 0, 0); // Note: months are 0-indexed (9 = October)
    
    const timeLeft = targetDate - now;
    
    console.log('Now:', now);
    console.log('Target:', targetDate);
    console.log('Time left:', timeLeft);
    
    if (timeLeft <= 0 || testMode) {
        // Countdown finished - redirect to message page
        window.location.href = 'message.html';
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar
    const startDate = new Date(2024, 0, 1); // January 1, 2024 as reference
    const totalTime = targetDate - startDate;
    const timePassed = totalTime - timeLeft;
    const progressPercentage = Math.min((timePassed / totalTime) * 100, 100);
    document.getElementById('progressFill').style.width = progressPercentage + '%';
    
    // Continue countdown
    setTimeout(updateCountdown, 1000);
}

function startTestCountdown(seconds = 5) {
    countdownActive = false;
    testMode = true;
    
    let timeLeft = seconds;
    
    const testInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(testInterval);
            window.location.href = 'message.html';
            return;
        }
        
        // Update display with test countdown
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = timeLeft.toString().padStart(2, '0');
        
        // Update progress bar for test
        const progressPercentage = ((seconds - timeLeft) / seconds) * 100;
        document.getElementById('progressFill').style.width = progressPercentage + '%';
        document.getElementById('progressFill').style.background = '#e74c3c';
        
        timeLeft--;
    }, 1000);
}

// Start countdown when page loads
window.addEventListener('load', function() {
    // Check if user is verified
    const verifiedUser = sessionStorage.getItem('verifiedUser');
    if (!verifiedUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Check if admin and show test controls
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
        const testSection = document.getElementById('testSection');
        testSection.style.display = 'block';
        
        // Add event listeners for test buttons
        document.getElementById('testButton').addEventListener('click', function() {
            startTestCountdown(5);
        });
        
        document.getElementById('instantButton').addEventListener('click', function() {
            window.location.href = 'message.html';
        });
    }
    
    updateCountdown();
});