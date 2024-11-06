// Selector for displaying key information
const span = document.querySelector("#text");

// Set of non-playable keys
const nonPlayableKeys = new Set([
  "Tab", "Alt", "Escape", "Control", "CapsLock", "F1", "F2", "F3", "F4",
  "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Insert", "Pause",
  "ScrollLock", "Delete", "Home", "PageUp", "PageDown", "End", "ArrowUp",
  "ArrowDown", "ArrowRight", "ArrowLeft", "`", "~", "!", "@", "#", "$", "%",
  "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "{", "]", "}", "\\",
  "|", ";", ":", "'", '"', ",", "<", ".", ">", "/", "?"
]);

// State variables
let started = false;
let currentSound;

// Event listener for keydown events
window.addEventListener("keydown", startGame);

// Main function to handle key presses
function startGame(e) {
  const key = e.key;

  // Display non-playable key names
  if (nonPlayableKeys.has(key)) {
    span.innerHTML = key;
    if(key === "Control" && started) stopSound(currentSound);
  }
  // Handle playable keys
  else if (isPlayableKey(key)) {
    if (started) stopSound(currentSound); // Stop any existing sound
    currentSound = playSound(key); // Play sound for the current key
    started = true;
  }
}

// Helper function to check if a key is playable
function isPlayableKey(key) {
  return (
    ["Backspace", "Enter", "Shift", " "].includes(key) ||
    (key >= "0" && key <= "9") ||
    (key.toLowerCase() >= "a" && key.toLowerCase() <= "z")
  );
}

// Function to play a sound for a specific key
function playSound(key) {
  const sound = key === " " ? new Audio(`./songs/space.mp3`) : new Audio(`./songs/${key}.mp3`);
  sound.play();
  span.innerHTML = key === " " ? "Space" : key;
  return sound;
}

// Function to stop a sound if it's playing
function stopSound(sound) {
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}
