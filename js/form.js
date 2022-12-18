import { sendData } from './api.js';
import { body } from './main.js';
import { checkForm, onFocusIgnoreEscKeydown } from './checkForm.js';

const imageUpload = document.querySelector('.img-upload__form');
const hashtagsInput = imageUpload.querySelector('.text__hashtags');
const commentInput = imageUpload.querySelector('.text__description');
const uploadBtn = document.querySelector('#upload-file');
const cancelBtn = imageUpload.querySelector('#upload-cancel');
const uploadOverlay = imageUpload.querySelector('.img-upload__overlay');

const smallerBtn = imageUpload.querySelector('.scale__control--smaller');
const biggerBtn = imageUpload.querySelector('.scale__control--bigger');
const scaleControl = imageUpload.querySelector('.scale__control--value');
const preview = imageUpload.querySelector('.img-upload__preview').querySelector('img');
const scaleSlider = imageUpload.querySelector('.effect-level__slider');
const effectLevel = imageUpload.querySelector('.effect-level__value');
const submitBtn = imageUpload.querySelector('#upload-submit');
const effectsData = {
  'chrome': { filter: 'grayscale( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'sepia': { filter: 'sepia( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'marvin': { filter: 'invert( %)', options: { range: { min: 0, max: 100, }, start: 0, step: 1, connect: 'lower' } },
  'phobos': { filter: 'blur( px)', options: { range: { min: 0, max: 3, }, start: 0, step: 0.1, connect: 'lower' } },
  'heat': { filter: 'brightness( )', options: { range: { min: 1, max: 3, }, start: 1, step: 0.1, connect: 'lower' } },
};

noUiSlider.create(scaleSlider, effectsData['chrome'].options);

let previousEffectClass = 'effects__preview--none';
function changePreviewEffectClass(newEffectName) {
  preview.classList.remove(previousEffectClass);
  const newEffectClass = `effects__preview--${newEffectName}`;
  preview.classList.add(newEffectClass);
  previousEffectClass = newEffectClass;
}

let postMessage = undefined;

const onUploadOverlayEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const newEffectName = evt.target.value;
    changePreviewEffectClass(newEffectName);

    if (newEffectName !== 'none') {
      if (scaleSlider.classList.contains('hidden')) {
        scaleSlider.classList.remove('hidden');
      }
      scaleSlider.noUiSlider.updateOptions(effectsData[newEffectName].options);

      scaleSlider.noUiSlider.on('update', () => {
        effectLevel.value = scaleSlider.noUiSlider.get();
        const filter = effectsData[newEffectName].filter.replace(' ', effectLevel.value);
        preview.style.filter = filter;
      });
    }
    else {
      preview.style.filter = 'none';
      scaleSlider.classList.toggle('hidden');
    }
  }
};

function resizeImgPreview(limit) {
  const k = limit === '100%' ? 1 : -1;
  if (scaleControl.value !== limit) {
    const scaleControlValueNumber = Number(scaleControl.value.replace('%', '')) + 25 * k;
    scaleControl.value = `${scaleControlValueNumber}%`;
    preview.style.transform = `scale(${scaleControlValueNumber / 100})`;
  }
}


const onUploadOverlayEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadOverlay();
  }
};

const onMessageEscKeydown = (evt, messageBlock, abortController) => {
  if (evt.key === 'Escape') {
    removeMessageBlock(messageBlock, abortController);
  }
};

const onMessageClickOutside = (evt, messageBlock, isError, abortController) => {
  if (!evt.target.closest(`.${isError ? 'error' : 'success'}__inner`)) {
    removeMessageBlock(messageBlock, abortController);
  }
};

function removeMessageBlock(messageBlock, abortController) {
  abortController.abort();
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  body.removeChild(messageBlock);
}

function createMessageBlock(isError) {
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  const messageTemplate = document.querySelector(`#${isError ? 'error' : 'success'}`).content.querySelector('section');
  const message = messageTemplate.cloneNode(true);
  const button = message.querySelector('button');
  body.append(message);
  const abortController = new AbortController();
  button.onclick = () => removeMessageBlock(message, abortController);
  message.onclick = (evt) => onMessageClickOutside(evt, message, isError, abortController);
  document.addEventListener('keydown', (evt) => onMessageEscKeydown(evt, message, abortController), { signal: abortController.signal });
}
function createPostMessage() {
  const messageTemplate = document.querySelector('#messages').content.querySelector('div');
  const message = messageTemplate.cloneNode(true);
  body.append(message);
  return message;
}

function removePostMessage(message) {
  body.removeChild(message);
}

function successPost() {
  imageUpload.reset();
  preview.src = 'img/upload-default-image.jpg';
  preview.style.filter = 'none';
  createMessageBlock(false);
}

function failPost() {
  createMessageBlock(true);
}

function blockSubmitButton() {
  submitBtn.disabled = true;
  postMessage = createPostMessage();
}

function unblockSubmitButton() {
  submitBtn.disabled = false;
  removePostMessage(postMessage);
}

const setUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (checkForm(imageUpload, hashtagsInput, commentInput)) {
    blockSubmitButton();
    sendData(successPost, failPost, new FormData(evt.target), unblockSubmitButton);
  }
};

function openUploadOverlay() {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  scaleSlider.classList.add('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  imageUpload.addEventListener('change', onUploadOverlayEffectChange);
  smallerBtn.onclick = () => resizeImgPreview('25%');
  biggerBtn.onclick = () => resizeImgPreview('100%');
  cancelBtn.onclick = closeUploadOverlay;
  hashtagsInput.onkeydown = commentInput.onkeydown = onFocusIgnoreEscKeydown;
  imageUpload.addEventListener('submit', setUploadFormSubmit);
}

function closeUploadOverlay() {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  imageUpload.reset();
  preview.style.filter = 'none';
  preview.src = 'img/upload-default-image.jpg';
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  imageUpload.removeEventListener('change', onUploadOverlayEffectChange);
  imageUpload.removeEventListener('submit', setUploadFormSubmit);
}

function uploadingForm() {
  uploadBtn.onclick = openUploadOverlay;
}

export { uploadingForm, preview };
