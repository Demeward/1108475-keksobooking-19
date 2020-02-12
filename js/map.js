'use strict';

(function () {

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    PIN_TAIL: 22,
    LEFT_DEFAULT: 570,
    TOP_DEFAULT: 375
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var similarPins = document.querySelector('.map__pins');
  var address = document.getElementById('address');
  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var formElements = form.querySelectorAll('fieldset');
  var activeState = false;


  var successHandler = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(window.pin.render(offer));
    });
    similarPins.appendChild(fragment);
  };

  /**
   * Переводит страницу в активное или неактивное состояние
   * @param {boolean} active - Активное или неактивное состояние страницы
  */
  var setPageState = function (active) {
    if (active) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      formElements.forEach(function (element) {
        element.disabled = false;
      });
      mapFeatures.disabled = false;
      mapFilters.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
      window.server.load(successHandler);
      address.value = MainPin.LEFT_DEFAULT + (Math.round(MainPin.WIDTH / 2)) + ', ' + (MainPin.TOP_DEFAULT + MainPin.HEIGHT + MainPin.PIN_TAIL);
      address.readOnly = true;
      mainPin.removeEventListener('mousedown', onClickActiveState);
      mainPin.removeEventListener('keydown', onKeydownActiveState);
    } else {
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
    }

  };

  setPageState(activeState);

  var onClickActiveState = function (evt) {
    if (evt.button === 0) {
      activeState = true;
      setPageState(activeState);
    }
  };

  var onKeydownActiveState = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      activeState = true;
      setPageState(activeState);
    }
  };

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

      if (pinCoords.x >= window.data.coordinates.x.min && pinCoords.x <= window.data.coordinates.x.max) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (pinCoords.y >= window.data.coordinates.y.min && pinCoords.y <= window.data.coordinates.y.max) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (pinCoords.x < window.data.coordinates.x.min) {
        pinCoords.x = window.data.coordinates.x.min;
        mainPin.style.left = pinCoords.x - Math.round(MainPin.WIDTH / 2) + 'px';
      }
      if (pinCoords.x > window.data.coordinates.x.max) {
        pinCoords.x = window.data.coordinates.x.max;
        mainPin.style.left = pinCoords.x - Math.round(MainPin.WIDTH / 2) + 'px';
      }

      if (pinCoords.y < window.data.coordinates.y.min) {
        pinCoords.y = window.data.coordinates.y.min;
        mainPin.style.top = pinCoords.y - MainPin.HEIGHT - MainPin.PIN_TAIL + 'px';
      }
      if (pinCoords.y > window.data.coordinates.y.max) {
        pinCoords.y = window.data.coordinates.y.max;
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

  mainPin.addEventListener('mousedown', onClickActiveState);
  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onKeydownActiveState);

})();
