'use strict';


(function () {

  var ANY = 'any';
  var MAX_OFFERS_AMOUNT = 5;
  var LOW_TO_MIDDLE_PRICE = 10000;
  var MIDDLE_TO_HIGH_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var accommodationFilter = mapFilters.querySelector('#housing-type');
  var priceFilter = mapFilters.querySelector('#housing-price');
  var roomsFilter = mapFilters.querySelector('#housing-rooms');
  var guestsFilter = mapFilters.querySelector('#housing-guests');
  var featuresFilter = mapFilters.querySelectorAll('#housing-features input');

  var applyAccommodationFilter = function (offer) {
    return accommodationFilter.value === ANY || accommodationFilter.value === offer.offer.type;
  };

  var applyRoomsFilter = function (offer) {
    return roomsFilter.value === ANY || +roomsFilter.value === offer.offer.rooms;
  };

  var applyGuestsFilter = function (offer) {
    return guestsFilter.value === ANY || +guestsFilter.value === offer.offer.guests;
  };

  var applyPriceFilter = function (offer) {
    var PricePool = {
      'low': offer.offer.price <= LOW_TO_MIDDLE_PRICE,
      'middle': offer.offer.price > LOW_TO_MIDDLE_PRICE && offer.offer.price <= MIDDLE_TO_HIGH_PRICE,
      'high': offer.offer.price > MIDDLE_TO_HIGH_PRICE,
    };
    return priceFilter.value === ANY || PricePool[priceFilter.value];
  };

  var applyFeaturesFilter = function (offer) {
    return Array.from(featuresFilter).filter(function (feature) {
      return feature.checked;
    }).every(function (feature) {
      return offer.offer.features.includes(feature.value);
    });
  };

  var filterOffers = function (data) {
    var filteredOffers = [];
    for (var i = 0; i < data.length; i++) {
      if (applyAccommodationFilter(data[i]) &&
      applyRoomsFilter(data[i]) &&
      applyGuestsFilter(data[i]) &&
      applyPriceFilter(data[i]) &&
      applyFeaturesFilter(data[i])) {
        if (filteredOffers.length === MAX_OFFERS_AMOUNT) {
          break;
        }
        filteredOffers.push(data[i]);
      }
    }
    return filteredOffers;
  };

  mapFilters.addEventListener('change', function () {
    window.map.cleanOffers();
    window.map.renderOffers(filterOffers(window.data));
  });

  window.filter = {
    offers: filterOffers
  };

})();
