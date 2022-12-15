import {createPhoto} from './util.js';
import {createProfilePic, createFragment} from './draw.js';
import {BigPictureHandler} from './bigPic.js';
import {createUsersPictures} from './gallery.js';
import {uploadingForm} from './form.js';
import './checkForm.js';
import {getData} from './api.js';

const postsCount = 25;
const postsList = [];
for (let i = 1; i <= postsCount; i++) {
  postsList.push(createPhoto(i));
}
const picsArray = document.querySelector('.pictures');
picsArray.append(createFragment(postsList, createProfilePic));
BigPictureHandler(createUsersPictures(postsCount));
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

export {body, postsCount};
