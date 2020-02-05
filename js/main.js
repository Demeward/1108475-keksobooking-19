'use strict';

var ESCAPE_KEY = 'Escape';
var ENTER_KEY = 'Enter';
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

var MinCost = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var Price = {
  MIN: 5000,
  MAX: 100000,
};

var MainPin = {
  WIDTH: 65,
  HEIGHT: 65,
  PIN_TAIL: 22,
  LEFT_DEFAULT: 570,
  TOP_DEFAULT: 375
};

var OfferPinSize = {
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

var RoomsNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

var map = document.querySelector('.map');
var mapCards = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var address = document.getElementById('address');
var form = document.querySelector('.ad-form');
var mapFilters = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var formElements = form.querySelectorAll('fieldset');

/**
 * Переводит страницу в неактивное состояние
*/
var setInactiveState = function () {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  mapFilters.forEach(function (fieldset) {
    fieldset.disabled = true;
  });
  mapFeatures.disabled = true;
  formElements.forEach(function (element) {
    element.disabled = true;
  });
  mainPin.style.left = MainPin.LEFT_DEFAULT + 'px';
  mainPin.style.top = MainPin.TOP_DEFAULT + 'px';
  address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + Math.round(MainPin.HEIGHT / 2));
};

setInactiveState();

/**
 * Переводит страницу в активное состояние
*/
var setActiveState = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  formElements.forEach(function (element) {
    element.disabled = false;
  });
  mapFeatures.disabled = false;
  mapFilters.forEach(function (fieldset) {
    fieldset.disabled = false;
  });
  address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + MainPin.HEIGHT + MainPin.PIN_TAIL);
  address.readOnly = true;
  similarPins.appendChild(fragment);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveState();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveState();
  }
});

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

  var cardClose = cardElement.querySelector('.popup__close');

  /**
   * Закрывает карточку обяъвления при клике по иконке закрытия или нажатии Esc
  */
  var onClickCloseCard = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }
  };

  cardClose.addEventListener('click', function () {
    onClickCloseCard();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESCAPE_KEY) {
      onClickCloseCard();
    }
  });

  return cardElement;
};

var similarPins = document.querySelector('.map__pins');
var similarPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

/**
 * Задаёт на странице разметку для метки на основе шаблона и объекта данных
 * @param {Object} offerPin - Объект с данными
 * @return {*} Разметка метки для вставки на страницу
*/
var renderPin = function (offerPin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = offerPin.location.x - (OfferPinSize.WIDTH / 2) + 'px';
  pinElement.style.top = offerPin.location.y - OfferPinSize.HEIGHT + 'px';
  pinElement.querySelector('img').src = offerPin.author.avatar;
  pinElement.querySelector('img').alt = offerPin.offer.title;

  /**
   * При клике по метке показывается соответствующая ей карточка объявления
  */
  var onClickOpenCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    offers.forEach(function (offer) {
      var card = renderCard(offer);
      if (card.querySelector('.popup__avatar').src === pinElement.querySelector('img').src) {
        mapCards.insertAdjacentElement('beforebegin', card);
      }
    });
  };

  pinElement.addEventListener('click', function () {
    onClickOpenCard();
  });

  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onClickOpenCard();
    }
  });

  return pinElement;
};


var fragment = document.createDocumentFragment();
offers.forEach(function (offerPin) {
  fragment.appendChild(renderPin(offerPin));
});

var capacitySelection = document.querySelector('#capacity');
var capacityOptions = capacitySelection.querySelectorAll('option');
var roomSelection = document.querySelector('#room_number');


/**
 * Задаёт выбор количества гостей в соответствии с количеством комнат
 * @param {string} value - Выбранное количество комнат
*/
var filterCapacity = function (value) {
  capacityOptions.forEach(function (capacity) {
    capacity.disabled = true;
    if (RoomsNumber[value].includes(+capacity.value)) {
      capacity.disabled = false;
      capacity.selected = true;
    }
  });
};

roomSelection.addEventListener('change', function (evt) {
  filterCapacity(evt.target.value);
});

filterCapacity(roomSelection.value);

var titleInput = document.querySelector('#title');
var accommodationSelection = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var timeInSelection = document.querySelector('#timein');
var timeOutSelection = document.querySelector('#timeout');

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен содержать минимум 30 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

priceInput.min = 1000;
priceInput.placeholder = 1000;

accommodationSelection.addEventListener('change', function () {
  priceInput.min = MinCost[accommodationSelection.value];
  priceInput.placeholder = MinCost[accommodationSelection.value];
});

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.typeMismatch) {
    priceInput.setCustomValidity('Введите число');
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Значение должно быть не более 1 000 000');
  } else if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Значение должно быть не менее ' + priceInput.min);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

timeInSelection.addEventListener('change', function (evt) {
  timeOutSelection.value = evt.target.value;
});

timeOutSelection.addEventListener('change', function (evt) {
  timeInSelection.value = evt.target.value;
});
