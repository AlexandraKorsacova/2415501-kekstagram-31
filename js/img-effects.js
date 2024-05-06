import {noUiSlider} from '../vendor/nouislider/nouislider';
const effects = document.querySelector('.img-upload__wrapper');
const effectLevel = effects.querySelector('.img-upload__effect-level');
const slider = effects.querySelector('.effect-level__slider');
const effectValue = effects.querySelector('.effect-level__value');
const img = effects.querySelector('.img-upload__preview img');

noUiSlider.create(slider, {
  start: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to:(value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from:(value) => parseFloat(value),
  }
});

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
});

effectLevel.classList.add('hidden');

const changeEffect = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  switch(effect) {
    case 'none':
      img.style.filter = 'none';
      break;
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step:0.1,
        start:1,
      });
      slider.noUiSlider.on('update', () => {
        img.style.filter = `grayscale(${effectValue.value})`;
      });
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step:0.1,
        start:1,
      });
      slider.noUiSlider.on('update', () => {
        img.style.filter = `sepia(${effectValue.value})`;
      });
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step:1,
        start:100,
      });
      slider.noUiSlider.on('update', () => {
        img.style.filter = `invert(${effectValue.value}%)`;
      });
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step:0.1,
        start:3,
      });
      slider.noUiSlider.on('update', () => {
        img.style.filter = `blur(${effectValue.value}px)`;
      });
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step:0.1,
        start:3,
      });
      slider.noUiSlider.on('update', () => {
        img.style.filter = `brightness(${effectValue.value})`;
      });
      break;
  }

};

export {changeEffect};
