import {createPhoto} from './util.js';

const postsCount = 25;
const postsList = [];
for (let i = 1; i <= postsCount; i++) {
  postsList.push(createPhoto(i));
}
