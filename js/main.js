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
