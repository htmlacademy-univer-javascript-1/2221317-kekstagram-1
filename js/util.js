import {COMMENTS, NAMES, DESCRIPTIONS, commentsIdList} from './data.js';

function getRandomNumber(from, to) {
  if (from < 0 || to < 0 || to < from) {
    return -1;
  }
  return Math.round(from - 0.5 + Math.random() * (to - from + 1));
}

const checkStringLength = (string, maxLength) => string.length <= maxLength;
//вот отсюда начинаются новые методы

function createPhoto(id) {
  const newPhoto = {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
    likes: getRandomNumber(15, 200),
    comments: createComment(getRandomNumber(5, 16))
  };
  return newPhoto;
}

function createComment(count) {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments[i] = {
      id: commentsIdList.length,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: COMMENTS[getRandomNumber(0, COMMENTS.length)],
      name: NAMES[getRandomNumber(0, NAMES.length)]
    };
  }
  return comments;
}

function throttle(callback, delayBetweenFrames = 500) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomNumber, checkStringLength, createPhoto, createComment, throttle};
