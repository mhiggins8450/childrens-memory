document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  const pairingCount = document.getElementById("pairing-count");
  const resultMessage = document.getElementById("result-message");
  const player1Score = document.getElementById("player1");
  const player2Score = document.getElementById("player2");
  let currentPlayer = "player1";
  let firstBlock = null;
  let secondBlock = null;
  let player1Pairs = 0;
  let player2Pairs = 0;

  const images = [
    "images/elephant.jpg",
    "images/polarbear.jpg",
    "images/zebra.jpg",
    "images/horse.jpg",
    "images/giraffe.jpg",
    "images/kittens.jpg",
    "images/fox.jpg",
    "images/rabbit.jpg",
  ];

  function shuffleImages() {
    return [...images, ...images].sort(() => Math.random() - 0.5);
  }

  function createBlocks() {
    const shuffledImages = shuffleImages();

    gameArea.innerHTML = ""; // Clear the game area before creating new blocks

    shuffledImages.forEach((image, index) => {
      const block = document.createElement("div");
      block.className = "block";
      const inner = document.createElement("div");
      inner.className = "inner";
      const img = document.createElement("img");
      img.src = image;
      img.alt = "Card";
      inner.appendChild(img);
      block.appendChild(inner);
      gameArea.appendChild(block);

      block.addEventListener("click", () => handleBlockClick(block, index));
    });
  }

  function handleBlockClick(clickedBlock, index) {
    if (!clickedBlock.classList.contains("active") && firstBlock === null) {
      clickedBlock.classList.add("active");
      firstBlock = { block: clickedBlock, index };
    } else if (!clickedBlock.classList.contains("active") && secondBlock === null) {
      clickedBlock.classList.add("active");
      secondBlock = { block: clickedBlock, index };

      checkForPair();
    }
  }

  function checkForPair() {
    if (!firstBlock || !secondBlock) {
      return;
    }

    const firstImage = firstBlock.block.querySelector("img");
    const secondImage = secondBlock.block.querySelector("img");

    if (firstImage.src === secondImage.src) {
      // It's a pair
      if (currentPlayer === "player1") {
        player1Pairs++;
      } else {
        player2Pairs++;
      }
      firstBlock = null;
      secondBlock = null;

      // Check for win-state or tie-state
      if (player1Pairs + player2Pairs === 8) {
        if (player1Pairs > player2Pairs) {
          displayWinMessage("Player 1");
        } else if (player2Pairs > player1Pairs) {
          displayWinMessage("Player 2");
        } else {
          displayTieMessage();
        }
      } else {
        switchPlayer();
      }
    } else {
      // Not a pair
      setTimeout(() => {
        firstBlock.block.classList.remove("active");
        secondBlock.block.classList.remove("active");
        firstBlock = null;
        secondBlock = null;
        switchPlayer();
      }, 1000);
    }

    updatePairs();
  }

  function displayWinMessage(winner) {
    alert(`${winner} Wins!`);
    resetGame();
  }

  function displayTieMessage() {
    alert("It's a Tie!");
    resetGame();
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    updateActivePlayerIndicator();
  }

  function updateActivePlayerIndicator() {
    const player1Indicator = document.getElementById("player1");
    const player2Indicator = document.getElementById("player2");

    player1Indicator.classList.remove("active-player");
    player2Indicator.classList.remove("active-player");

    if (currentPlayer === "player1") {
        player1Indicator.classList.add("active-player");
    } else {
        player2Indicator.classList.add("active-player");
    }
}

  function updatePairs() {
    const player1Title = document.getElementById("player1");
    const player2Title = document.getElementById("player2");

    if (player1Title && player2Title) {
        player1Title.innerHTML = `Player 1 Pairs: ${player1Pairs}`;
        player2Title.innerHTML = `Player 2 Pairs: ${player2Pairs}`;
    }
}

  function resetGame() {
    player1Pairs = 0;
    player2Pairs = 0;
    currentPlayer = "player1";
    createBlocks();
  }

  createBlocks();
});
