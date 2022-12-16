const FileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const selectFile = document.querySelector('#upload-file');
import { preview } from './form.js';

selectFile.onchange = () => {
  const file = selectFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};
