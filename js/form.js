'use strict';


(function () {

  var RoomsNumber = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  var MinCost = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

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


})();
