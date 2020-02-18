'use strict';


(function () {

  var accommodationFilter = document.querySelector('#housing-type');
  var ANY = 'any';
  var MAX_OFFERS_AMOUNT = 5;

  var filterOffers = function (data) {
    return data.filter(function (offer) {
      return accommodationFilter.value === ANY ? true : accommodationFilter.value === offer.offer.type;
    }).slice(0, MAX_OFFERS_AMOUNT);
  };

  accommodationFilter.addEventListener('change', function () {
    window.map.cleanOffers();
    window.map.renderOffers(filterOffers(window.data));
  });

  window.filter = {
    offers: filterOffers
  };

})();
