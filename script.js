document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".block");
  let firstBlock = null;
  let secondBlock = null;

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
