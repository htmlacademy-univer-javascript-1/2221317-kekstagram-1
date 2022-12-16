import {body} from './main.js';
import {checkForm, onFocusIgnoreEscKeydown} from './checkForm.js';
import {sendData} from './api.js';

const imageUpload = document.querySelector('.img-upload__form');
const hashtagsInput = imageUpload.querySelector('.text__hashtags');
const commentInput = imageUpload.querySelector('.text__description');
const uploadBtn = document.querySelector('#upload-file');
const cancelBtn = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const smallerBtn = imageUpload.querySelector('.scale__control--smaller');
const biggerBtn = imageUpload.querySelector('.scale__control--bigger');
const scaleControl = imageUpload.querySelector('.scale__control--value');
const preview = imageUpload.querySelector('.img-upload__preview').querySelector('img');
const scaleSlider = imageUpload.querySelector('.effect-level__slider');
const effectLevel = imageUpload.querySelector('.effect-level__value');
const submitBtn = imageUpload.querySelector('#upload-submit');
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
let message = undefined;

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

const escapeMessage = (evt, messageBlock, abortController) => {
  if (evt.key === 'Escape') {
    removeMessageBlock(messageBlock, abortController);
  }
};

const messageOutClick = (evt, messageBlock, isError, abortController) => {
  if (!evt.target.closest(`.${isError ? 'error' : 'success'}__inner`)) {
    removeMessageBlock(messageBlock, abortController);
  }
};

function removeMessageBlock(messageBlock, abortController) {
  abortController.abort();
  document.addEventListener('keydown', escapeFileUpload);
  body.removeChild(messageBlock);
}

function createMessageBlock(isError) {
  document.removeEventListener('keydown', escapeFileUpload);
  const messageTemplate = document.querySelector(`#${isError ? 'error' : 'success'}`).content.querySelector('section');
  const messageClone = messageTemplate.cloneNode(true);
  const button = messageClone.querySelector('button');
  body.append(messageClone);
  const abortController = new AbortController();
  button.onclick = () => removeMessageBlock(messageClone, abortController);
  messageClone.onclick = (evt) => messageOutClick(evt, messageClone, isError, abortController);
  document.addEventListener('keydown', (evt) => escapeMessage(evt, messageClone, abortController), { signal: abortController.signal });
}
function createPostMessage() {
  const messageTemplate = document.querySelector('#messages').content.querySelector('div');
  const messageClone = messageTemplate.cloneNode(true);
  body.append(messageClone);
  return messageClone;
}

function removePostMessage(messageClone) {
  body.removeChild(messageClone);
}

function confirmPost() {
  imageUpload.reset();
  preview.src = 'img/upload-default-image.jpg';
  preview.style.filter = 'none';
  createMessageBlock(false);
}

function breakPost() {
  createMessageBlock(true);
}

function blockSubmitButton() {
  submitBtn.disabled = true;
  message = createPostMessage();
}

function unblockSubmitButton() {
  submitBtn.disabled = false;
  removePostMessage(message);
}

const setUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (checkForm(imageUpload, hashtagsInput, commentInput)) {
    blockSubmitButton();
    sendData(confirmPost, breakPost, new FormData(evt.target), unblockSubmitButton);
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
  cancelBtn.onclick = closeFileUpload;
  hashtagsInput.onkeydown = commentInput.onkeydown = onFocusIgnoreEscKeydown;
  imageUpload.addEventListener('submit', setUploadFormSubmit);
}

function closeFileUpload() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUpload.reset();
  preview.style.filter = 'none';
  document.removeEventListener('keydown', escapeFileUpload);
  imageUpload.removeEventListener('change', changeEffect);
  imageUpload.removeEventListener('submit', setUploadFormSubmit);
}

export function uploadingForm() {
  uploadBtn.onclick = openFileUpload;
}

export {preview};
