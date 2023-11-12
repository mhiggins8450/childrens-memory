document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  let firstBlock = null;
  let secondBlock = null;
  let pairsFound = 0;

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
      pairsFound++;
      firstBlock = null;
      secondBlock = null;
  
      // Check for win-state
      if (pairsFound === 8) {
        displayWinMessage();
      }
    } else {
      // Not a pair
      setTimeout(() => {
        if (firstBlock) {
          firstBlock.block.classList.remove("active");
        }
        if (secondBlock) {
          secondBlock.block.classList.remove("active");
        }
        firstBlock = null;
        secondBlock = null;
      }, 1000);
    }
  }
 
  function displayWinMessage() {
    alert("You Win!");
  }

  createBlocks();
});
