function getData(onSuccess, onError) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
}

function sendData(onSuccess, onError, body, unblockSubmitButton) {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: body
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      onError();
    })
    .finally(() => {
      unblockSubmitButton();
    });
}

export {getData, sendData};
