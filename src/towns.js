/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Надпись и кнопка при ошибке */
const errorText = document.createElement('h2');
const errorBtn = document.createElement('button');

errorText.textContent = 'Не удалось загрузить города';
errorBtn.textContent = 'Повторить';

function isMatching(full, chunk) {
    chunk = new RegExp(chunk, 'i');
    let res = full.match(chunk);

    return res !== null;
}

function sortArr(arr) {
    arr.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });
}

function clearFilter() {
    while (filterResult.firstChild) {
        filterResult.removeChild(filterResult.firstChild);
    }
}

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve) => {
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then(response => {
                if (response.status >= 400) {
                    return Promise.reject();
                }

                return response.json()
            })
            .then(data => {
                sortArr(data);

                loadingBlock.textContent = ''; // удаляем надпись "Загрузка..."
                filterBlock.style = 'block'; // показываем блок с полем ввода

                resolve(data);
            })
            .catch(() => {
                loadingBlock.textContent = ''; // удаляем надпись "Загрузка..."
                homeworkContainer.appendChild(errorText);
                homeworkContainer.appendChild(errorBtn);

                errorBtn.addEventListener('click', () => {
                    errorText.remove();
                    errorBtn.remove();
                    loadTowns();
                })
            })

    });
}

loadTowns();

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
filterInput.addEventListener('keyup', () => {
    loadTowns()
        .then(cities => {
            // очистка результатов фильтра
            clearFilter();

            // значение инпута
            const value = filterInput.value;
            // сравнение значения инпута и массива городов
            const filteredCities = cities.filter((city) => {
                return isMatching(city.name, value);
            });

            // проверяем инпут на заполненность
            if (value.length > 0) {
                // наполняем список отобранными городами
                filteredCities.forEach(city => {
                    const div = document.createElement('div');

                    div.textContent = city.name;
                    filterResult.appendChild(div);
                });
            } else {
                // очистка результатов фильтра при пустом инпуте
                clearFilter();
            }
        })
});

export {
    loadTowns,
    isMatching
};
