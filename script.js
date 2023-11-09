// document.addEventListener("DOMContentLoaded", function () {
//   const playerArea = document.getElementById("player-area");
//   const computerArea = document.getElementById("computer-area");
//   const startButton = document.getElementById("start-button");
//   const resetButton = document.getElementById("reset-button");
//   let currentPlayer = "player"; // Changed to "player"
//   let shuffled = false;
//   let firstBlock = null;
//   let secondBlock = null;
//   const images = [
//     "images/deer.jpg",
//     "images/fox.jpg",
//     "images/giraffe.jpg",
//     "images/hedgehog.jpg",
//     "images/polarbear.jpg",
//     "images/rabbit.jpg",
//     "images/deer.jpg",
//     "images/fox.jpg",
//     "images/giraffe.jpg",
//     "images/hedgehog.jpg",
//     "images/polarbear.jpg",
//     "images/rabbit.jpg",
//   ];

//   // Shuffle the images array
//   for (let i = images.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [images[i], images[j]] = [images[j], images[i]];
//   }

//   // Duplicate each image path to ensure they are used twice
//   const duplicatedImagePaths = [...images, ...images];

//   startButton.addEventListener("click", () => {
//     if (!shuffled) {
//       playerArea.innerHTML = "";
//       computerArea.innerHTML = "";
//       createBlocks(playerArea, 12);
//       createBlocks(computerArea, 12);
//       shuffleBlocks(playerArea);
//       shuffleBlocks(computerArea);
//       shuffled = true;
//     }
//   });

//   resetButton.addEventListener("click", () => {
//     playerArea.innerHTML = "";
//     computerArea.innerHTML = "";
//     shuffled = false;
//     currentPlayer = "player"; // Reset to player's turn
//   });

//   function createBlocks(area, numBlocks) {
//     for (let i = 0; i < numBlocks; i++) {
//       const block = document.createElement("div");
//       block.className = "block";
//       const inner = document.createElement("div");
//       inner.className = "inner";
//       const img = document.createElement("img");
//       img.src = images[i];
//       img.alt = images[i].split("/").pop().split(".")[0];
//       inner.appendChild(img);
//       block.appendChild(inner);
//       area.appendChild(block);

//       // Add a click event listener to handle turns
//       block.addEventListener("click", () => {
//         if (currentPlayer === "player") {
//           // Allow player to flip blocks during their turn
//           handleBlockClick(block);
//         }
//       });
//     }
//   }

//   function handleBlockClick(clickedBlock) {
//     if (!clickedBlock) return; // Ignore clicks on non-block elements
//     if (clickedBlock.classList.contains("active")) return; // Ignore clicks on active blocks

//     if (!firstBlock) {
//       firstBlock = clickedBlock;
//       firstBlock.classList.add("active");
//     } else if (!secondBlock) {
//       secondBlock = clickedBlock;
//       secondBlock.classList.add("active");

//       // Check for a match
//       if (
//         firstBlock.querySelector("img").getAttribute("src") ===
//         secondBlock.querySelector("img").getAttribute("src")
//       ) {
//         // If it's a match, keep the blocks active
//         firstBlock = null;
//         secondBlock = null;
//       } else {
//         // If it's not a match, hide the images and switch to the computer's turn
//         setTimeout(() => {
//           firstBlock.classList.remove("active");
//           secondBlock.classList.remove("active");
//           firstBlock = null;
//           secondBlock = null;
//           currentPlayer = "computer"; // Switch to the computer's turn
//           simulateComputerTurn();
//         }, 1000);
//       }
//     }
//   }

//   function simulateComputerTurn() {
//     // Randomly select two hidden blocks and flip them
//     // Compare and act accordingly (leave them if they match, hide them if they don't)
//     // Switch back to the player's turn when done
//     // Add delays or animations to simulate the computer's actions

//     setTimeout(() => {
//       const hiddenBlocks = Array.from(
//         computerArea.querySelectorAll(".block:not(.active)")
//       );

//       const selectedIndices = [];
//       while (selectedIndices.length < 2) {
//         const randomIndex = Math.floor(Math.random() * hiddenBlocks.length);
//         if (!selectedIndices.includes(randomIndex)) {
//           selectedIndices.push(randomIndex);
//         }
//       }

//       selectedIndices.forEach((index) => {
//         const block = hiddenBlocks[index];
//         block.classList.add("active");
//       });

//       setTimeout(() => {
//         const activeBlocks = Array.from(
//           computerArea.querySelectorAll(".block.active")
//         );

//         if (
//           activeBlocks[0].querySelector("img").getAttribute("src") ===
//           activeBlocks[1].querySelector("img").getAttribute("src")
//         ) {
//           // If it's a match, keep the blocks active
//           activeBlocks.forEach((block) => block.classList.remove("active"));
//         } else {
//           // If it's not a match, hide the images and switch to the player's turn
//           setTimeout(() => {
//             activeBlocks.forEach((block) => block.classList.remove("active"));
//             currentPlayer = "player";
//           }, 1000);
//         }
//       }, 1000);
//     }, 2000);
//   }
// });

// Further testing multiplayer gameplay

document.addEventListener("DOMContentLoaded", function () {
  const playerArea = document.getElementById("player-area");
  const computerArea = document.getElementById("computer-area");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  let currentPlayer = "player";
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
    currentPlayer = "player";
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
        firstBlock = null;
        secondBlock = null;
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
    // Randomly select one hidden block, flip it
    // Compare and act accordingly (leave it if it matches, hide it if it doesn't)
    // Switch back to the player's turn when done
    // Add delays or animations to simulate the computer's actions

    setTimeout(() => {
      const hiddenBlocks = Array.from(
        computerArea.querySelectorAll(".block:not(.active)")
      );

      const randomIndex = Math.floor(Math.random() * hiddenBlocks.length);
      const block = hiddenBlocks[randomIndex];
      block.classList.add("active");

      setTimeout(() => {
        const activeBlocks = Array.from(
          computerArea.querySelectorAll(".block.active")
        );

        if (
          activeBlocks[0].querySelector("img").getAttribute("src") ===
          activeBlocks[1].querySelector("img").getAttribute("src")
        ) {
          // If it's a match, keep the blocks active
          activeBlocks.forEach((block) => block.classList.remove("active"));
        } else {
          // If it's not a match, hide the image and switch to the player's turn
          setTimeout(() => {
            activeBlocks.forEach((block) => block.classList.remove("active"));
            currentPlayer = "player";
          }, 1000);
        }
      }, 1000);
    }, 2000);
  }
});