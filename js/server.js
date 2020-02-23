'use strict';

(function () {

  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var FORM_URL = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var getXhrStatus = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.timeout = TIMEOUT_IN_MS;

  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    getXhrStatus(xhr, onSuccess, onError);

    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var sendForm = function (form, onFormSuccess, onFormError) {
    var xhr = new XMLHttpRequest();

    getXhrStatus(xhr, onFormSuccess, onFormError);

    xhr.open('POST', FORM_URL);
    xhr.send(form);
  };

  window.server = {
    load: load,
    sendForm: sendForm
  };


})();
