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
            const overlap = 2 * coinRadius - distance;
            newX += (distanceX / distance) * overlap; // Учитываем только круговую область
            newY += (distanceY / distance) * overlap; // Учитываем только круговую область
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
            const overlap = 2 * coinRadius - distance;
            newX += (distanceX / distance) * overlap; // Учитываем только круговую область
            newY += (distanceY / distance) * overlap; // Учитываем только круговую область
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
