document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  const resetButton = document.getElementById("reset-button");
  const easyButton = document.getElementById("easy-button");
  const hardButton = document.getElementById("hard-button");
  let currentPlayer = "player";
  let shuffled = false;
  let firstBlock = null;
  let secondBlock = null;
  let playerPairs = 0;
  let computerPairs = 0;
  const images = [
    "images/cheetah.jpg",
    "images/deer.jpg",
    "images/ducks.jpg",
    "images/elephant.jpg",
    "images/fox.jpg",
    "images/giraffe.jpg",
    "images/hedgehog.jpg",
    "images/kaola.jpg",
    "images/kittens.jpg",
    "images/lions.jpg",
    "images/meerkats.jpg",
    "images/owl.jpg",
  ];

  function shuffleUnpairedImages() {
    const unpairedImages = images.slice(0, images.length / 2);
    for (let i = unpairedImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unpairedImages[i], unpairedImages[j]] = [unpairedImages[j], unpairedImages[i]];
    }
    return [...unpairedImages, ...unpairedImages];
  }

  function easyButtonHandler() {
    if (!shuffled) {
      gameArea.innerHTML = "";
      createBlocks(gameArea, 24, true);
      shuffled = true;
    }
  }

  function hardButtonHandler() {
    if (!shuffled) {
      gameArea.innerHTML = "";
      createBlocks(gameArea, 24, true);
      shuffled = true;
    }
  }

  function resetButtonHandler() {
    gameArea.innerHTML = "";
    shuffled = false;
    currentPlayer = "player";
    playerPairs = 0;
    computerPairs = 0;
    updatePairs();
  }

  function createBlocks(area, numBlocks, shuffleAll) {
    const shuffledImages = shuffleAll ? shuffleImages(images) : shuffleUnpairedImages();
    const duplicatedBlocks = shuffleAll ? shuffledImages : shuffleUnpairedImages();
    const allImages = shuffleAll ? [...shuffledImages, ...duplicatedBlocks] : shuffledImages;

    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement("div");
      block.className = "block";
      const inner = document.createElement("div");
      inner.className = "inner";
      const img = document.createElement("img");
      img.src = allImages[i];
      img.alt = allImages[i].split("/").pop().split(".")[0];
      inner.appendChild(img);
      block.appendChild(inner);
      area.appendChild(block);

      block.addEventListener("click", () => {
        if (currentPlayer === "player") {
          handleBlockClick(block);
        }
      });
    }
  }

  function shuffleImages(imagesArray) {
    for (let i = imagesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]];
    }
    return [...imagesArray];
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

      if (firstBlock.querySelector("img").getAttribute("src") ===
        secondBlock.querySelector("img").getAttribute("src")) {
        if (firstBlock.dataset.player === "true") {
          playerPairs++;
        } else {
          computerPairs++;
          setTimeout(simulateComputerTurn, 1000);
        }

        firstBlock = null;
        secondBlock = null;

        if (playerPairs + computerPairs === 12) {
          displayResult();
        }

        updatePairs();
      } else {
        setTimeout(() => {
          firstBlock.classList.remove("active");
          secondBlock.classList.remove("active");
          firstBlock = null;
          secondBlock = null;
          currentPlayer = "computer";
          setTimeout(simulateComputerTurn, 1000);
        }, 1000);
      }
    }
  }

  function simulateComputerTurn() {
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

        activeBlocks.forEach((block) => block.classList.remove("active"));
      } else {
        setTimeout(() => {
          activeBlocks.forEach((block) => block.classList.remove("active"));
          currentPlayer = "player";
          updatePairs();
        }, 1000);
      }

      if (playerPairs + computerPairs === 12) {
        displayResult();
      }
    }, 1000);
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

    currentPlayer = "player";

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
      createBlocks(gameArea, 24, shuffled);
      currentPlayer = "player";
      playerPairs = 0;
      computerPairs = 0;
      updatePairs();
      message.remove();
      playAgainButton.remove();
    });
    gameArea.appendChild(playAgainButton);
  }

  easyButton.addEventListener("click", easyButtonHandler);
  hardButton.addEventListener("click", hardButtonHandler);
  resetButton.addEventListener("click", resetButtonHandler);

  // Initial setup for the game
  createBlocks(gameArea, 24, false);
});
