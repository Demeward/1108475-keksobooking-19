// 'use strict';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const avatarLoader = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoLoader = document.querySelector('#images');
const photoContainer = document.querySelector('.ad-form__photo-container');
const firstPhotoWrapper = document.querySelector('.ad-form__photo');

const Photo = {
  WIDTH: '70px',
  HEIGHT: '70px'
};


const createPhoto = function (photo) {
  const newPhoto = document.createElement('img');
  newPhoto.src = photo;
  newPhoto.style.width = Photo.WIDTH;
  newPhoto.style.height = Photo.HEIGHT;
  newPhoto.alt = 'Фотография жилья';
  return newPhoto;
};

const addPhoto = function (photo) {
  const newPhotoWrapper = document.createElement('div');
  newPhotoWrapper.classList.add('ad-form__photo');
  newPhotoWrapper.classList.add('ad-form__photo--added');
  newPhotoWrapper.appendChild(createPhoto(photo));
  photoContainer.appendChild(newPhotoWrapper);
};

const loadImage = function (imageLoader, addImage) {
  const imageFiles = Array.from(imageLoader.files);
  if (imageFiles) {
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt) => {
        addImage(evt.target.result);
      });
      reader.readAsDataURL(file);
    });
  }
};

const cleanImages = function () {
  avatarLoader.files.value = DEFAULT_AVATAR;
  avatarPreview.src = DEFAULT_AVATAR;
  photoLoader.files.value = '';
  const addedPhotos = document.querySelectorAll('.ad-form__photo--added');
  if (addedPhotos) {
    addedPhotos.forEach((photo) => {
      photo.remove();
    });
    firstPhotoWrapper.innerHTML = '';
  }
};

const changeAvatar = function (avatar) {
  avatarPreview.src = avatar;
};

const onAvatarChange = function (evt) {
  loadImage(evt.target, changeAvatar);
};

const onPhotoChange = function (evt) {
  loadImage(evt.target, addPhoto);
};


avatarLoader.addEventListener('change', onAvatarChange, false);
photoLoader.addEventListener('change', onPhotoChange, false);


export {
  cleanImages
};
