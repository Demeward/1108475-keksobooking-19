'use strict';

(function () {

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    PIN_TAIL: 22,
    LEFT_DEFAULT: 570,
    TOP_DEFAULT: 375
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
  var mainPin = document.querySelector('.map__pin--main');
  var similarPins = document.querySelector('.map__pins');
  var address = document.getElementById('address');
  var offerForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var formElements = offerForm.querySelectorAll('fieldset');


  var isDataSuccess = function (offers) {
    window.data = offers;
    renderOffers(window.filter.offers(offers));
  };

  var renderOffers = window.debounce(function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(window.pin.render(offer));
    });
    similarPins.appendChild(fragment);
  });

  var isDataError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var cleanOffers = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var mapPins = map.querySelectorAll('.map__pin');

    mapPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  /**
   * Переводит страницу в активное состояние
  */
  var setActiveState = function () {
    map.classList.remove('map--faded');
    offerForm.classList.remove('ad-form--disabled');
    formElements.forEach(function (element) {
      element.disabled = false;
    });
    mapFeatures.disabled = false;
    mapFilters.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    window.server.load(isDataSuccess, isDataError);
    window.images.change();
    address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + MainPin.HEIGHT + MainPin.PIN_TAIL);
    address.readOnly = true;
    mainPin.removeEventListener('mousedown', onClickActiveState);
    mainPin.removeEventListener('keydown', onKeydownActiveState);
  };

  /**
   * Переводит страницу в неактивное состояние
  */
  var setInactiveState = function () {
    map.classList.add('map--faded');
    offerForm.classList.add('ad-form--disabled');
    mapFilters.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    mapFeatures.disabled = true;
    formElements.forEach(function (element) {
      element.disabled = true;
    });
    cleanOffers();
    offerForm.reset();
    filterForm.reset();
    window.images.clean();
    window.images.remove();
    window.form.filterCapacity(window.form.roomSelection.value);
    mainPin.style.left = MainPin.LEFT_DEFAULT + 'px';
    mainPin.style.top = MainPin.TOP_DEFAULT + 'px';
    address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + Math.round(MainPin.HEIGHT / 2));
  };

  setInactiveState();

  var onClickActiveState = function (evt) {
    if (evt.button === 0) {
      setActiveState();
    }
  };

  var onKeydownActiveState = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      setActiveState();
    }
  };

  var clickMainPin = function () {
    mainPin.addEventListener('mousedown', onClickActiveState);
    mainPin.addEventListener('keydown', onKeydownActiveState);
  };

  clickMainPin();

  var onMainPinClick = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoords = {
        x: mainPin.offsetLeft - shift.x + Math.round(MainPin.WIDTH / 2),
        y: mainPin.offsetTop - shift.y + MainPin.HEIGHT + MainPin.PIN_TAIL
      };

      if (pinCoords.x >= coordinates.x.min && pinCoords.x <= coordinates.x.max) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (pinCoords.y >= coordinates.y.min && pinCoords.y <= coordinates.y.max) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (pinCoords.x < coordinates.x.min) {
        pinCoords.x = coordinates.x.min;
        mainPin.style.left = pinCoords.x - Math.round(MainPin.WIDTH / 2) + 'px';
      }
      if (pinCoords.x > coordinates.x.max) {
        pinCoords.x = coordinates.x.max;
        mainPin.style.left = pinCoords.x - Math.round(MainPin.WIDTH / 2) + 'px';
      }

      if (pinCoords.y < coordinates.y.min) {
        pinCoords.y = coordinates.y.min;
        mainPin.style.top = pinCoords.y - MainPin.HEIGHT - MainPin.PIN_TAIL + 'px';
      }
      if (pinCoords.y > coordinates.y.max) {
        pinCoords.y = coordinates.y.max;
        mainPin.style.top = pinCoords.y - MainPin.HEIGHT - MainPin.PIN_TAIL + 'px';
      }

      address.value = pinCoords.x + ', ' + pinCoords.y;
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinClick);

  window.map = {
    renderOffers: renderOffers,
    cleanOffers: cleanOffers,
    setInactiveState: setInactiveState,
    clickMainPin: clickMainPin
  };

})();
