import {DESCRIPTIONS} from './data.js';
import {getRandomNumber} from './util.js';

export function createUsersPictures(amount) {
  const userImgDescriptions = Array.from({length: amount}, DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)]);
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  userImgDescriptions.forEach(({ url, comments, likes }) => {
    const userPicture = pictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    userPicture.querySelector('.picture__likes').textContent = likes;
    picturesList.append(userPicture);
  });
  return userImgDescriptions;
}
