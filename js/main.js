'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var OFFERS_AMOUNT = 8;

var pinSize = {
  width: 50,
  height: 70
};

var coordinates = {
  x: {
    min: 0,
    max: 1200
  },
  y: {
    min: 130,
    max: 630
  }
};

/**
 * Устанавливает случайные координаты метки в интервале
 * @param {number} min - Минимальное значение в интервале
 * @param {number} max - Максимальное значение в интервале
 * @return {number} Случайные координаты метки
 */
var setRandomCoordinates = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * Генерирует массив похожих объявлений в виде объектов
 * @param {number} amount - Количество похожих объявлений
 * @return {Array} Массив похожих объявлений
 */
var generateOffers = function (amount) {
  var offers = [];

  for (var i = 0; i < amount; i++) {
    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Уютное гнездышко для молодоженов',
        'address': '600, 350',
        'price': 5200,
        'type': 'flat',
        'rooms': 2,
        'guests': 3,
        'checkin': '13:00',
        'checkout': '14:00',
        'features': features,
        'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        'photos': photos
      },

      'location': {
        'x': setRandomCoordinates(coordinates.x.min, coordinates.x.max),
        'y': setRandomCoordinates(coordinates.y.min, coordinates.y.max)
      }
    };
  }

  return offers;
};

var offers = generateOffers(OFFERS_AMOUNT);

var similarPins = document.querySelector('.map__pins');
var similarPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

/**
 * Задаёт на странице разметку для метки на основе шаблона и объекта данных
 * @param {Object} pin - Объект с данными
 * @return {*} Разметка метки для вставки на страницу
*/
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - (pinSize.width / 2) + 'px';
  pinElement.style.top = pin.location.y - pinSize.height + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};


var fragment = document.createDocumentFragment();
offers.forEach(function (pin) {
  fragment.appendChild(renderPin(pin));
});
similarPins.appendChild(fragment);
