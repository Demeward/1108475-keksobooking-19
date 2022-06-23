const Accommodation = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  'hotel': 'Отель',
};

const CardPhoto = {
  WIDTH: 45,
  HEIGHT: 40
};


const TEMPLATE_FRAGMENT = document.querySelector('#card').content;
const TEMPLATE = TEMPLATE_FRAGMENT.querySelector('.popup');
const PHOTO_TEMPLATE = TEMPLATE_FRAGMENT.querySelector('.popup__photo');

const removeElement = (element) => {
  element.remove();
};

const setTextValue = (element, value) => {
  element.textContent = value;
};

const renderCard = function({
  offer,
  author
}) {

  const cardElement = TEMPLATE.cloneNode(true);

  if (offer.title) {
    setTextValue(cardElement.querySelector('.popup__title'), offer.title);
  } else {
    removeElement(cardElement.querySelector('.popup__title'));
  }

  if (offer.adress) {
    setTextValue(cardElement.querySelector('.popup__text--address'), offer.adress);
  } else {
    removeElement(cardElement.querySelector('.popup__text--address'));
  }

  if (offer.price) {
    setTextValue(cardElement.querySelector('.popup__text--price'), `${offer.price} ₽/ночь`);
  } else {
    removeElement(cardElement.querySelector('.popup__text--price'));
  }

  if (offer.type) {
    setTextValue(cardElement.querySelector('.popup__type'), Accommodation[offer.type]);
  } else {
    removeElement(cardElement.querySelector('.popup__type'));
  }

  if (offer.rooms && offer.guests) {
    setTextValue(cardElement.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);
  } else {
    removeElement(cardElement.querySelector('.popup__text--capacity'));
  }

  if (offer.checkin && offer.checkout) {
    setTextValue(cardElement.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  } else {
    removeElement(cardElement.querySelector('.popup__text--time'));
  }

  if (offer.features) {
    cardElement.querySelectorAll('.popup__feature').forEach((featureListItem) => {
      const isNecessary = offer.features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`)
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    removeElement(cardElement.querySelector('.popup__features'));
  }

  if (offer.description) {
    setTextValue(cardElement.querySelector('.popup__description'), offer.description);
  } else {
    removeElement(cardElement.querySelector('.popup__description'));
  }

  if (offer.photos) {
    cardElement.querySelector('.popup__photos').innerHTML = '';
    offer.photos.forEach((photo) => {
      const cardPhoto = PHOTO_TEMPLATE.cloneNode(true);
      cardPhoto.src = photo;
      cardPhoto.style.width = `${CardPhoto.WIDTH}px`;
      cardPhoto.style.height = `${CardPhoto.HEIGHT}px`;
      cardElement.querySelector('.popup__photos').append(cardPhoto);
    });
  } else {
    removeElement(cardElement.querySelector('.popup__photos'));
  }

  if (author.avatar) {
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    removeElement(cardElement.querySelector('.popup__avatar'));
  }
  return cardElement;
};

export {
  renderCard
};
