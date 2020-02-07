'use strict';

(function () {

  var OfferPinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var mapCards = document.querySelector('.map__filters-container');
  var similarPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

  /**
   * Задаёт на странице разметку для метки на основе шаблона и объекта данных
   * @param {Object} offerPin - Объект с данными
   * @return {*} Разметка метки для вставки на страницу
  */
  var renderPin = function (offerPin) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = offerPin.location.x - (OfferPinSize.WIDTH / 2) + 'px';
    pinElement.style.top = offerPin.location.y - OfferPinSize.HEIGHT + 'px';
    pinElement.querySelector('img').src = offerPin.author.avatar;
    pinElement.querySelector('img').alt = offerPin.offer.title;

    /**
     * При клике по метке показывается соответствующая ей карточка объявления
    */
    var onClickOpenCard = function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
      window.data.offers.forEach(function (offer) {
        var card = window.card.render(offer);
        if (card.querySelector('.popup__avatar').src === pinElement.querySelector('img').src) {
          mapCards.insertAdjacentElement('beforebegin', card);
        }
      });
    };

    pinElement.addEventListener('click', function () {
      onClickOpenCard();
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.ENTER_KEY) {
        onClickOpenCard();
      }
    });

    return pinElement;
  };

  /**
   * Создаёт DocumentFragment с разметкой меток
   * @return {*} Фрагмент для вставки на страницу
  */
  var showPins = function () {
    var fragment = document.createDocumentFragment();
    window.data.offers.forEach(function (offerPin) {
      fragment.appendChild(renderPin(offerPin));
    });
    return fragment;
  };


  window.pin = {
    show: showPins
  };

})();
