import {createPhoto} from './util.js';
import {createProfilePic, createFragment} from './draw.js';
import {BigPictureHandler} from './bigPicture.js';

const postsCount = 25;
const postsList = [];
for (let i = 1; i <= postsCount; i++) {
  postsList.push(createPhoto(i));
}
const picsArray = document.querySelector('.pictures');
picsArray.append(createFragment(postsList, createProfilePic));
