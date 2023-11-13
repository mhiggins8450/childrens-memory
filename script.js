// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Get references to various elements in the HTML document
  const gameArea = document.querySelector(".game-area");
  const pairingCount = document.getElementById("pairing-count");
  const resultMessage = document.getElementById("result-message");
  const player1Score = document.getElementById("player1");
  const player2Score = document.getElementById("player2");

  // Initialize game variables
  let currentPlayer = "player1";
  let firstBlock = null;
  let secondBlock = null;
  let player1Pairs = 0;
  let player2Pairs = 0;

  // Array of image sources for the memory game
  const images = [
    "images/elephant.jpg",
    "images/polarbear.jpg",
    "images/zebra.jpg",
    "images/horse.jpg",
    "images/giraffe.jpg",
    "images/kittens.jpg",
    "images/fox.jpg",
    "images/rabbit.jpg",
    "images/sealion.jpg"
  ];

  // Function to shuffle the images for a random game layout
  function shuffleImages() {
    return [...images, ...images].sort(() => Math.random() - 0.5);
  }

  // Function to create the memory game blocks
  function createBlocks() {
    const shuffledImages = shuffleImages();

    // Clear the game area before creating new blocks
    gameArea.innerHTML = "";

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

      // Add a click event listener to each block
      block.addEventListener("click", () => handleBlockClick(block, index));
    });
  }

  // Function to handle a block click event
  function handleBlockClick(clickedBlock, index) {
    // Check if the clicked block is active and no blocks are currently selected
    if (!clickedBlock.classList.contains("active") && firstBlock === null) {
      clickedBlock.classList.add("active");
      firstBlock = { block: clickedBlock, index };
    } else if (!clickedBlock.classList.contains("active") && secondBlock === null) {
      clickedBlock.classList.add("active");
      secondBlock = { block: clickedBlock, index };

      // Check for a pair after the second block is selected
      checkForPair();
    }
  }

  // Function to check if the selected blocks form a pair
  function checkForPair() {
    // Check if both blocks are selected
    if (!firstBlock || !secondBlock) {
      return;
    }

    const firstImage = firstBlock.block.querySelector("img");
    const secondImage = secondBlock.block.querySelector("img");

    // Check if the images of the selected blocks are the same
    if (firstImage.src === secondImage.src) {
      // Increment the pair count for the current player
      if (currentPlayer === "player1") {
        player1Pairs++;
      } else {
        player2Pairs++;
      }

      // Clear the selected blocks
      firstBlock = null;
      secondBlock = null;

      // Check for win-state or tie-state
      if (player1Pairs + player2Pairs === 9) {
        if (player1Pairs > player2Pairs) {
          // Display a win message for Player 1
          displayWinMessage("Player 1");
        } else if (player2Pairs > player1Pairs) {
          // Display a win message for Player 2
          displayWinMessage("Player 2");
        } else {
          // Display a tie message
          displayTieMessage();
        }
      } else {
        // Switch to the next player's turn
        switchPlayer();
      }
    } else {
      // Not a pair, wait for a short duration before hiding the blocks
      setTimeout(() => {
        firstBlock.block.classList.remove("active");
        secondBlock.block.classList.remove("active");
        firstBlock = null;
        secondBlock = null;

        // Switch to the next player's turn
        switchPlayer();
      }, 1000);
    }

    // Update the display of pairs and the active player
    updatePairs();
  }

  // Function to display a win message
  function displayWinMessage(winner) {
    alert(`${winner} Wins!`);
    // Reset the game after displaying the message
    resetGame();
  }

  // Function to display a tie message
  function displayTieMessage() {
    alert("It's a Tie!");
    // Reset the game after displaying the message
    resetGame();
  }

  // Function to switch to the next player's turn
  function switchPlayer() {
    // Toggle between Player 1 and Player 2
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    // Update the active player indicator
    updateActivePlayerIndicator();
  }

  // Function to update the display of pairs for each player
  function updatePairs() {
    // Get references to the elements displaying player pairs
    const player1Title = document.getElementById("player1");
    const player2Title = document.getElementById("player2");

    // Update the text content with the current pair counts
    if (player1Title && player2Title) {
      player1Title.innerHTML = `Player 1 Pairs: ${player1Pairs}`;
      player2Title.innerHTML = `Player 2 Pairs: ${player2Pairs}`;
    }
  }

  // Function to update the active player indicator
  function updateActivePlayerIndicator() {
    const player1Indicator = document.getElementById("player1");
    const player2Indicator = document.getElementById("player2");

    // Remove the "active-player" class from both indicators
    player1Indicator.classList.remove("active-player");
    player2Indicator.classList.remove("active-player");

    // Add the "active-player" class to the indicator of the current player
    if (currentPlayer === "player1") {
      player1Indicator.classList.add("active-player");
    } else {
      player2Indicator.classList.add("active-player");
    }
  }

  // Function to reset the game state
  function resetGame() {
    // Reset pair counts, current player, and create new blocks
    player1Pairs = 0;
    player2Pairs = 0;
    currentPlayer = "player1";
    createBlocks();
  }

  // Initial creation of game blocks when the page is loaded
  createBlocks();
});
