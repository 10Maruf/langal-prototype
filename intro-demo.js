// Demo script for testing intro animation
// You can add this to your browser console to test different features

// Function to trigger intro animation again
function showIntroAgain() {
  sessionStorage.removeItem('introShown');
  window.location.reload();
}

// Function to set custom intro duration
function setIntroDuration(seconds) {
  localStorage.setItem('introDuration', seconds * 1000);
  console.log(`Intro duration set to ${seconds} seconds`);
  showIntroAgain();
}

// Function to skip intro permanently (for development)
function skipIntroForever() {
  sessionStorage.setItem('introShown', 'true');
  localStorage.setItem('skipIntro', 'true');
  console.log('Intro will be skipped for this session');
}

// Console commands:
console.log('🎬 Intro Animation Demo Commands:');
console.log('showIntroAgain() - Show intro again');
console.log('setIntroDuration(5) - Set intro to 5 seconds');
console.log('skipIntroForever() - Skip intro permanently');

// Export functions to window for easy access
window.showIntroAgain = showIntroAgain;
window.setIntroDuration = setIntroDuration;
window.skipIntroForever = skipIntroForever;