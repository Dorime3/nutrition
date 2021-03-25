function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span'); // получаем результат подсчета ккал и выводим на страницу
    let sex, height, weight, age, ratio; // задаем динамические переменные, которые мы получим от пользователя со страницы

    if (localStorage.getItem('sex')) { // получаем значение из localStorage, если есть - 
        sex = localStorage.getItem('sex'); // то присваиваем это значение в переменную
    } else { // если нет - 
        sex = 'female'; // устанавливаем женщину по умолчанию
        localStorage.setItem('sex', sex); // и заносим ее в localStorage
    }

    if (localStorage.getItem('ratio')) { // аналогично для активности жизнедеятельности
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() { // функция для подсчета ккал
        if (!sex || !height || !weight || !height || !age || !ratio) { // проверяем, если хоть одно значение пустое (а если пустое то это - false)
            result.textContent = '0000'; // то прописываем результат - 0000 и выходим из функции
            return;
        }
        if (sex === 'female') { // если пол - женский, то формула подсчета ккал следующая
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { // если мужской - 
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }
    calcTotal(); // вызываем 

    function initLocalSettings(selector, activeClass) { // функция для назначения класса активности наших кнопок из localStorage(1аргумент - уникальный идентификатор или класс наших элементов, 2арг - класс активности)
        const elements = document.querySelectorAll(selector); // получаем массив наших элементов
        elements.forEach(elem => { // перебираем 
            elem.classList.remove(activeClass); // удаляем у каждого класс активности
            if (elem.getAttribute('id') === localStorage.getItem('sex')) { // перебираем, и если значение атрибута совпадает со значением из localStorage
                elem.classList.add(activeClass); // Добавляем ему класс активности
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){ // аналогично для атрибута активности ЖД
                elem.classList.add(activeClass);
            }
        });
    }


    function getStaticInformation(selector, activeClass) { // функция для назначения класса активности кнопок по нажатию на них(1аргумент - уникальный идентификатор или класс наших элементов, 2арг - класс активности)
        const elements = document.querySelectorAll(selector); // получаем массив с элементами

        elements.forEach(elem => { // каждому элементу массива
            elem.addEventListener('click', (e) => { // вешаем событие по клику, передаем елемент (делегирование событий)
                if (e.target.getAttribute('data-ratio')) { // если выбранный элемент имеет атрибут data-ratio
                    ratio = +e.target.getAttribute('data-ratio'); // то присваиваем ему числовое свойство в переменную активности ЖД
                    localStorage.setItem('ratio', ratio); // и заносим его в localStorage 
                } else {
                    sex = e.target.getAttribute('id'); // если такого атрибута нет - то получаем значение id и записываем его в переменную гендера
                    localStorage.setItem('sex', sex); // заносим в localStorage
                }
    
                elements.forEach(elem => { // очищаем каждый элемент от класса активности
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass); // выбранному элементу добавляем класс активности
                calcTotal(); // подсчитываем результат после каждого клика мыши
            })
        })
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active'); // вызываем, передаем первым аргументом элементы, вторым - класс активности
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) { // функция для ввода числовых значений в поля ввода (инпуты)
        const input = document.querySelector(selector); // получаем элемент в переменную

        input.addEventListener('input', () => { // вешаем событие на инпуты
            if (input.value.match(/\D/g)) { // условие, берем значение инпута, ищем НЕчисла, глобально - если находит - получаем значение true, тогда выполняется следующее условие:
                input.style.border = '1px solid red'; // берем инпут и красим бордер в красный цвет
            } else {
                input.style.border = 'none'; // если не находит то обратно убираем бордер
            }
            switch(input.getAttribute('id')) { // условием проверяем, если инпут иммет атрибут id
                case 'height': // высоты - присваиваем значение высоты в переменную высоты (не забываем унарный оператор "+")
                    height = +input.value;
                    break;
                case 'weight':// аналогично
                    weight = +input.value;
                    break;
                case 'age':// аналогично
                    age = +input.value;
                    break;
            }
            calcTotal() // вызываем после каждого события перерасчет ккал
        })
    }

    getDinamicInformation('#height'); //вызываем функцию со значением id 
    getDinamicInformation('#weight'); //
    getDinamicInformation('#age'); // 
}


module.exports = calc;