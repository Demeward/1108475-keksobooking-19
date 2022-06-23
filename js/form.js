import {cleanImages} from './images.js';
import { getData } from './server.js';
import { offerForm, resetMarker, renderMarkers, resetMap } from './map.js';
import { mapFilters } from './filter.js';

const RoomsNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

const MinCost = {
  bungalo: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const PRICE_DEFAULT = 1000;
const submitButton = document.querySelector('.ad-form__submit');
const capacitySelection = document.querySelector('#capacity');
const capacityOptions = capacitySelection.querySelectorAll('option');
const roomSelection = document.querySelector('#room_number');


/**
 * Задаёт выбор количества гостей в соответствии с количеством комнат
 * @param {string} value - Выбранное количество комнат
 */
const filterCapacity = function(value) {
  capacityOptions.forEach((capacity) => {
    capacity.disabled = true;
    if (RoomsNumber[value].includes(+capacity.value)) {
      capacity.disabled = false;
      capacity.selected = true;
    }
  });
};

roomSelection.addEventListener('change', (evt) => {
  filterCapacity(evt.target.value);
});

filterCapacity(roomSelection.value);

// const titleInput = document.querySelector('#title');
const accommodationSelection = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInSelection = document.querySelector('#timein');
const timeOutSelection = document.querySelector('#timeout');


priceInput.min = PRICE_DEFAULT;
priceInput.placeholder = PRICE_DEFAULT;

accommodationSelection.addEventListener('change', () => {
  priceInput.min = MinCost[accommodationSelection.value];
  priceInput.placeholder = MinCost[accommodationSelection.value];
});

timeInSelection.addEventListener('change', (evt) => {
  timeOutSelection.value = evt.target.value;
});

timeOutSelection.addEventListener('change', (evt) => {
  timeInSelection.value = evt.target.value;
});

const slider = document.querySelector('#slider');

noUiSlider.create(slider, {
  start: [5000],
  connect: [true, false],
  tooltips: true,
  step: 100,
  range: {
    'min': [0],
    '10%': [500, 100],
    '50%': [4000, 500],
    '70%': [10000, 500],
    'max': [100000]
  }
});

slider.noUiSlider.on('change', (values, handle) => {
  priceInput.value = Math.floor(values[handle]);
});

// const main = document.querySelector('main');
let message;

const onEscKeyClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onClickClosePopup();
  }
};

function onClickClosePopup() {
  document.querySelector('.popup').remove();
  document.removeEventListener('keydown', onEscKeyClosePopup);
  document.removeEventListener('click', onClickClosePopup);
}

const openPopup = () => {
  document.body.append(message);
  document.addEventListener('click', onClickClosePopup);
  document.addEventListener('keydown', onEscKeyClosePopup);
};

const openSuccessPopup = () => {
  message = document.querySelector('#success').content.cloneNode(true);
  openPopup();
};

const openErrorPopup = () => {
  message = document.querySelector('#error').content.cloneNode(true);
  openPopup();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const cleanForm = document.querySelector('.ad-form__reset');

const onClickResetForm = () => {
  offerForm.reset();
  cleanImages();
  resetMarker();
  mapFilters.reset();
  getData((offers) => renderMarkers(offers));
  slider.noUiSlider.reset();
  resetMap();
};
cleanForm.addEventListener('click', onClickResetForm);

export {onClickResetForm, blockSubmitButton, unblockSubmitButton, MinCost, openSuccessPopup, openErrorPopup};
