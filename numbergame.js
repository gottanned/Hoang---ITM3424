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
  document.getElementById("dragInstruction").textContent = "Drag to reset game";
}

window.onload = function () {
  secretNumber = getRandomIntInclusive(1, 100);
  console.log(secretNumber);
};

function checkGuess() {
  guess = document.getElementById("guessInput").value;
  let feedBack;
  let resultBackground;
  let inputField = document.getElementById("guessInput");
  let correctGuess = false;

  if (guess < 1 || guess > 100) {
    feedBack = "Please enter a number between 1 and 100";
    resultBackground = "#FFD700";
  } else if (guess == secretNumber) {
    feedBack =
      "Congratulations! You guessed the number! Refresh the page to play again!";
    correctGuess = true;
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

  document.getElementById("resetButton").style.display = "";

  if (correctGuess === false) {
    var audio = new Audio("http://soundbible.com/grab.php?id=1540&type=wav");
    audio.play();
    inputField.classList.add("shake-animation");

    setTimeout(function () {
      inputField.classList.remove("shake-animation");
    }, 1000);
  } else {
    var audio = new Audio(
      "https://www.myinstants.com/media/sounds/grindr-notification-sound.mp3"
    );
    audio.play();
  }

  let feedbackArea = document.querySelector("#feedbackArea");
  //feedbackArea.style.backgroundColor = resultBackground;
  if (feedbackArea.classList.contains("feedback-animation")) {
    feedbackArea.classList.remove("feedback-animation");
    void feedbackArea.offsetWidth; // Trigger reflow to restart the animation
  }
  feedbackArea.classList.add("feedback-animation");

  feedbackArea.textContent = feedBack;

  let li = document.createElement("li");
  li.textContent = "Attempt #" + noGuess + " - " + guess + " : " + feedBack;
  document.getElementById("guessList").appendChild(li);
}

const guessButton = document.getElementById("guessButton");
guessButton.addEventListener("click", checkGuess);
guessButton.addEventListener(
  "mouseover",
  function (e) {
    guessButton.style.borderColor = "black";

    setTimeout(function () {
      guessButton.style.borderColor = "#89CFF0";
    }, 500);
  },
  false
);
guessButton.addEventListener(
  "mouseout",
  function (e) {
    guessButton.style.borderColor = "white";

    setTimeout(function () {
      guessButton.style.borderColor = "#89CFF0";
    }, 500);
  },
  false
);

const guessInput = document.getElementById("guessInput");
guessInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

guessInput.addEventListener(
  "animationend",
  function () {
    guessInput.focus();
  },
  false
);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);
resetButton.addEventListener(
  "mouseover",
  function (e) {
    resetButton.style.borderColor = "white";

    setTimeout(function () {
      resetButton.style.borderColor = "#D22B2B";
    }, 500);
  },
  false
);
resetButton.addEventListener(
  "mouseout",
  function (e) {
    resetButton.style.borderColor = "black";

    setTimeout(function () {
      resetButton.style.borderColor = "#D22B2B";
    }, 500);
  },
  false
);

function dragstartHandler(e) {
  const dragInstruction = document.getElementById("dragInstruction");
  dragInstruction.textContent =
    "Drag the icon to the drop zone or release the mouse to dismiss";
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.dropEffect = "move";
}

window.addEventListener("DOMContentLoaded", () => {
  const draggedItem = document.getElementById("draggableIcon");
  draggedItem.addEventListener(
    "dragstart",
    (e) => {
      dragstartHandler(e);
    },
    false
  );
});

function dragoverHandler(e) {
  e.preventDefault();
  const dragInstruction = document.getElementById("dragInstruction");
  dragInstruction.textContent = "Release the mouse to drop the icon";
  e.dataTransfer.dropEffect = "move";
}

function dropHandler(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const dropZone = document.getElementById("droppableIcon");
  const draggedItem = document.getElementById(id);

  dragInstruction.textContent = "Icon dropped successfully! Reset game now ...";
  setTimeout(function () {
    resetGame();
  }, 500);
}

function dragendHandler(e) {
  const dragInstruction = document.getElementById("dragInstruction");
  dragInstruction.textContent = "Drag to reset game";
}
