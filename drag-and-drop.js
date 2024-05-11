// const moveableImages = document.querySelectorAll(".coin");
// const wrapper = document.querySelector(".wrapper");

// let isDragging = false;
// let offsetX = 0,
//   offsetY = 0;
// let containerRect = null;
// let activeImage = null;

// // Add event listeners for mouse down and touch start to each moveable image
// moveableImages.forEach((img) => {
//   img.addEventListener("mousedown", startDragging);
//   img.addEventListener("touchstart", startDragging);
// });

// document.addEventListener("mouseup", stopDragging);
// document.addEventListener("touchend", stopDragging);

// function startDragging(e) {
//   e.preventDefault(); // Prevent default touch behavior

//   wrapper.style.position = "relative";
//   isDragging = true;
//   activeImage = this;

//   containerRect = wrapper.getBoundingClientRect(); // Get the bounding rectangle of the parent container

//   if (e.type === "mousedown") {
//     offsetX = e.clientX - parseInt(activeImage.style.left || 0);
//     offsetY = e.clientY - parseInt(activeImage.style.top || 0);
//     document.addEventListener("mousemove", drag);
//   } else if (e.type === "touchstart") {
//     const touch = e.touches[0];
//     offsetX = touch.clientX - parseInt(activeImage.style.left || 0);
//     offsetY = touch.clientY - parseInt(activeImage.style.top || 0);
//     document.addEventListener("touchmove", drag);
//   }
// }

// function drag(e) {
//   e.preventDefault(); // Prevent default touch behavior
//   if (isDragging && activeImage) {
//     const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
//     const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;

//     // Calculate new position relative to the parent container
//     let newX = clientX - containerRect.left - activeImage.offsetWidth / 2;
//     let newY = clientY - containerRect.top - activeImage.offsetHeight / 2;

//     // Apply boundary constraints
//     newX = Math.max(
//       0,
//       Math.min(newX, containerRect.width - activeImage.offsetWidth)
//     );
//     newY = Math.max(
//       0,
//       Math.min(newY, containerRect.height - activeImage.offsetHeight)
//     );

//     // Update image position
//     activeImage.style.left = `${newX}px`;
//     activeImage.style.top = `${newY}px`;
//   }
// }

// function stopDragging() {
//   isDragging = false;
//   activeImage = null;
//   document.removeEventListener("mousemove", drag);
//   document.removeEventListener("touchmove", drag);
// }
function initCoinInteraction() {
  const wrapper = document.querySelector(".wrapper");
  const coins = wrapper.querySelectorAll(".coin");

  coins.forEach((coin) => {
    let offsetX = coin.offsetLeft;
    let offsetY = coin.offsetTop;

    coin.style.left = offsetX + "px";
    coin.style.top = offsetY + "px";
  });

  let onMouseMove, onMouseUp, onTouchMove, onTouchEnd;

  function moveCoinWithMouse(e) {
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;
    const initialElementX = parseFloat(this.style.left);
    const initialElementY = parseFloat(this.style.top);

    onMouseMove = function (e) {
      moveAt(
        e.clientX - initialMouseX + initialElementX,
        e.clientY - initialMouseY + initialElementY
      );
    };

    onMouseUp = function () {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      stopDrag.call(this);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    const elem = this;
    function moveAt(pageX, pageY) {
      elem.style.left = pageX + "px";
      elem.style.top = pageY + "px";
    }
  }

  function moveCoinWithTouch(e) {
    const initialTouchX = e.touches[0].clientX;
    const initialTouchY = e.touches[0].clientY;
    const initialElementX = parseFloat(this.style.left);
    const initialElementY = parseFloat(this.style.top);

    onTouchMove = function (e) {
      moveAt(
        e.touches[0].clientX - initialTouchX + initialElementX,
        e.touches[0].clientY - initialTouchY + initialElementY
      );
    };

    onTouchEnd = function () {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      stopDrag.call(this);
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    const elem = this;
    function moveAt(pageX, pageY) {
      elem.style.left = pageX + "px";
      elem.style.top = pageY + "px";
    }
  }

  function stopDrag() {
    // Clear event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }

  coins.forEach((coin) => {
    if ("ontouchstart" in window) {
      coin.addEventListener("touchstart", moveCoinWithTouch);
    } else {
      coin.addEventListener("mousedown", moveCoinWithMouse);
    }
  });
}

window.addEventListener("load", initCoinInteraction);
