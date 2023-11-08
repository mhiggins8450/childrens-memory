// document.addEventListener("DOMContentLoaded", function () {
//   const blocks = document.querySelectorAll(".block");
//   let firstBlock = null;
//   let secondBlock = null;
//   let shuffled = false;

//   blocks.forEach((block) => {
//     block.addEventListener("click", () => {
//       if (!shuffled) {
//         return; // Prevent clicking on blocks before shuffling
//       }

//       if (!firstBlock) {
//         firstBlock = block;
//         firstBlock.classList.add("active");
//       } else if (!secondBlock) {
//         secondBlock = block;
//         secondBlock.classList.add("active");

//         // Check for a match
//         if (
//           firstBlock.querySelector("img").getAttribute("src") ===
//           secondBlock.querySelector("img").getAttribute("src")
//         ) {
//           // If it's a match, keep the blocks active
//           firstBlock = null;
//           secondBlock = null;
//         } else {
//           // If it's not a match, hide the images
//           setTimeout(() => {
//             firstBlock.classList.remove("active");
//             secondBlock.classList.remove("active");
//             firstBlock = null;
//             secondBlock = null;
//           }, 1000);
//         }
//       }
//     });
//   });

//   const startButton = document.getElementById("start-button");
//   startButton.addEventListener("click", () => {
//     // Shuffle the blocks/images
//     blocks.forEach((block) => {
//       block.classList.remove("active");
//     });
//     shuffleBlocks();
//     shuffled = true;
//   });

//   function shuffleBlocks() {
//     blocks.forEach((block) => {
//       block.style.order = Math.floor(Math.random() * blocks.length);
//     });
//   }
// });

//ADDING A RESET BUTTON BELOW

document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".block");
  let firstBlock = null;
  let secondBlock = null;

  const resetButton = document.getElementById("reset-button");
  const startButton = document.getElementById("start-button");

  resetButton.addEventListener("click", () => {
    blocks.forEach((block) => {
      block.classList.remove("active");
    });
  });

  startButton.addEventListener("click", () => {
    // Shuffle the game or start a new game
  });

  blocks.forEach((block) => {
    block.addEventListener("click", () => {
      if (!firstBlock) {
        firstBlock = block;
        firstBlock.classList.add("active");
      } else if (!secondBlock) {
        secondBlock = block;
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
});
