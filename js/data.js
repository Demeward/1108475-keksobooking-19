'use strict';

(function () {
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

  var Price = {
    MIN: 5000,
    MAX: 100000,
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

  var generateOffers = function (amount) {
    var offers = [];
    var offerLocation = {};

    for (var i = 0; i < amount; i++) {

      offerLocation.x = window.util.generateRandomNumber(coordinates.x.min, coordinates.x.max);
      offerLocation.y = window.util.generateRandomNumber(coordinates.y.min, coordinates.y.max);

      offers[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': 'Уютное гнездышко для молодоженов',
          'address': offerLocation.x + ', ' + offerLocation.y,
          'price': window.util.generateRandomNumber(Price.MIN, Price.MAX),
          'type': ACCOMMODATION_TYPES[window.util.getRandomElement(ACCOMMODATION_TYPES)],
          'rooms': ROOMS[window.util.getRandomElement(ROOMS)],
          'guests': GUESTS[window.util.getRandomElement(GUESTS)],
          'checkin': CHECKIN_TIMES[window.util.getRandomElement(CHECKIN_TIMES)],
          'checkout': CHECKOUT_TIMES[window.util.getRandomElement(CHECKOUT_TIMES)],
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

  window.offers = generateOffers(OFFERS_AMOUNT);
})();
