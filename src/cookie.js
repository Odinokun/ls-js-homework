// /*
//  ДЗ 7 - Создать редактор cookie с возможностью фильтрации
//
//  7.1: На странице должна быть таблица со списком имеющихся cookie.
//  Таблица должна иметь следующие столбцы:
//    - имя
//    - значение
//    - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
//
//  7.2: На странице должна быть форма для добавления новой cookie.
//  Форма должна содержать следующие поля:
//    - имя
//    - значение
//    - добавить (при нажатии на кнопку, в браузер и таблицу
//    добавляется новая cookie с указанным именем и значением)
//
//  Если добавляется cookie с именем уже существующией cookie,
//  то ее значение в браузере и таблице должно быть обновлено
//
//  7.3: На странице должно быть текстовое поле для фильтрации cookie
//  В таблице должны быть только те cookie, в имени или значении которых,
//  хотя бы частично, есть введенное значение
//  Если в поле фильтра пусто, то должны выводиться все доступные cookie
//  Если дабавляемая cookie не соответсвуте фильтру,
//  то она должна быть добавлена только в браузер, но не в таблицу
//  Если добавляется cookie, с именем уже существующией cookie и ее новое значение
//  не соответствует фильтру, то ее значение должно быть обновлено в браузере,
//  а из таблицы cookie должна быть удалена
//
//  Запрещено использовать сторонние библиотеки.
//  Разрешено пользоваться только тем, что встроено в браузер
//  */
//
// /*
//  homeworkContainer - это контейнер для всех ваших домашних заданий
//  Если вы создаете новые html-элементы и добавляете их на страницу,
//  то дабавляйте их только в этот контейнер
//
//  Пример:
//    const newDiv = document.createElement('div');
//    homeworkContainer.appendChild(newDiv);
//  */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// создаем объект из cookie
function createCookieObj() {
    let cookieList = document.cookie.split('; ');
    let allCookieObj = {};

    for (let cookie of cookieList) {
        let [cookieName, cookieValue] = cookie.split('=');

        allCookieObj[cookieName] = cookieValue;
    }

    return allCookieObj;
}

// добавление строки в таблицу
function addRowToTable(obj) {
    // очищаем таблицу
    listTable.innerHTML = '';

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let tableTr = document.createElement('tr'); // строка в таблице
            let tableTd1 = document.createElement('td'); // ячейка в строке
            let tableTd2 = document.createElement('td'); // ячейка в строке
            let tableTd3 = document.createElement('td'); // ячейка в строке
            let delCookieBtn = document.createElement('button'); // кнопка удаления cookie

            listTable.appendChild(tableTr); // создали строку
            tableTr.appendChild(tableTd1).textContent = key; // создали ячейку с name
            tableTr.appendChild(tableTd2).textContent = obj[key]; // создали ячейку с value
            tableTr.appendChild(tableTd3).appendChild(delCookieBtn).textContent = 'Удалить'; // создали кнопку удаления cookie
        }
    }
}

// удаление cookie из таблицы и кук
listTable.addEventListener('click', e => {
    const nameCookieForDelete = e.path[2].firstChild.textContent;

    if (e.target.tagName === 'BUTTON') {
        e.path[2].remove();
        document.cookie = `${nameCookieForDelete} = del; expires = Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
});

// функция фильтрации
function isMatching(name, value, chunk) {
    if (name.search(chunk) !== -1 || value.search(chunk) !== -1) {
        return true
    }
}

// прослушка добавления кук
addButton.addEventListener('click', () => {
    let obj;

    // если поля не пустые, а поле фильтра пустое, то ...
    if (addNameInput.value !== '' && addValueInput.value !== '' && filterNameInput.value === '') {
        // создаем cookie с значением из соответствующих полей
        document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
        obj = createCookieObj();

        // заполняем таблицу
        addRowToTable(obj);
        // очищаем поля для ввода новых cookie
        addNameInput.value = '';
        addValueInput.value = '';
    }
    // если поля не пустые и поле фильтра не пустое, то ...
    if (addNameInput.value !== '' && addValueInput.value !== '' && filterNameInput.value !== '') {
        // создаем cookie с значением из соответствующих полей
        document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
        obj = createCookieObj();
        let inputValue = filterNameInput.value;
        let filteredObj = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (isMatching(key, obj[key], inputValue)) {
                    filteredObj[key] = obj[key];
                }
            }
        }
        // заполняем таблицу
        addRowToTable(filteredObj);
        // очищаем поля для ввода новых cookie
        addNameInput.value = '';
        addValueInput.value = '';
    }
});

// прослушка фильтрации кук
filterNameInput.addEventListener('keyup', () => {
    let obj;
    let inputValue = filterNameInput.value;

    // если поле фильтра наполнено приключениями как жизнь сына маминой подруги, то...
    if (inputValue !== '') {
        obj = createCookieObj();
        let filteredObj = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (isMatching(key, obj[key], inputValue)) {
                    filteredObj[key] = obj[key];
                }
            }
        }
        // заполняем таблицу
        addRowToTable(filteredObj);
    } else {
        obj = createCookieObj();

        // заполняем таблицу
        addRowToTable(obj);
    }

});
