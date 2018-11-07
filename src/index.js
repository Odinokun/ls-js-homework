/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива,
 который будет передан в параметре array
 */
function forEach(array, fn) {

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }

}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

    let arr = [];

    for (let i = 0; i < array.length; i++) {

        arr.push(fn(array[i], i, array));

    }

    return arr;

}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {

    let result;
    let i;

    if (initial) {
        result = initial;

        for (i = 0; i < array.length; i++) {
            result = fn(result, array[i], i, array);
        }
    } else {
        result = array[0];

        for (i = 1; i < array.length; i++) {
            result = fn(result, array[i], i, array);
        }
    }

    return result;

}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    let arr = Object.keys(obj).join().toUpperCase().split(',');

    return arr;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива,
 который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {

    let sliceArr = [],
        start,
        finish;

    if (from < (0 - array.length)) {
        start = 0;
    } else if (from < 0) {
        start = from + array.length;
    } else if (isFinite(from)) {
        start = from;
    } else {
        start = 0;
    }

    if (to < 0) {
        finish = to + array.length;
    } else if (to > array.length) {
        finish = array.length;
    } else if (isFinite(to)) {
        finish = to;
    }

    for (let i = start; i < finish; i++) {
        sliceArr.push(array[i]);
    }

    return sliceArr;

}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств
 и возводить это значение в квадрат
 */
function createProxy(obj) {

    let proxy = new Proxy(obj, {
        set: function(target, name, value) {

            target[name] = value * value;

            return true;
        }

    });

    return proxy;

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
