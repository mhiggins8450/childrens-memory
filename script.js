document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  const winMessage = document.querySelector(".win-message");
  const images = [
      "images/elephant.jpg",
      "images/polarbear.jpg",
      "images/zebra.jpg",
      "images/horse.jpg",
      "images/giraffe.jpg",
      "images/kittens.jpg",
      "images/fox.jpg",
      "images/rabbit.jpg"
  ];

  let firstBlock = null;
  let secondBlock = null;

  function shuffle(array) {
      const clonedArray = [...array];

      for (let index = clonedArray.length - 1; index > 0; index--) {
          const randomIndex = Math.floor(Math.random() * (index + 1));
          const original = clonedArray[index];

          clonedArray[index] = clonedArray[randomIndex];
          clonedArray[randomIndex] = original;
      }

      return clonedArray;
  }

  function createBlocks(area, numBlocks) {
      const shuffledImages = shuffle(images);
      const duplicatedBlocks = shuffledImages.slice();
      const allImages = [...shuffledImages, ...duplicatedBlocks];

      for (let i = 0; i < numBlocks; i++) {
          const block = document.createElement("div");
          block.className = "block";
          const inner = document.createElement("div");
          inner.className = "inner";
          const img = document.createElement("img");
          img.src = allImages[i] || "images/giraffe.jpg";
          img.alt = allImages[i] ? allImages[i].split("/").pop().split(".")[0] : "Alt Text";
          inner.appendChild(img);
          block.appendChild(inner);
          area.appendChild(block);

          block.addEventListener("click", () => {
              handleBlockClick(block);
          });
      }
  }

  function handleBlockClick(clickedBlock) {
      if (!clickedBlock || clickedBlock.classList.contains("active")) return;

      const clickedImage = clickedBlock.querySelector("img").getAttribute("src");

      if (!firstBlock) {
          firstBlock = clickedBlock;
          firstBlock.classList.add("active");
      } else if (!secondBlock) {
          secondBlock = clickedBlock;
          secondBlock.classList.add("active");

          const firstImage = firstBlock.querySelector("img").getAttribute("src");
          const secondImage = secondBlock.querySelector("img").getAttribute("src");

          if (firstImage === secondImage) {
              firstBlock = null;
              secondBlock = null;

              // Check for win-state
              if (document.querySelectorAll(".block:not(.active)").length === 0) {
                  displayWinMessage();
              }
          } else {
              setTimeout(() => {
                  firstBlock.classList.remove("active");
                  secondBlock.classList.remove("active");
                  firstBlock = null;
                  secondBlock = null;
              }, 1000);
          }
      }
  }

  function displayWinMessage() {
      if (winMessage) {
          winMessage.innerText = "You Win!";
          winMessage.style.display = "block";
      }
  }

  createBlocks(gameArea, 16);
});
