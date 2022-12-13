const imageUpload = document.querySelector('.img-upload__form');
const hashtagsInput = imageUpload.querySelector('.text__hashtags');
const commentInput = imageUpload.querySelector('.text__description');
const pristine = new Pristine(imageUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const hashtagRegularExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function onFocusIgnoreEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function checkHashtag(value) {
  const hashtags = value.split(' ');
  const uniqueHashtags = [...new Set(hashtags)];
  for (const hashtag of hashtags) {
    if (!hashtagRegularExp.test(hashtag)) {
      return false;
    }
  }
  return hashtags.length <= 5 && hashtags.length === uniqueHashtags.length;
}

function checkComment(value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagsInput,
  checkHashtag,
);

pristine.addValidator(
  commentInput,
  checkComment,
);

hashtagsInput.onkeydown = onFocusIgnoreEscKeydown;
commentInput.onkeydown = onFocusIgnoreEscKeydown;

imageUpload.onsubmit = function (evt) {
  evt.preventDefault();
  pristine.validate();
};
