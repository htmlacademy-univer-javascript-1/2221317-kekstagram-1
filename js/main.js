function getRandomNumber(from, to) {
    if (from < 0 || to < 0) return 'Диапазон может быть только положительным'
    if (from > to) {            //При значении "от", большим, чем значение "до", функция переворачивает данный отрезок и всё равно возвращает псевдорандомное числов указанном диапазоне.
        from, to = to, from     //При равных введённых значениях "от" и "до" функция вернёт это значение.
    }
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function checkStringLength(line, maxLength) {
    return line.length <= maxLength;
}
//вот отсюда начинаются новые методы
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Ира', 'Юля', 'Крис', 'Дарина', 'Лиза', 'Андрей', 'Данис', 'Настя', 'Лера'];

function createPhoto() {
    let newPhoto = {
        id: getID('photoID'),
        url: `photos/${getID('photoURL')}.jpg`,
        description: 'Невероятно красивая картинка',
        likes: getRandomNumber(15, 200),
        comments: Array.from({length: getRandomNumber(1, 3)}, createComment)
    };
    photosIdList.push(newPhoto.id);
    return newPhoto;
}

function createComment() {
    let newComment = {
        id: commentsIdList.length,
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
        name: NAMES[Math.floor(Math.random() * NAMES.length)]
    }
    commentsIdList.push(newComment.id);
    return newComment;
}

function getID(property) {
    switch(property) {
        case 'photoID':
            return photosIdList.length + 1
        case 'photoURL':
            return photosIdList.length + 1
    }
}


let commentsIdList = [];
let photosIdList = [];
photosList = Array.from({length: 25}, createPhoto);

