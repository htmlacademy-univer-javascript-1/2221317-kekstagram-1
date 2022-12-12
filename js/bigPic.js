/* eslint-disable no-use-before-define */
import { body } from './main.js';

const bigPicElement = document.querySelector('.big-picture');
const bigPicImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPicDescription = bigPicElement.querySelector('.social__caption');
const bigPicCurrentCommentsCount = bigPicElement.querySelector('.current-comms-count');
const loadCommentBtn = bigPicElement.querySelector('.comms-loader');
const commentsCount = bigPicElement.querySelector('.comms-count');
const likesCount = bigPicElement.querySelector('.likes-count');
const comments = bigPicElement.querySelector('.social__comments');
const commentTemplate = comments.querySelector('.social__comment');
const cancelBtn = bigPicElement.querySelector('#picture-cancel');
let currentCommentsCount = 0;

function showBigPic() {
  bigPicElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escapeBigPic);
}

function closeBigPic() {
  bigPicElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeBigPic);
  currentCommentsCount = 0;
}

const escapeBigPic = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPic();
  }
};


function loadComments(comms) {
  comms.slice(currentCommentsCount, currentCommentsCount + 5).forEach(({ avatar, message }) => {
    const userComment = commentTemplate.cloneNode(true);
    const userCommentAvatar = userComment.querySelector('img');
    userCommentAvatar.src = avatar;
    const userCommentMessage = userComment.querySelector('p');
    userCommentMessage.textContent = message;
    comments.append(userComment);
    currentCommentsCount++;
  });
  bigPicCurrentCommentsCount.textContent = currentCommentsCount;
}

function update({url, description, likes, comms}) {
  bigPicImg.src = url;
  bigPicDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comms.length;
  comments.innerHTML = '';
  loadComments(comms);
  loadCommentBtn.onclick = () => loadComments(comms);
}

function BigPictureHandler() {
  cancelBtn.onclick = closeBigPic;
}

export {showBigPic, closeBigPic, update, BigPictureHandler};
