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

function checkForm(imgForm, hashtag, comment) {
  const pristine = new Pristine(imgForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error'
  });
  pristine.addValidator(
    hashtag,
    checkHashtag,
    'Максимальная длина одного хэш-тега 20 символов, включая решётку; нельзя указать больше 5 хэш-тегов.'
  );

  pristine.addValidator(
    comment,
    checkComment,
    'Длина комментария не может составлять больше 140 символов.'
  );

  hashtag.onkeydown = onFocusIgnoreEscKeydown;
  comment.onkeydown = onFocusIgnoreEscKeydown;

  imgForm.onsubmit = function (evt) {
    evt.preventDefault();
    pristine.validate();
  };
}

export {checkForm};
