/* eslint-disable no-use-before-define */
import { body } from './main.js';

const bigPicElement = document.querySelector('.big-picture');
const bigPicImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPicDescription = bigPicElement.querySelector('.social__caption');
const bigPicCurrentCommentsCount = bigPicElement.querySelector('.current-comments-count');
const loadCommentBtn = bigPicElement.querySelector('.comments-loader');
const commentsCount = bigPicElement.querySelector('.comments-count');
const likesCount = bigPicElement.querySelector('.likes-count');
const comments = bigPicElement.querySelector('.social__comments');
const commentTemplate = comments.querySelector('.social__comment');
const cancelBtn = bigPicElement.querySelector('#picture-cancel');
let currentComments = 0;

function showBigPic() {
  bigPicElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', escapeBigPic);
}

function closeBigPic() {
  bigPicElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeBigPic);
  currentComments = 0;
}

const escapeBigPic = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPic();
  }
};

function loadComments(comms) {
  comms.slice(currentComments, currentComments + 5).forEach(({ avatar, message }) => {
    const userComment = commentTemplate.cloneNode(true);
    const userCommentAvatar = userComment.querySelector('img');
    userCommentAvatar.src = avatar;
    const userCommentMessage = userComment.querySelector('p');
    userCommentMessage.textContent = message;
    comments.append(userComment);
    currentComments++;
  });
  bigPicCurrentCommentsCount.textContent = currentComments;
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

export function BigPictureHandler(usersImgDescriptions) {
  const userPictures = document.querySelectorAll('.picture');
  userPictures.forEach((picture, i) => {
    const {url, description, likes, comms} = usersImgDescriptions[i];
    picture.onclick = function () {
      showBigPic();
      update(url, description, likes, comms);
      cancelBtn.onclick = closeBigPic;
    };
  });
}

export {showBigPic, closeBigPic, update};
