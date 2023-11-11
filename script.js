document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
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
      const duplicatedBlocks = shuffle(images.slice()); // duplicate the array
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

          block.addEventListener("click", () => handleBlockClick(block));
      }
  }

  function handleBlockClick(clickedBlock) {
      if (!clickedBlock || clickedBlock.classList.contains("active")) return;

      clickedBlock.classList.add("active");

      if (!firstBlock) {
          firstBlock = clickedBlock;
      } else {
          secondBlock = clickedBlock;

          const firstImage = firstBlock.querySelector("img").getAttribute("src");
          const secondImage = secondBlock.querySelector("img").getAttribute("src");

          if (firstImage === secondImage) {
              // Matched, leave the blocks turned over
              firstBlock = null;
              secondBlock = null;
          } else {
              // Not a match, turn the blocks back over after a short delay
              setTimeout(() => {
                  firstBlock.classList.remove("active");
                  secondBlock.classList.remove("active");
                  firstBlock = null;
                  secondBlock = null;
              }, 1000);
          }
      }
  }

  createBlocks(gameArea, 16);
});
