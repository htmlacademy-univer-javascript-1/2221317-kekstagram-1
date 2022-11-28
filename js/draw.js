const pictureTemplate = document.querySelector('#picture').content;
const createProfilePic = function(user) {
  const userPic = pictureTemplate.cloneNode(true);
  userPic.querySelector('.picture__img').src = user.url;
  userPic.querySelector('.picture__comments').textContent = user.comments.length;
  userPic.querySelector('.picture__likes').textContent = user.likes;
  return userPic;
};
const createFragment = function(array, fn) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++){
    fragment.append(fn(array[i]));
  }
  return fragment;
};

export {pictureTemplate, createProfilePic, createFragment};
