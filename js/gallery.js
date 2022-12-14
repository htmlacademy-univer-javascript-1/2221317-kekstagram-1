import {showBigPic, update} from './bigPic.js';
import {DESCRIPTIONS} from './data.js';
import {getRandomNumber} from './util.js';
import {postsCount} from './main.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createUsersPicture(userImgDescription, fragment) {
  const {url, comments, likes} = userImgDescription;
  const userPicture = pictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  userPicture.querySelector('.picture__likes').textContent = likes;
  fragment.append(userPicture);

  userPicture.onclick = () => {
    showBigPic();
    update(userImgDescription);
  };
}

export function createUsersPictures() {
  const userImgDescriptions = Array.from({length: postsCount}, DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)]);
  const fragment = document.createDocumentFragment();
  userImgDescriptions.forEach((userImgDescription) => {
    createUsersPicture(userImgDescription, fragment);
  });
  picturesList.append(fragment);
}
