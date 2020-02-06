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
    similarPins.appendChild(window.showPins());
    mainPin.removeEventListener('mousedown', onClickActiveState);
    mainPin.removeEventListener('keydown', onKeydownActiveState);
  };

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

  mainPin.addEventListener('mousedown', onClickActiveState);
  mainPin.addEventListener('keydown', onKeydownActiveState);


})();
