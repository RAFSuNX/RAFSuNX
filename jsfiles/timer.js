// Convert timer.js to a module
let startTime;

function initTimer() {
  // Check if the user has visited the website before
  if (localStorage.getItem('startTime') === null) {
    // If not, set the start time
    localStorage.setItem('startTime', Date.now());
  }
  startTime = parseInt(localStorage.getItem('startTime'));
  updateTimer();
  setInterval(updateTimer, 1);
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.textContent = elapsedTime;
  }
}

// Initialize timer when DOM is ready
document.addEventListener('DOMContentLoaded', initTimer);

export { initTimer };