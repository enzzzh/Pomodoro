let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('start-stop');
const ThemeSwitcher = document.getElementById('switch-modes');

function updateTimeDisplay() {
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = "Start";
  } else {
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          alert("Pomodoro session complete! Take a break.");
          resetTimer();
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateTimeDisplay();
    }, 1000);
    startStopButton.textContent = "Stop";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  minutes = 25;
  seconds = 0;
  updateTimeDisplay();
  startStopButton.textContent = "Start";
  isRunning = false;
}

ThemeSwitcher.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  ThemeSwitcher.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

startStopButton.addEventListener('click', startStopTimer);
updateTimeDisplay();
