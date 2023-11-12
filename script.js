document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  let currentPlayer = "player";
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
      const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);
      return shuffledImages;
  }

  function createBlocks(area, images) {
      for (let i = 0; i < images.length; i++) {
          const block = document.createElement("div");
          block.className = "block";
          const inner = document.createElement("div");
          inner.className = "inner";
          const img = document.createElement("img");
          inner.appendChild(img);
          block.appendChild(inner);
          area.appendChild(block);

          block.addEventListener("click", () => {
              if (currentPlayer === "player" && !block.classList.contains("active")) {
                  handleBlockClick(block);
              }
          });
      }
  }

  function handleBlockClick(clickedBlock) {
      clickedBlock.classList.add("active");

      if (!firstBlock) {
          firstBlock = clickedBlock;
      } else {
          secondBlock = clickedBlock;

          const firstImg = firstBlock.querySelector("img").src;
          const secondImg = secondBlock.querySelector("img").src;

          if (firstImg === secondImg) {
              pairsFound++;
              if (pairsFound === images.length / 2) {
                  displayWinMessage();
              }
          } else {
              setTimeout(() => {
                  firstBlock.classList.remove("active");
                  secondBlock.classList.remove("active");
              }, 1000);
          }

          currentPlayer = "player";
          firstBlock = null;
          secondBlock = null;
      }
  }

  function displayWinMessage() {
      alert("You Win!");
  }

  const shuffledImages = shuffleImages();
  createBlocks(gameArea, shuffledImages);
});
