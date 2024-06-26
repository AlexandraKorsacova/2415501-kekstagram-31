import {isEscapeKey} from './util.js';
import { changeEffect } from './img-effects.js';
import { addScale, removeScale, resetScale } from './scale.js';
import { pristine } from './text-image.js';
import { sendData } from './api.js';
import { disabledButtonSubmit, enabledButtonSubmit, submitButtonText, addErrorMessage, addSuccessMessage } from './messages.js';

const formPicture = document.querySelector('.img-upload__form');
const uploadInput = formPicture.querySelector('.img-upload__input');
const uploadOverlay = formPicture.querySelector('.img-upload__overlay');
const uploadCancel = formPicture.querySelector('.img-upload__cancel');
const hashtagInput = formPicture.querySelector('.text__hashtags');
const descriptionInput = formPicture.querySelector('.text__description');
const img = formPicture.querySelector('.img-upload__preview img');
const effectList = formPicture.querySelector('.effects__list');
const effectLevel = formPicture.querySelector('.img-upload__effect-level');
const effectsItemFirst = effectList.children[0];
const inputOriginalEffect = effectsItemFirst.querySelector('input');

//Закрытие формы для загрузки фотографий

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      formPicture.reset();
      closeForm();
    }
  }
};

const closeFormClick = () => {
  closeForm();
};

function closeForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  effectLevel.classList.add('hidden');

  uploadCancel.removeEventListener('click', closeFormClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  pristine.reset();
  formPicture.reset();

  if (closeForm) {
    removeScale();
    uploadInput.value = '';
    hashtagInput.value = '';
    descriptionInput.value = '';
    inputOriginalEffect.checked = true;
    img.style.filter = 'none';
  } else {
    addScale();
  }
}


//Открытие формы для загрузки фотографий
uploadInput.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  effectList.addEventListener('click', changeEffect);
  addScale();
  uploadCancel.addEventListener('click', closeFormClick);
  document.addEventListener('keydown', onDocumentKeydown);
});

//Отправка формы на сервер
const submitForm = (onSucсess) => {
  formPicture.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      disabledButtonSubmit(submitButtonText.SENDING);
      hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
      sendData (new FormData(evt.target))
        .then(() =>{
          onSucсess();
          addSuccessMessage();
        })
        .catch(() => {
          addErrorMessage();
        })
        .finally(() => {
          enabledButtonSubmit(submitButtonText.IDLE);
        });
    }
  });
};

export {submitForm, closeForm};
