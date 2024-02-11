let secretNumber;
let guess;

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

window.onload = function () {
  secretNumber = getRandomIntInclusive(1, 100);
  console.log(secretNumber);
};

function checkGuess() {
  guess = document.getElementById("guessInput").value;
  console.log(guess);

  if (guess < 1 || guess > 100) {
    document.getElementById("feedbackArea").textContent =
      "Please enter a number between 1 and 100";
  } else if (guess == secretNumber) {
    document.getElementById("feedbackArea").textContent =
      "Congratulations! You guessed the number! Refresh the page to play again!";
  } else if (guess < secretNumber) {
    document.getElementById("feedbackArea").textContent = "Too low! Try again!";
  } else {
    document.getElementById("feedbackArea").textContent =
      "Too high! Try again!";
  }
}

const guessButton = document.getElementById("guessButton");
guessButton.addEventListener("click", checkGuess);
