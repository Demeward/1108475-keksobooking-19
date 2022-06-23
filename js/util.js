// 'use strict';

(function () {

  window.util = {
    ESCAPE_KEY: 'Escape',
    ENTER_KEY: 'Enter',

    /**
     * Выбирает случаный элемент в массиве
     *
     * @param {Array} arr - Входной массив
     * @return {number} Случайный элемент массива
    */
    getRandomElement: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },

    /**
     * Генерирует случайные координаты метки в интервале
     * @param {number} min - Минимальное значение в интервале
     * @param {number} max - Максимальное значение в интервале
     * @return {number} Случайные координаты метки
    */
    generateRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

})();
