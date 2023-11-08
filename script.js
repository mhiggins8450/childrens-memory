document.addEventListener("DOMContentLoaded", function () {
  const playerArea = document.getElementById("player-area");
  const computerArea = document.getElementById("computer-area");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  let shuffled = false;
  let firstBlock = null;
  let secondBlock = null;
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
      playerArea.innerHTML = "";
      computerArea.innerHTML = "";
      createBlocks(playerArea, 12);
      createBlocks(computerArea, 12);
      shuffleBlocks(playerArea);
      shuffleBlocks(computerArea);
      shuffled = true;
    }
  });

  resetButton.addEventListener("click", () => {
    playerArea.innerHTML = "";
    computerArea.innerHTML = "";
    shuffled = false;
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
    }
  }

  function shuffleBlocks(area) {
    const blocks = area.querySelectorAll(".block");
    blocks.forEach((block) => {
      block.style.order = Math.floor(Math.random() * blocks.length);
    });
  }

  playerArea.addEventListener("click", (event) => {
    const clickedBlock = event.target.closest(".block");
    if (!clickedBlock) return; // Ignore clicks on non-block elements
    if (clickedBlock.classList.contains("active")) return; // Ignore clicks on active blocks

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
        firstBlock = null;
        secondBlock = null;
      } else {
        // If it's not a match, hide the images
        setTimeout(() => {
          firstBlock.classList.remove("active");
          secondBlock.classList.remove("active");
          firstBlock = null;
          secondBlock = null;
        }, 1000);
      }
    }
  });
});