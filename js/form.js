import {body} from './main.js';


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
}

function closeFileUpload() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeFileUpload);
  uploadBtn.value = '';
}

uploadBtn.onclick = openFileUpload;
cancelBtn.onclick = closeFileUpload;
