import { MinCost, blockSubmitButton, unblockSubmitButton } from './form.js';
import { sendData } from './server.js';

const offerForm = document.querySelector('.ad-form');
const accommodationType = document.querySelector('#type');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const MAX_ROOMS = 100;
const MIN_ROOMS = 0;

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => price.value >= MinCost[accommodationType.value];

const validateRoomsAndGuests = () => Number(rooms.value) === MAX_ROOMS && Number(guests.value) === MIN_ROOMS || Number(guests.value) <= Number(rooms.value) && Number(rooms.value) !== MAX_ROOMS && Number(guests.value) !== MIN_ROOMS;

const showPriceValidationError = () => `Минимальная цена должна быть больше ${MinCost[accommodationType.value]}`;

pristine.addValidator(price, validatePrice, showPriceValidationError);

pristine.addValidator(
  rooms,
  validateRoomsAndGuests,
  'Количество комнат должно быть меньше или равно количеству гостей'
);

pristine.addValidator(
  guests,
  validateRoomsAndGuests,
  'Количество гостей должно быть меньше или равно количеству комнат'
);

const onFormSubmit = (onSuccess, onError) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export { onFormSubmit, offerForm };
