'use strict';

var ROOMS = ['1', '2', '3'];
var GUESTS = ['1', '2', '3'];
var ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var OFFERS_AMOUNT = 8;

var Accommodation = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var Price = {
  MIN: 5000,
  MAX: 100000,
};


var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

/**
 * Выбирает случаный элемент в массиве
 *
 * @param {Array} arr - Входной массив
 * @return {number} Случайный элемент массива
 */
var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

/**
 * Генерирует случайные координаты метки в интервале
 * @param {number} min - Минимальное значение в интервале
 * @param {number} max - Максимальное значение в интервале
 * @return {number} Случайные координаты метки
 */
var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Генерирует массив похожих объявлений в виде объектов
 * @param {number} amount - Количество похожих объявлений
 * @return {Array} Массив похожих объявлений
 */
var generateOffers = function (amount) {
  var offers = [];
  var offerLocation = {};

  for (var i = 0; i < amount; i++) {

    offerLocation.x = generateRandomNumber(coordinates.x.min, coordinates.x.max);
    offerLocation.y = generateRandomNumber(coordinates.y.min, coordinates.y.max);

    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Уютное гнездышко для молодоженов',
        'address': offerLocation.x + ', ' + offerLocation.y,
        'price': generateRandomNumber(Price.MIN, Price.MAX),
        'type': ACCOMMODATION_TYPES[getRandomElement(ACCOMMODATION_TYPES)],
        'rooms': ROOMS[getRandomElement(ROOMS)],
        'guests': GUESTS[getRandomElement(GUESTS)],
        'checkin': CHECKIN_TIMES[getRandomElement(CHECKIN_TIMES)],
        'checkout': CHECKOUT_TIMES[getRandomElement(CHECKOUT_TIMES)],
        'features': FEATURES,
        'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        'photos': PHOTOS
      },

      'location': {
        'x': offerLocation.x,
        'y': offerLocation.y
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
 * @param {Object} offerPin - Объект с данными
 * @return {*} Разметка метки для вставки на страницу
*/
var renderPin = function (offerPin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = offerPin.location.x - (PinSize.WIDTH / 2) + 'px';
  pinElement.style.top = offerPin.location.y - PinSize.HEIGHT + 'px';
  pinElement.querySelector('img').src = offerPin.author.avatar;
  pinElement.querySelector('img').alt = offerPin.offer.title;

  return pinElement;
};


var fragment = document.createDocumentFragment();
offers.forEach(function (offerPin) {
  fragment.appendChild(renderPin(offerPin));
});
similarPins.appendChild(fragment);

var cardTemplate = document.getElementById('card').content.querySelector('.popup');

/**
 * Задаёт на странице разметку для карточки объявления на основе шаблона и объекта данных
 * @param {Object} offerCard - Объект с данными
 * @return {*} Разметка карточки объявления для вставки на страницу
*/
var renderCard = function (offerCard) {

  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offerCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offerCard.offer.price + 'Р/ночь';
  cardElement.querySelector('.popup__type').textContent = Accommodation[offerCard.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offerCard.offer.description;
  cardElement.querySelector('.popup__avatar').src = offerCard.author.avatar;

  cardElement.querySelector('.popup__features').innerHTML = '';

  offerCard.offer.features.forEach(function (feature) {
    var cardFeature = document.createElement('li');
    cardFeature.className = 'popup__feature ' + 'popup__feature--' + feature;
    cardFeature.textContent = feature;

    cardElement.querySelector('.popup__features').appendChild(cardFeature);
  });

  cardElement.querySelector('.popup__photos').innerHTML = '';

  offerCard.offer.photos.forEach(function (photo) {
    var cardPhoto = document.createElement('img');
    cardPhoto.className = 'popup__photo';
    cardPhoto.src = photo;
    cardPhoto.alt = 'Фотография жилья';
    cardPhoto.style.width = 45 + 'px';
    cardPhoto.style.height = 40 + 'px';

    cardElement.querySelector('.popup__photos').appendChild(cardPhoto);
  });

  return cardElement;
};

map.appendChild(renderCard(offers[0]));
