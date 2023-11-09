document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  let currentPlayer = "player";
  let shuffled = false;
  let firstBlock = null;
  let secondBlock = null;
  let playerPairs = 0;
  let computerPairs = 0;
  const images = [
      "images/deer.jpg",
      "images/fox.jpg",
      "images/giraffe.jpg",
      "images/hedgehog.jpg",
      "images/polarbear.jpg",
      "images/rabbit.jpg",
      "images/deer.jpg",
      "images/fox.jpg",
      "images/giraffe.jpg",
      "images/hedgehog.jpg",
      "images/polarbear.jpg",
      "images/rabbit.jpg",
  ];

  // Shuffle the images array
  for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
  }

  // Duplicate each image path to ensure they are used twice
  const duplicatedImagePaths = [...images, ...images];

  startButton.addEventListener("click", () => {
      if (!shuffled) {
          gameArea.innerHTML = "";
          createBlocks(gameArea, 24);
          shuffleBlocks(gameArea);
          shuffled = true;
      }
  });

  resetButton.addEventListener("click", () => {
      gameArea.innerHTML = "";
      shuffled = false;
      currentPlayer = "player";
      playerPairs = 0;
      computerPairs = 0;
      updatePairs();
  });

  function createBlocks(area, numBlocks) {
      for (let i = 0; i < numBlocks; i++) {
          const block = document.createElement("div");
          block.className = "block";
          const inner = document.createElement("div");
          inner.className = "inner";
          const img = document.createElement("img");
          img.src = images[i];
          img.alt = images[i].split("/").pop().split(".")[0];
          inner.appendChild(img);
          block.appendChild(inner);
          area.appendChild(block);

          // Add a click event listener to handle turns
          block.addEventListener("click", () => {
              if (currentPlayer === "player") {
                  // Allow player to flip blocks during their turn
                  handleBlockClick(block);
              }
          });
      }
  }

  function handleBlockClick(clickedBlock) {
      if (!clickedBlock) return;
      if (clickedBlock.classList.contains("active")) return;

      if (!firstBlock) {
          firstBlock = clickedBlock;
          firstBlock.classList.add("active");
      } else if (!secondBlock) {
          secondBlock = clickedBlock;
          secondBlock.classList.add("active");

          // Check for a match
          if (
              firstBlock.querySelector("img").getAttribute("src") ===
              secondBlock.querySelector("img").getAttribute("src")
          ) {
              // If it's a match, keep the blocks active
              if (firstBlock.dataset.player === "true") {
                  playerPairs++;
              } else {
                  computerPairs++;
              }

              firstBlock = null;
              secondBlock = null;

              // Check for game completion
              if (playerPairs + computerPairs === 12) {
                  displayResult();
              }

              updatePairs();
          } else {
              // If it's not a match, hide the images and switch to the computer's turn
              setTimeout(() => {
                  firstBlock.classList.remove("active");
                  secondBlock.classList.remove("active");
                  firstBlock = null;
                  secondBlock = null;
                  currentPlayer = "computer";
                  simulateComputerTurn();
              }, 1000);
          }
      }
  }

  function simulateComputerTurn() {
      setTimeout(() => {
          const hiddenBlocks = Array.from(
              gameArea.querySelectorAll(".block:not(.active)")
          );

          const selectedIndices = [];
          while (selectedIndices.length < 2) {
              const randomIndex = Math.floor(Math.random() * hiddenBlocks.length);
              if (!selectedIndices.includes(randomIndex)) {
                  selectedIndices.push(randomIndex);
              }
          }

          selectedIndices.forEach((index) => {
              const block = hiddenBlocks[index];
              block.classList.add("active");
          });

          setTimeout(() => {
              const activeBlocks = Array.from(
                  gameArea.querySelectorAll(".block.active")
              );

              if (
                  activeBlocks[0].querySelector("img").getAttribute("src") ===
                  activeBlocks[1].querySelector("img").getAttribute("src")
              ) {
                  if (activeBlocks[0].dataset.player === "true") {
                      playerPairs++;
                  } else {
                      computerPairs++;
                  }

                  // If it's a match, keep the blocks active
                  activeBlocks.forEach((block) => block.classList.remove("active"));
              } else {
                  // If it's not a match, hide the images and switch to the player's turn
                  setTimeout(() => {
                      activeBlocks.forEach((block) => block.classList.remove("active"));
                      currentPlayer = "player";
                      updatePairs();
                  }, 1000);
              }

              // Check for game completion
              if (playerPairs + computerPairs === 12) {
                  displayResult();
              }
          }, 1000);
      }, 2000);
  }

  function updatePairs() {
      const playerTitle = document.getElementById("player-title");
      const computerTitle = document.getElementById("computer-title");
      playerTitle.innerHTML = `Player Area<br>Pairs: ${playerPairs}`;
      computerTitle.innerHTML = `Computer Area<br>Pairs: ${computerPairs}`;
  }

  function displayResult() {
      let result = "";
      if (playerPairs > computerPairs) {
          result = "You Win!";
      } else if (computerPairs > playerPairs) {
          result = "The Computer Wins!";
      } else {
          result = "It's a Tie!";
      }

      const message = document.createElement("div");
      message.innerText = result;
      message.style.fontSize = "24px";
      message.style.fontWeight = "bold";
      message.style.marginTop = "20px";
      gameArea.appendChild(message);

      const playAgainButton = document.createElement("button");
      playAgainButton.innerText = "Play Again";
      playAgainButton.style.marginTop = "10px";
      playAgainButton.style.padding = "10px 20px";
      playAgainButton.style.backgroundColor = "#0074D9";
      playAgainButton.style.color = "#fff";
      playAgainButton.style.border = "none";
      playAgainButton.style.borderRadius = "5px";
      playAgainButton.style.cursor = "pointer";
      playAgainButton.style.fontSize = "16px";
      playAgainButton.addEventListener("click", () => {
          gameArea.innerHTML = "";
          createBlocks(gameArea, 24);
          shuffleBlocks(gameArea);
          shuffled = true;
          currentPlayer = "player";
          playerPairs = 0;
          computerPairs = 0;
          updatePairs();
          message.remove();
          playAgainButton.remove();
      });
      gameArea.appendChild(playAgainButton);
  }
});