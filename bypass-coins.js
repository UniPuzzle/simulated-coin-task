// function initCoinInteraction() {
//   const wrapper = document.querySelector(".wrapper");
//   const coins = wrapper.querySelectorAll(".coin");

//   coins.forEach((coin) => {
//     let offsetX = coin.offsetLeft;
//     let offsetY = coin.offsetTop;

//     coin.style.left = offsetX + "px";
//     coin.style.top = offsetY + "px";
//   });

//   let onMouseMove, onMouseUp, onTouchMove, onTouchEnd;

//   function moveCoinWithMouse(e) {
//     const initialMouseX = e.clientX;
//     const initialMouseY = e.clientY;
//     const initialElementX = parseFloat(this.style.left) + this.offsetWidth / 2; // Учитываем центр монетки
//     const initialElementY = parseFloat(this.style.top) + this.offsetHeight / 2; // Учитываем центр монетки

//     onMouseMove = function (e) {
//       moveAt(
//         e.clientX - initialMouseX + initialElementX,
//         e.clientY - initialMouseY + initialElementY
//       );
//     };

//     onMouseUp = function () {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//       stopDrag.call(this);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);

//     const elem = this;
//     function moveAt(pageX, pageY) {
//       let newX = pageX;
//       let newY = pageY;

//       let collided = false; // Флаг для обнаружения столкновений
//       let collisionCount = 0; // Счетчик столкновений
//       let collidedCoins = []; // Массив для хранения столкнувшихся монеток

//       coins.forEach((otherCoin) => {
//         if (otherCoin !== elem) {
//           const coinRadius = elem.offsetWidth / 2;
//           const otherCoinRadius = otherCoin.offsetWidth / 2;

//           const distanceX = newX - (otherCoin.offsetLeft + otherCoinRadius);
//           const distanceY = newY - (otherCoin.offsetTop + otherCoinRadius);

//           const newDistance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           );

//           if (newDistance < coinRadius + otherCoinRadius) {
//             collided = true; // Устанавливаем флаг, если есть столкновение
//             collisionCount++; // Увеличиваем счетчик столкновений
//             collidedCoins.push(otherCoin); // Добавляем столкнувшуюся монетку в массив

//             // Если есть коллизия, перемещаем монетку и проверяем снова
//             const angle = Math.atan2(distanceY, distanceX);
//             const overlap = coinRadius + otherCoinRadius - newDistance;
//             newX += Math.cos(angle) * overlap;
//             newY += Math.sin(angle) * overlap;
//           }
//         }
//       });

//       elem.style.left = `${newX - elem.offsetWidth / 2}px`;
//       elem.style.top = `${newY - elem.offsetHeight / 2}px`;

//       if (collided) {
//         console.log("Collided with at least one other coin");
//         if (collisionCount > 1) {
//           console.log("Collided with more than one other coin");
//           // Обтекание всех столкнувшихся монеток
//           collidedCoins.forEach((collidedCoin) => {
//             // Вычисляем угол и дистанцию между монетками
//             const distanceX =
//               newX - (collidedCoin.offsetLeft + collidedCoin.offsetWidth / 2);
//             const distanceY =
//               newY - (collidedCoin.offsetTop + collidedCoin.offsetHeight / 2);
//             const angle = Math.atan2(distanceY, distanceX);
//             const overlap =
//               elem.offsetWidth / 2 +
//               collidedCoin.offsetWidth / 2 -
//               Math.sqrt(distanceX * distanceX + distanceY * distanceY);

//             // Вычисляем новые координаты для обтекания
//             newX += Math.cos(angle) * overlap;
//             newY += Math.sin(angle) * overlap;
//           });

//           // Устанавливаем новые координаты
//           elem.style.left = `${newX - elem.offsetWidth / 2}px`;
//           elem.style.top = `${newY - elem.offsetHeight / 2}px`;
//         }
//       } else {
//         console.log("Not collided with any other coin");
//       }
//     }
//   }

//   function moveCoinWithTouch(e) {
//     const initialTouchX = e.touches[0].clientX;
//     const initialTouchY = e.touches[0].clientY;
//     const initialElementX = parseFloat(this.style.left) + this.offsetWidth / 2; // Учитываем центр монетки
//     const initialElementY = parseFloat(this.style.top) + this.offsetHeight / 2; // Учитываем центр монетки

//     onTouchMove = function (e) {
//       moveAt(
//         e.touches[0].clientX - initialTouchX + initialElementX,
//         e.touches[0].clientY - initialTouchY + initialElementY
//       );
//     };

//     onTouchEnd = function () {
//       document.removeEventListener("touchmove", onTouchMove);
//       document.removeEventListener("touchend", onTouchEnd);
//       stopDrag.call(this);
//     };

//     document.addEventListener("touchmove", onTouchMove);
//     document.addEventListener("touchend", onTouchEnd);

//     const elem = this;
//     function moveAt(pageX, pageY) {
//       let newX = pageX;
//       let newY = pageY;

//       let collided = false; // Флаг для обнаружения столкновений
//       let collisionCount = 0; // Счетчик столкновений
//       let collidedCoins = []; // Массив для хранения столкнувшихся монеток

//       coins.forEach((otherCoin) => {
//         if (otherCoin !== elem) {
//           const coinRadius = elem.offsetWidth / 2;
//           const otherCoinRadius = otherCoin.offsetWidth / 2;

//           const distanceX = newX - (otherCoin.offsetLeft + otherCoinRadius);
//           const distanceY = newY - (otherCoin.offsetTop + otherCoinRadius);

//           const newDistance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           );

//           if (newDistance < coinRadius + otherCoinRadius) {
//             collided = true; // Устанавливаем флаг, если есть столкновение
//             collisionCount++; // Увеличиваем счетчик столкновений
//             collidedCoins.push(otherCoin); // Добавляем столкнувшуюся монетку в массив

//             // Если есть коллизия, перемещаем монетку и проверяем снова
//             const angle = Math.atan2(distanceY, distanceX);
//             const overlap = coinRadius + otherCoinRadius - newDistance;
//             newX += Math.cos(angle) * overlap;
//             newY += Math.sin(angle) * overlap;
//           }
//         }
//       });

//       elem.style.left = `${newX - elem.offsetWidth / 2}px`;
//       elem.style.top = `${newY - elem.offsetHeight / 2}px`;

//       if (collided) {
//         console.log("Collided with at least one other coin");
//         if (collisionCount > 1) {
//           console.log("Collided with more than one other coin");
//           // Обтекание всех столкнувшихся монеток
//           collidedCoins.forEach((collidedCoin) => {
//             // Вычисляем угол и дистанцию между монетками
//             const distanceX =
//               newX - (collidedCoin.offsetLeft + collidedCoin.offsetWidth / 2);
//             const distanceY =
//               newY - (collidedCoin.offsetTop + collidedCoin.offsetHeight / 2);
//             const angle = Math.atan2(distanceY, distanceX);
//             const overlap =
//               elem.offsetWidth / 2 +
//               collidedCoin.offsetWidth / 2 -
//               Math.sqrt(distanceX * distanceX + distanceY * distanceY);

//             // Вычисляем новые координаты для обтекания
//             newX += Math.cos(angle) * overlap;
//             newY += Math.sin(angle) * overlap;
//           });

//           // Устанавливаем новые координаты
//           elem.style.left = `${newX - elem.offsetWidth / 2}px`;
//           elem.style.top = `${newY - elem.offsetHeight / 2}px`;
//         }
//       } else {
//         console.log("Not collided with any other coin");
//       }
//     }
//   }

//   function stopDrag() {
//     // Clear event listeners
//     document.removeEventListener("mousemove", onMouseMove);
//     document.removeEventListener("mouseup", onMouseUp);
//     document.removeEventListener("touchmove", onTouchMove);
//     document.removeEventListener("touchend", onTouchEnd);
//   }

//   coins.forEach((coin) => {
//     if ("ontouchstart" in window) {
//       coin.addEventListener("touchstart", moveCoinWithTouch);
//     } else {
//       coin.addEventListener("mousedown", moveCoinWithMouse);
//     }
//   });
// }

// window.addEventListener("load", initCoinInteraction);

// =============

// function initCoinInteraction() {
//   const wrapper = document.querySelector(".wrapper");
//   const coins = wrapper.querySelectorAll(".coin");

//   coins.forEach((coin) => {
//     let offsetX = coin.offsetLeft;
//     let offsetY = coin.offsetTop;

//     coin.style.left = offsetX + "px";
//     coin.style.top = offsetY + "px";
//   });

//   let onMouseMove, onMouseUp, onTouchMove, onTouchEnd;

//   function moveCoinWithMouse(e) {
//     const initialMouseX = e.clientX;
//     const initialMouseY = e.clientY;
//     const initialElementX = parseFloat(this.style.left) + this.offsetWidth / 2; // Учитываем центр монетки
//     const initialElementY = parseFloat(this.style.top) + this.offsetHeight / 2; // Учитываем центр монетки

//     onMouseMove = function (e) {
//       moveAt(
//         e.clientX - initialMouseX + initialElementX,
//         e.clientY - initialMouseY + initialElementY
//       );
//     };

//     onMouseUp = function () {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//       stopDrag.call(this);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);

//     const elem = this;
//     function moveAt(pageX, pageY) {
//       let newX = pageX;
//       let newY = pageY;

//       coins.forEach((coin) => {
//         if (coin !== elem) {
//           const coinRadius = coin.offsetWidth / 2;
//           const distanceX = newX - (coin.offsetLeft + coinRadius);
//           const distanceY = newY - (coin.offsetTop + coinRadius);
//           const distance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           );

//           if (distance < 2 * coinRadius) {
//             const angle = Math.atan2(distanceY, distanceX);
//             const overlap = 2 * coinRadius - distance;

//             newX += Math.cos(angle) * overlap;
//             newY += Math.sin(angle) * overlap;
//           }
//         }
//       });

//       elem.style.left = `${newX - elem.offsetWidth / 2}px`;
//       elem.style.top = `${newY - elem.offsetHeight / 2}px`;
//     }
//   }

//   function moveCoinWithTouch(e) {
//     const initialTouchX = e.touches[0].clientX;
//     const initialTouchY = e.touches[0].clientY;
//     const initialElementX = parseFloat(this.style.left) + this.offsetWidth / 2; // Учитываем центр монетки
//     const initialElementY = parseFloat(this.style.top) + this.offsetHeight / 2; // Учитываем центр монетки

//     onTouchMove = function (e) {
//       moveAt(
//         e.touches[0].clientX - initialTouchX + initialElementX,
//         e.touches[0].clientY - initialTouchY + initialElementY
//       );
//     };

//     onTouchEnd = function () {
//       document.removeEventListener("touchmove", onTouchMove);
//       document.removeEventListener("touchend", onTouchEnd);
//       stopDrag.call(this);
//     };

//     document.addEventListener("touchmove", onTouchMove);
//     document.addEventListener("touchend", onTouchEnd);

//     const elem = this;
//     function moveAt(pageX, pageY) {
//       let newX = pageX;
//       let newY = pageY;

//       coins.forEach((coin) => {
//         if (coin !== elem) {
//           const coinRadius = coin.offsetWidth / 2;
//           const distanceX = newX - (coin.offsetLeft + coinRadius);
//           const distanceY = newY - (coin.offsetTop + coinRadius);
//           const distance = Math.sqrt(
//             distanceX * distanceX + distanceY * distanceY
//           );

//           if (distance < 2 * coinRadius) {
//             const angle = Math.atan2(distanceY, distanceX);
//             const overlap = 2 * coinRadius - distance;

//             newX += Math.cos(angle) * overlap;
//             newY += Math.sin(angle) * overlap;
//           }
//         }
//       });

//       elem.style.left = `${newX - elem.offsetWidth / 2}px`;
//       elem.style.top = `${newY - elem.offsetHeight / 2}px`;
//     }
//   }

//   function stopDrag() {
//     // Clear event listeners
//     document.removeEventListener("mousemove", onMouseMove);
//     document.removeEventListener("mouseup", onMouseUp);
//     document.removeEventListener("touchmove", onTouchMove);
//     document.removeEventListener("touchend", onTouchEnd);
//   }

//   coins.forEach((coin) => {
//     if ("ontouchstart" in window) {
//       coin.addEventListener("touchstart", moveCoinWithTouch);
//     } else {
//       coin.addEventListener("mousedown", moveCoinWithMouse);
//     }
//   });
// }

// window.addEventListener("load", initCoinInteraction);
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
    const initialElementX = parseFloat(this.style.left) + this.offsetWidth / 2; // Учитываем центр монетки
    const initialElementY = parseFloat(this.style.top) + this.offsetHeight / 2; // Учитываем центр монетки

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
      let newX = pageX;
      let newY = pageY;

      let collisionCount = 0; // Счетчик столкновений
      let collidedCoins = []; // Массив для хранения столкнувшихся монеток

      coins.forEach((coin) => {
        if (coin !== elem) {
          const coinRadius = coin.offsetWidth / 2;
          const distanceX = newX - (coin.offsetLeft + coinRadius);
          const distanceY = newY - (coin.offsetTop + coinRadius);
          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );

          if (distance < 2 * coinRadius) {
            collisionCount++;
            collidedCoins.push(coin);
            const angle = Math.atan2(distanceY, distanceX);
            const overlap = 2 * coinRadius - distance;
            newX += Math.cos(angle) * overlap;
            newY += Math.sin(angle) * overlap;
          }
        }
      });

      // Если столкновений больше одного, останавливаем перемещение
      if (collisionCount > 1) {
        console.log("Collided with more than one other coin");
        return;
      }

      elem.style.left = `${newX - elem.offsetWidth / 2}px`;
      elem.style.top = `${newY - elem.offsetHeight / 2}px`;
    }
  }

  function moveCoinWithTouch(e) {
    const initialTouchX = e.touches[0].clientX;
    const initialTouchY = e.touches[0].clientY;
    const initialElementX = parseFloat(this.style.left) + this.offsetWidth / 2; // Учитываем центр монетки
    const initialElementY = parseFloat(this.style.top) + this.offsetHeight / 2; // Учитываем центр монетки

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
      let newX = pageX;
      let newY = pageY;

      let collisionCount = 0; // Счетчик столкновений
      let collidedCoins = []; // Массив для хранения столкнувшихся монеток

      coins.forEach((coin) => {
        if (coin !== elem) {
          const coinRadius = coin.offsetWidth / 2;
          const distanceX = newX - (coin.offsetLeft + coinRadius);
          const distanceY = newY - (coin.offsetTop + coinRadius);
          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );

          if (distance < 2 * coinRadius) {
            collisionCount++;
            collidedCoins.push(coin);
            const angle = Math.atan2(distanceY, distanceX);
            const overlap = 2 * coinRadius - distance;
            newX += Math.cos(angle) * overlap;
            newY += Math.sin(angle) * overlap;
          }
        }
      });

      // Если столкновений больше одного, останавливаем перемещение
      if (collisionCount > 1) {
        console.log("Collided with more than one other coin");
        return;
      }

      elem.style.left = `${newX - elem.offsetWidth / 2}px`;
      elem.style.top = `${newY - elem.offsetHeight / 2}px`;
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
