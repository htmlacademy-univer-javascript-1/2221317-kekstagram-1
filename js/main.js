import {getRandomNumber, checkStringLength, createPhoto, createComment} from './util.js';

const postsCount = 25;
let postsList = [];
for (let i = 1; i <= postsCount; i++) {
  postsList.push(createPhoto(i));
}
