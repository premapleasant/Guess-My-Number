"use strict";

const user1 = document.querySelectorAll(".user-1");
const user2 = document.querySelectorAll(".user-2");
const inputbox1 = document.querySelector(".input-1");
const inputbox2 = document.querySelector(".input-2");
const startButton = document.querySelector(".start");
let randomNumber;
let isLockedPlayer1 = false;
let isLockedPlayer2 = false;
let gameStarted = false;
user1.forEach((button) => {
  button.addEventListener("click", function () {
    if (!isLockedPlayer1) {
      const imgElement = button.querySelector("img");
      const imgSrc = imgElement.getAttribute("src");
      inputbox1.innerHTML = `<img src="${imgSrc}" class="choice" />`;
    }
  });
});
user2.forEach((button) => {
  button.addEventListener("click", function () {
    if (!isLockedPlayer2) {
      const imgElement = button.querySelector("img");
      const imgSrc = imgElement.getAttribute("src");
      inputbox2.innerHTML = `<img src="${imgSrc}" class="choice" />`;
    }
  });
});

function randomNum() {
  if (isLockedPlayer1 && isLockedPlayer2 && !gameStarted) {
    gameStarted = true; // Game starts
    randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log("Random Number: ", randomNumber);
    displayRandomNumber();
    checkGuesses();
    startButton.disabled = true;
  } else {
    alert("Both players need to lock their guesses before starting the game!");
  }
}
function displayRandomNumber() {
  const resultImage = document.getElementById("result-image");
  resultImage.innerHTML = `<img src="dice-${randomNumber}.png" class="choice" />`;
}
function checkGuesses() {
  const player1Guess = parseInt(
    inputbox1.querySelector("img").getAttribute("src").match(/\d+/)[0]
  );
  const player2Guess = parseInt(
    inputbox2.querySelector("img").getAttribute("src").match(/\d+/)[0]
  );

  if (player1Guess === randomNumber && player2Guess === randomNumber) {
    document.querySelector(".player1").textContent = "YOU WON...!🎉";
    document.querySelector(".player2").textContent = "YOU WON...!🎉";
    document.querySelector("#user-1-container").style.backgroundColor = "green";
    document.querySelector("#user-2-container").style.backgroundColor = "green";
  } else if (player1Guess === randomNumber) {
    document.querySelector(".player1").textContent = "YOU WON...! 🎉 ";
    document.querySelector("#user-1-container").style.backgroundColor = "green";
  } else if (player2Guess === randomNumber) {
    document.querySelector(".player2").textContent = "YOU WON...! 🎉";
    document.querySelector("#user-2-container").style.backgroundColor = "green";
  } else {
    document.querySelector(".player1").textContent = "YOU LOSS 💔";
    document.querySelector(".player2").textContent = "YOU LOSS 💔";
  }
}
function lockPlayer1() {
  if (!isLockedPlayer1) {
    isLockedPlayer1 = true;
    user1.forEach((button) => {
      button.disabled = true;
    });
    enableStartIfReady();
  }
}
function lockPlayer2() {
  if (!isLockedPlayer2) {
    isLockedPlayer2 = true;
    user2.forEach((button) => {
      button.disabled = true;
    });
    enableStartIfReady();
  }
}
function enableStartIfReady() {
  if (isLockedPlayer1 && isLockedPlayer2) {
    startButton.disabled = false;
  }
}
function reset() {
  isLockedPlayer1 = false;
  isLockedPlayer2 = false;
  gameStarted = false;
  document.querySelector(".player1").textContent = "Player 1 ";
  document.querySelector(".player2").textContent = "Player 2 ";
  document.querySelector("#user-1-container").style.backgroundColor =
    " #883850";
  document.querySelector("#user-2-container").style.backgroundColor =
    " #883850";
  inputbox1.innerHTML = `<img src="dice-0.png" class="choice" />`;
  inputbox2.innerHTML = `<img src="dice-0.png" class="choice" />`;
  document.getElementById(
    "result-image"
  ).innerHTML = `<img src="dice-0.png" class="choice" />`;

  user1.forEach((button) => {
    button.disabled = false;
  });

  user2.forEach((button) => {
    button.disabled = false;
  });

  startButton.disabled = true;
}
document
  .querySelector("#user-1-container .lock")
  .addEventListener("click", lockPlayer1);
document
  .querySelector("#user-2-container .lock")
  .addEventListener("click", lockPlayer2);
startButton.disabled = true;
