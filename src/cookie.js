/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie.
 Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie.
 Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу
   добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie,
 то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых,
 хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру,
 то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение
 не соответствует фильтру, то ее значение должно быть обновлено в браузере,
 а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки.
 Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу,
 то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
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

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', () => {
    // создали cookie с значением из соответствующих полей
    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;

    // строка в таблице
    let tableTr = document.createElement('tr');
    // ячейки в строке
    let tableTd1 = document.createElement('td');
    let tableTd2 = document.createElement('td');
    let tableTd3 = document.createElement('td');
    // кнопку удаления cookie
    let delCookieBtn = document.createElement('button');

    listTable.appendChild(tableTr); // создали строку
    tableTr.appendChild(tableTd1).textContent = addNameInput.value; // создали ячейку с именем
    tableTr.appendChild(tableTd2).textContent = addValueInput.value; // создали ячейку с значением
    tableTr.appendChild(tableTd3).appendChild(delCookieBtn).textContent = 'Удалить'; // создали кнопку удаления cookie

    // очистили поля для ввода новых cookie
    addNameInput.value = '';
    addValueInput.value = '';
});

// удаление cookie из таблицы
listTable.addEventListener('click', e => {
    const nameCookieForDelete = e.path[2].firstChild.textContent;

    if (e.target.tagName === 'BUTTON') {
        e.path[2].remove();
        document.cookie = `${nameCookieForDelete} = del; expires = Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
});

