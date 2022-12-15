import {createUsersPictures, picturesList} from './gallery.js';
import {getRandomPositiveInt, throttle} from './util.js';

const picturesListHeader = picturesList.children[0];
const uploadPicBtn = picturesList.children[1];
const filter = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const popularBtn = document.querySelector('#filter-discussed');
let currentActiveButton = defaultFilter;

function comparePopulars(a, b) {
  if (a.comments.length < b.comments.length) {
    return 1;
  }
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  return 0;
}

function removeNods(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function addStaticElementsToPicturesList() {
  picturesList.appendChild(picturesListHeader);
  picturesList.appendChild(uploadPicBtn);
}

function removeUserPhoto() {
  removeNods(picturesList);
  addStaticElementsToPicturesList();
}

function setActive(button) {
  currentActiveButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  currentActiveButton = button;
}

function getRandomUsersPictures(data) {
  const randomPics = data.slice();
  while (randomPics.length > 10) {
    randomPics.splice(getRandomPositiveInt(0, randomPics.length), 1);
  }
  return randomPics;
}

const useFilter = (filtredData) => {
  removeUserPhoto();
  createUsersPictures(filtredData);
};

function setDefaultClick(cb, data) {
  defaultFilter.onclick = (evt) => {
    setActive(evt.target);
    cb(data);
  };
}

function setRandomClick(cb, data) {
  randomBtn.onclick = (evt) => {
    setActive(evt.target);
    const randomPics = getRandomUsersPictures(data);
    cb(randomPics);
  };
}

function setPopularClick(cb, data) {
  popularBtn.onclick = (evt) => {
    setActive(evt.target);
    cb(data.slice().sort(comparePopulars));
  };
}

function onFilterButtonsClick(data) {
  setDefaultClick(throttle(useFilter), data);
  setRandomClick(throttle(useFilter), data);
  setPopularClick(throttle(useFilter), data);
}

function showFilter(data) {
  filter.classList.remove('img-filters--inactive');
  onFilterButtonsClick(data);
}

export {showFilter};
