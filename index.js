// var coinData = {}; // Объект для хранения координат монет и их центральных точек
// var wrapperRect; // Прямоугольник области .wrapper

// function setInitialPositions() {
//   var wrapper = document.querySelector(".wrapper");
//   wrapperRect = wrapper.getBoundingClientRect(); // Получаем координаты области .wrapper

//   var coins = wrapper.querySelectorAll(".coin");

//   coins.forEach(function (coin) {
//     var rect = coin.getBoundingClientRect();

//     var coinCoords = {
//       left: rect.left - wrapperRect.left, // Координата X левого верхнего угла монеты относительно .wrapper
//       top: rect.top - wrapperRect.top, // Координата Y левого верхнего угла монеты относительно .wrapper
//     };

//     coin.style.left = coinCoords.left + "px"; // Устанавливаем позицию монеты
//     coin.style.top = coinCoords.top + "px";

//     coinData[coin.classList[1]] = coinCoords;
//   });

//   console.log("Координаты монет:");
//   console.log(coinData);
// }

// window.addEventListener("load", setInitialPositions);

// document.addEventListener("mousedown", function (event) {
//   if (event.target.classList.contains("coin")) {
//     var coin = event.target;
//     var coinId = coin.classList[1];
//     var coinCoords = coinData[coinId];
//     var offsetX = event.clientX - coinCoords.left; // Смещение относительно левого верхнего угла монеты
//     var offsetY = event.clientY - coinCoords.top;

//     document.addEventListener("mousemove", moveCoin);

//     function moveCoin(event) {
//       coin.style.left = event.clientX - offsetX + "px";
//       coin.style.top = event.clientY - offsetY + "px";

//       // Обновляем координаты монеты в объекте coinData после перемещения
//       coinCoords.left = event.clientX - wrapperRect.left;
//       coinCoords.top = event.clientY - wrapperRect.top;
//     }

//     document.addEventListener("mouseup", function () {
//       document.removeEventListener("mousemove", moveCoin);
//     });
//   }
// });
// var coinData = {}; // Объект для хранения координат монет и их центральных точек
// var coinOffsetX; // Смещение относительно левого верхнего угла монеты при нажатии
// var coinOffsetY;

// function setInitialPositions() {
//   var coins = document.querySelectorAll(".coin");
//   var screenWidth = window.innerWidth;
//   var screenHeight = window.innerHeight;
//   var coinWidth = 50; // Ширина монеты
//   var coinHeight = 50; // Высота монеты

//   coins.forEach(function (coin, index) {
//     var coinCoords = {
//       left: (screenWidth - coinWidth) / 2, // Расположение монеты по центру экрана по горизонтали
//       top: (screenHeight - coinHeight) / 2 + index * 60, // Расположение монеты по центру экрана по вертикали с учетом предыдущих монет
//     };

//     coin.style.left = coinCoords.left + "px"; // Устанавливаем позицию монеты
//     coin.style.top = coinCoords.top + "px";

//     coinData[coin.classList[1]] = coinCoords;
//   });

//   console.log("Координаты монет:");
//   console.log(coinData);
// }

// window.addEventListener("load", setInitialPositions);

// document.addEventListener("mousedown", function (event) {
//   if (event.target.classList.contains("coin")) {
//     var coin = event.target;
//     var coinId = coin.classList[1];
//     var coinCoords = coinData[coinId];
//     coinOffsetX = event.clientX - coinCoords.left; // Сохраняем смещение относительно левого верхнего угла монеты
//     coinOffsetY = event.clientY - coinCoords.top;

//     document.addEventListener("mousemove", moveCoin);

//     function moveCoin(event) {
//       coin.style.left = event.clientX - coinOffsetX + "px";
//       coin.style.top = event.clientY - coinOffsetY + "px";

//       // Обновляем координаты монеты в объекте coinData после перемещения
//       coinCoords.left = event.clientX - coinOffsetX;
//       coinCoords.top = event.clientY - coinOffsetY;

//       console.log("Новые координаты монет:");
//       console.log(coinCoords);
//     }

//     document.addEventListener("mouseup", function () {
//       document.removeEventListener("mousemove", moveCoin);
//     });
//   }
// });
var coinData = {}; // Объект для хранения координат монет и их центральных точек
var coinOffsetX; // Смещение относительно левого верхнего угла монеты при нажатии
var coinOffsetY;
var coinRadius = 20; // Предполагаемый радиус монеты

function setInitialPositions() {
  var coins = document.querySelectorAll(".coin");

  coins.forEach(function (coin) {
    var rect = coin.getBoundingClientRect();

    var coinCoords = {
      left: rect.left + coinRadius, // Координата X центра монеты
      top: rect.top + coinRadius, // Координата Y центра монеты
    };

    coinData[coin.classList[1]] = coinCoords;
  });

  console.log("Координаты монет:");
  console.log(coinData);
}

window.addEventListener("load", setInitialPositions);

document.addEventListener("mousedown", function (event) {
  if (event.target.classList.contains("coin")) {
    var coin = event.target;
    var coinId = coin.classList[1];
    var coinCoords = coinData[coinId];
    coinOffsetX = event.clientX - coinCoords.left; // Сохраняем смещение относительно центра монеты
    coinOffsetY = event.clientY - coinCoords.top;

    document.addEventListener("mousemove", moveCoin);

    function moveCoin(event) {
      var newX = event.clientX - coinOffsetX;
      var newY = event.clientY - coinOffsetY;

      // Проверяем, что новая позиция не пересекается с другими монетами
      for (var id in coinData) {
        if (id !== coinId) {
          var otherCoin = coinData[id];
          var distance = Math.sqrt(
            Math.pow(newX - otherCoin.left, 2) +
              Math.pow(newY - otherCoin.top, 2)
          );
          if (distance < 2 * coinRadius) {
            // Если новая позиция находится слишком близко к другой монете, сдвигаем текущую монету в сторону
            var angle = Math.atan2(newY - otherCoin.top, newX - otherCoin.left);
            newX = otherCoin.left + Math.cos(angle) * 2 * coinRadius;
            newY = otherCoin.top + Math.sin(angle) * 2 * coinRadius;

            // Если расстояние между центрами монет равно диаметру монеты, прекращаем перемещение
            var newDistance = Math.sqrt(
              Math.pow(newX - otherCoin.left, 2) +
                Math.pow(newY - otherCoin.top, 2)
            );
            if (newDistance < 2 * coinRadius) {
              return;
            }
          }
        }
      }

      coin.style.left = newX - coinRadius + "px";
      coin.style.top = newY - coinRadius + "px";

      // Обновляем координаты монеты в объекте coinData после перемещения
      coinCoords.left = newX;
      coinCoords.top = newY;

      console.log("Новые координаты монеты:");
      console.log(coinCoords);
    }

    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", moveCoin);
    });
  }
});
