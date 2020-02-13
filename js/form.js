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

  var PRICE_DEFAULT = 1000;
  var offerForm = document.querySelector('.ad-form');
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

  priceInput.min = PRICE_DEFAULT;
  priceInput.placeholder = PRICE_DEFAULT;

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

  var main = document.querySelector('main');

  var isFormSent = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    window.map.setInactiveState();
    window.map.pinHandler();
    priceInput.min = MinCost[accommodationSelection.value];
    priceInput.placeholder = MinCost[accommodationSelection.value];
    main.appendChild(successMessage);

    var onKeydownCloseSuccessMessage = function (evt) {
      if (evt.key === window.util.ESCAPE_KEY) {
        onClickCloseSuccessMessage();
      }
    };

    document.addEventListener('keydown', onKeydownCloseSuccessMessage);


    document.addEventListener('click', function () {
      onClickCloseSuccessMessage();
    });

    var onClickCloseSuccessMessage = function () {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
      document.removeEventListener('click', onClickCloseSuccessMessage);
    };
  };

  var isErrorOccurred = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    var errorClose = document.querySelector('.error__button');
    errorClose.addEventListener('click', function () {
      onClickCloseErrorMessage();
    });

    var onKeydownCloseErrorMessage = function (evt) {
      if (evt.key === window.util.ESCAPE_KEY) {
        onClickCloseErrorMessage();
      }
    };
    document.addEventListener('keydown', onKeydownCloseErrorMessage);

    document.addEventListener('click', function () {
      onClickCloseErrorMessage();
    });

    var onClickCloseErrorMessage = function () {
      main.removeChild(errorMessage);
      document.addEventListener('click', onClickCloseErrorMessage);
      document.removeEventListener('keydown', onKeydownCloseErrorMessage);
      errorClose.removeEventListener('click', onClickCloseErrorMessage);
    };
  };

  offerForm.addEventListener('submit', function (evt) {
    window.server.sendForm(new FormData(offerForm), isFormSent, isErrorOccurred);
    evt.preventDefault();
  });

  var cleanForm = document.querySelector('.ad-form__reset');
  cleanForm.addEventListener('click', function () {
    window.map.setInactiveState();
    window.map.pinHandler();
    priceInput.min = MinCost[accommodationSelection.value];
    priceInput.placeholder = MinCost[accommodationSelection.value];
  });

  window.form = {
    filterCapacity: filterCapacity,
    roomSelection: roomSelection
  };

})();
