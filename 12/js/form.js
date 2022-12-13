import {body} from './main.js';
import {checkForm} from './checkForm.js';

const imageUpload = document.querySelector('.img-upload__form');
const hashtagsInput = imageUpload.querySelector('.text__hashtags');
const commentInput = imageUpload.querySelector('.text__description');

const uploadBtn = document.querySelector('#upload-file');
const cancelBtn = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const escapeFileUpload = (evt) => {
  if (evt.key === 'Escape') {
    closeFileUpload();
  }
};

function openFileUpload() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escapeFileUpload);
  checkForm(imageUpload, hashtagsInput, commentInput);
}

function closeFileUpload() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeFileUpload);
  uploadBtn.value = hashtagsInput.value = commentInput.value = '';
}

uploadBtn.onclick = openFileUpload;
cancelBtn.onclick = closeFileUpload;
