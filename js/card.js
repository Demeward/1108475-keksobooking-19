'use strict';

(function () {

  var Accommodation = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.getElementById('card').content.querySelector('.popup');

  /**
     * Задаёт на странице разметку для карточки объявления на основе шаблона и объекта данных
     * @param {Object} offerCard - Объект с данными
     * @return {*} Разметка карточки объявления для вставки на страницу
    */
  var renderCard = function (offerCard) {

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = offerCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offerCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offerCard.offer.price + 'Р/ночь';
    cardElement.querySelector('.popup__type').textContent = Accommodation[offerCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offerCard.offer.description;
    cardElement.querySelector('.popup__avatar').src = offerCard.author.avatar;

    cardElement.querySelector('.popup__features').innerHTML = '';

    offerCard.offer.features.forEach(function (feature) {
      var cardFeature = document.createElement('li');
      cardFeature.className = 'popup__feature ' + 'popup__feature--' + feature;
      cardFeature.textContent = feature;

      cardElement.querySelector('.popup__features').appendChild(cardFeature);
    });

    cardElement.querySelector('.popup__photos').innerHTML = '';

    offerCard.offer.photos.forEach(function (photo) {
      var cardPhoto = document.createElement('img');
      cardPhoto.className = 'popup__photo';
      cardPhoto.src = photo;
      cardPhoto.alt = 'Фотография жилья';
      cardPhoto.style.width = 45 + 'px';
      cardPhoto.style.height = 40 + 'px';

      cardElement.querySelector('.popup__photos').appendChild(cardPhoto);
    });

    var cardClose = cardElement.querySelector('.popup__close');

    /**
       * Закрывает карточку обяъвления при клике по иконке закрытия или нажатии Esc
      */
    var onClickCloseCard = function () {
      var mapCard = document.querySelector('.map__card');

      if (mapCard) {
        mapCard.remove();
      }

      cardClose.removeEventListener('click', onClickCloseCard);
      document.removeEventListener('keydown', onKeydownCloseCard);
    };

    var onKeydownCloseCard = function (evt) {
      if (evt.key === window.util.ESCAPE_KEY) {
        onClickCloseCard();
      }
    };
    cardClose.addEventListener('click', onClickCloseCard);

    document.addEventListener('keydown', onKeydownCloseCard);


    return cardElement;
  };

  window.card = {
    render: renderCard
  };

})();
