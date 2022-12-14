import {body} from './main.js';
import {checkForm} from './checkForm.js';

const imageUpload = document.querySelector('.img-upload__form');
const hashtagsInput = imageUpload.querySelector('.text__hashtags');
const commentInput = imageUpload.querySelector('.text__description');
const uploadBtn = document.querySelector('#upload-file');
const cancelBtn = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const smallerBtn = imageUpload.querySelector('.scale__control--smaller');
const biggerBtn = imageUpload.querySelector('.scale__control--bigger');
const scaleControl = imageUpload.querySelector('.scale__control--value');
const preview = imageUpload.querySelector('.img-upload__preview');
const scaleSlider = imageUpload.querySelector('.effect-level__slider');
const effectLevel = imageUpload.querySelector('.effect-level__value');
const effectsPresets = {
  'chrome': { filter: 'grayscale( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'sepia': { filter: 'sepia( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'marvin': { filter: 'invert( %)', options: { range: { min: 0, max: 100, }, start: 0, step: 1, connect: 'lower' } },
  'phobos': { filter: 'blur( px)', options: { range: { min: 0, max: 3, }, start: 0, step: 0.1, connect: 'lower' } },
  'heat': { filter: 'brightness( )', options: { range: { min: 1, max: 3, }, start: 1, step: 0.1, connect: 'lower' } },
};

noUiSlider.create(scaleSlider, effectsPresets['chrome'].options);

let prevEffect = 'effects__preview--none';
function changePreviewEffectClass(newEffectName) {
  preview.classList.remove(prevEffect);
  const newEffect = `effects__preview--${newEffectName}`;
  preview.classList.add(newEffect);
  prevEffect = newEffect;
}

const changeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const newEffectName = evt.target.value;
    changePreviewEffectClass(newEffectName);

    if (newEffectName !== 'none') {
      if (scaleSlider.classList.contains('hidden')) {
        scaleSlider.classList.remove('hidden');
      }
      scaleSlider.noUiSlider.updateOptions(effectsPresets[newEffectName].options);

      scaleSlider.noUiSlider.on('update', () => {
        effectLevel.value = scaleSlider.noUiSlider.get();
        const filter = effectsPresets[newEffectName].filter.replace(' ', effectLevel.value);
        preview.style.filter = filter;
      });
    }
    else {
      preview.style.filter = 'none';
      scaleSlider.classList.toggle('hidden');
    }
  }
};

function resize(limit) {
  let k = -1;
  if (limit === '100%') {
    k = 1;
  }
  if (scaleControl.value !== limit) {
    const scaleControlValueNumber = Number(scaleControl.value.replace('%', '')) + 25 * k;
    scaleControl.value = `${scaleControlValueNumber}%`;
    preview.style.transform = `scale(${scaleControlValueNumber / 100})`;
  }
}

const escapeFileUpload = (evt) => {
  if (evt.key === 'Escape') {
    closeFileUpload();
  }
};

function openFileUpload() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleSlider.classList.add('hidden');
  document.addEventListener('keydown', escapeFileUpload);

  imageUpload.addEventListener('change', changeEffect);
  smallerBtn.onclick = () => resize('25%');
  biggerBtn.onclick = () => resize('100%');
  checkForm(imageUpload, hashtagsInput, commentInput);
  cancelBtn.onclick = closeFileUpload;
}

function closeFileUpload() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUpload.reset();
  preview.style.filter = 'none';
  document.removeEventListener('keydown', escapeFileUpload);
  imageUpload.removeEventListener('change', changeEffect);
}

export function uploadingForm() {
  uploadBtn.onclick = openFileUpload;
}

