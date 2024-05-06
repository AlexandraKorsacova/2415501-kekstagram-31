import {Pristine} from 'pristinejs';

const MAX_SYMBOL = 20;
const MAX_HASHTAGS = 5;

const formPicture = document.querySelector('.img-upload__form');
const hashtagInput = formPicture.querySelector('.text__hashtags');
const descriptionInput = formPicture.querySelector('.text__description');

const pristine = new Pristine (formPicture, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

//Валидатор описания картинки
pristine.addValidator(
  descriptionInput, (value) => {
    const hasNumber = value.length <= 140;
    return hasNumber;
  },
  'Не более 140 символов'
);

//Валидатор хештегов
let errorMessage = '';

const error = () => errorMessage;
const validateHashtag = (value) => {
  errorMessage = '';

  const textInputHashtags = value.toLowerCase().trim();
  const textInput = textInputHashtags.split(/\s+/);

  if(textInputHashtags.length === 0){
    return true;
  }

  const rules = [
    {
      check: textInput.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с \'#\'.',
    },
    {
      check: textInput.some((item) => item === '#'),
      error: 'Хештег должен содержать текст после \'#\'(решетки).'
    },
    {
      check: textInput.some((item) => item.length > MAX_SYMBOL),
      error: `Хештег может состоять ${MAX_SYMBOL} символов, включая решетку.`,
    },
    {
      check: textInput.some((item) => item.slice(1).includes('#')),
      error: 'Между хештегами должен быть пробел.'
    },
    {
      check: textInput.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег может состоять только из букв и чисел.'
    },
    {
      check: textInput.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не быть одинаковыми.'
    },
    {
      check: textInput.length > MAX_HASHTAGS,
      error: `Хештегов должно быть не больше ${MAX_HASHTAGS}.`
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(hashtagInput,validateHashtag,error);

export {pristine};
