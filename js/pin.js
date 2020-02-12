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
      mapCards.insertAdjacentElement('beforebegin', window.card.render(offerPin));
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

  window.pin = {
    render: renderPin
  };

})();
