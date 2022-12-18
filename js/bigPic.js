/* eslint-disable no-use-before-define */
import { body } from './main.js';

const bigPicElement = document.querySelector('.big-picture');
const bigPicImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPicDescription = bigPicElement.querySelector('.social__caption');
const currentCommentsCount = bigPicElement.querySelector('.current-comments-count');
const commentsLoadButton = bigPicElement.querySelector('.comments-loader');
const commentsCount = bigPicElement.querySelector('.comments-count');
const likesCount = bigPicElement.querySelector('.likes-count');
const picComments = bigPicElement.querySelector('.social__comments');
const commentTemplate = picComments.querySelector('.social__comment');
const cancelBtn = bigPicElement.querySelector('#picture-cancel');
let uptoDateCommentsCount = 0;

function showBigPic() {
  body.classList.add('modal-open');
  bigPicElement.classList.remove('hidden');
  document.addEventListener('keydown', escapeBigPic);
}

function closeBigPic() {
  body.classList.remove('modal-open');
  bigPicElement.classList.add('hidden');
  document.removeEventListener('keydown', escapeBigPic);
  uptoDateCommentsCount = 0;
}

const escapeBigPic = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPic();
  }
};


const loadComments = (comments) => {
  comments.slice(uptoDateCommentsCount, uptoDateCommentsCount + 5).forEach(({ avatar, message }) => {
    const userComment = commentTemplate.cloneNode(true);
    const userCommentAvatar = userComment.querySelector('img');
    userCommentAvatar.src = avatar;
    const userCommentMessage = userComment.querySelector('p');
    userCommentMessage.textContent = message;
    picComments.append(userComment);
    uptoDateCommentsCount++;
  });
  currentCommentsCount.textContent = uptoDateCommentsCount;
};

function update({ url, description, likes, comments }) {
  bigPicImg.src = url;
  bigPicDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  picComments.innerHTML = '';
  loadComments(comments);
  commentsLoadButton.onclick = () => loadComments(comments);
}

export function BigPictureHandler() {
  cancelBtn.onclick = closeBigPic;
}

export {showBigPic, closeBigPic, update};
