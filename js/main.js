import { getData } from './api.js';
import { BigPictureHandler } from './bigPic.js';
import { uploadingForm } from './form.js';
import { createUsersPictures } from './gallery.js';
import './preview.js';


const body = document.querySelector('body');

function getError(errorMessage) {
  const errorTemplate = document.querySelector('#error').content.querySelector('section');
  const error = errorTemplate.cloneNode(true);
  error.querySelector('h2').textContent = errorMessage;
  error.querySelector('button').remove();
  body.append(error);
  setTimeout(() => {
    error.remove();
  }, 5000);
}

getData(createUsersPictures, getError);
BigPictureHandler();
uploadingForm();

export { body };
