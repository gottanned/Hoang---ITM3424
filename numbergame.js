let secretNumber;
let guess;
let noGuess = 0;

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function resetGame() {
  secretNumber = getRandomIntInclusive(1, 100);
  console.log(secretNumber);
  noGuess = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("feedbackArea").textContent = "";
  document.getElementById("feedbackArea").style.backgroundColor = "";
  document.getElementById("attemptedCounter").textContent = "";
  document.getElementById("guessList").innerHTML = "";
  document.getElementById("resetButton").style.display = "none";
}

window.onload = function () {
  secretNumber = getRandomIntInclusive(1, 100);
  console.log(secretNumber);
};

function checkGuess() {
  guess = document.getElementById("guessInput").value;
  console.log(guess);
  let feedBack;
  let resultBackground;

  if (guess < 1 || guess > 100) {
    feedBack = "Please enter a number between 1 and 100";
    resultBackground = "#FFD700";
  } else if (guess == secretNumber) {
    feedBack =
      "Congratulations! You guessed the number! Refresh the page to play again!";
    resultBackground = "#93C572";
  } else if (guess < secretNumber) {
    feedBack = "Too low! Try again!";
    resultBackground = "#6495ED";
  } else {
    feedBack = "Too high! Try again!";
    resultBackground = "#DE3163";
  }
  document.getElementById("attemptedCounter").textContent =
    "Attempted #" + ++noGuess;

  document.getElementById("resetButton").style.display = "block";

  document.getElementById("feedbackArea").textContent = feedBack;
  document.getElementById("feedbackArea").style.backgroundColor =
    resultBackground;

  let li = document.createElement("li");
  li.textContent = "Attempt #" + noGuess + " - " + guess + " : " + feedBack;
  document.getElementById("guessList").appendChild(li);
}

const guessButton = document.getElementById("guessButton");
guessButton.addEventListener("click", checkGuess);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);
