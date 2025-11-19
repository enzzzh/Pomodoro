let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('start-stop');
const ThemeSwitcher = document.getElementById('switch-modes');
const EasterEgg = document.getElementById('clickme');

EasterEgg.addEventListener( ('click'), function(){
  alert ("This is an easter egg :) ");
});


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
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    ThemeSwitcher.textContent = ' ⏾ ';
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    ThemeSwitcher.textContent = ' ☆ ';
  }
});

startStopButton.addEventListener('click', startStopTimer);
updateTimeDisplay();

async function fetchPokemon() {
  const input = document.getElementById('pokemonName');
  const name = input ? input.value.trim().toLowerCase() : '';
  const img = document.getElementById('pokemonImage');
  const button = document.getElementById('fetchPokemon');
  if (!button) return;
  const originalText = button.textContent;

  if (!name) {
    alert('Please enter a Pokémon name');
    return;
  }

  try {
    button.disabled = true;
    button.textContent = 'Loading...';
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error('Pokémon not found');
    const data = await res.json();
    const sprite = data.sprites && (data.sprites.front_default || data.sprites.other?.['official-artwork']?.front_default);
    if (sprite) {
      img.src = sprite;
      img.alt = data.name;
      img.style.display = 'block';
      img.setAttribute('aria-hidden', 'false');
    } else {
      img.style.display = 'none';
      alert('No image available for this Pokémon');
    }
  } catch (err) {
    img.style.display = 'none';
    console.error(err);
    alert('Pokémon not found or network error');
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

const fetchBtn = document.getElementById('fetchPokemon');
if (fetchBtn) fetchBtn.addEventListener('click', fetchPokemon);

// allow Enter key to trigger fetch when focused on input
const pokemonInput = document.getElementById('pokemonName');
if (pokemonInput) {
  pokemonInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fetchPokemon();
  });
}
