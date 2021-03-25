/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
        // cards

        class MenuCard { // задаем класс для карточек
            constructor (src, alt, title, subtitle, price, parentElement, ...classes) { // последний аргумент это rest оператор, образует массив с аргументами
                this.src = src, // определяем аргументы через контекст вызова
                this.alt = alt,
                this.title = title,
                this.subtitle = subtitle,
                this.price = price,
                this.parentElement = document.querySelector(parentElement), // также задаем родительский элемент, чтобы поместить в него нашу карточку
                this.classes = classes;
            }
            render() { // Задаем метод
                const element = document.createElement('div');  // создаем див
                if (this.classes.length === 0) {
                    element.classList.add('menu__item'); // если массив пустой, присваиваем аргумент по умолчанию
                } else {
                    this.classes.forEach(item => element.classList.add(item)); // если нет, то перебираем и присваиваем каждый к нашему элементу
                }
    
                element.innerHTML = ` 
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.subtitle}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `; // выводим элемент на страницу, присваиваем в верстку наши переменные через контекст вызова, которые мы определили в классе
                this.parentElement.append(element); // помещаем элемент внутрь родителя
            }
        }
    
        // Получаем наши карточки с БД json
        const getResource = async(url) => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        };
    
        axios.get('http://localhost:3000/menu')
        .then(data => {        
            data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    
        // getResource('http://localhost:3000/menu')
        // .then(data => {
            // data.forEach(({img, altimg, title, descr, price}) => {
            //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //     })
        // })
    
        // getResource('http://localhost:3000/menu')
        // .then(data => createCard(data));
    
        // function createCard(data) {
        //     data.forEach(({img, altimg, title, descr, price}) => {
        //         const element = document.createElement('div');
        //         element.classList.add('menu__item');
        //         element.innerHTML = `
        //             <img src=${img} alt=${altimg}>
        //             <h3 class="menu__item-subtitle">${title}</h3>
        //             <div class="menu__item-descr">${descr}</div>
        //             <div class="menu__item-divider"></div>
        //             <div class="menu__item-price">
        //                 <div class="menu__item-cost">Цена:</div>
        //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
        //             </div>
        //         `;
    
        //         document.querySelector('.menu .container').append(element);
        //     })
        // }
    
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
        // Forms

        const forms = document.querySelectorAll('form'); // получаем формы с idex.html

        const message = { // объект с необходимыми для нас сообщениями
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        forms.forEach(item => { // перебираем формы и для каждой запускаем функцию postData
            bindPostData(item);
        });
    
        const postData = async(url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                //body: formData альтернативный метод JSON - у
                body: data
            });
            return await res.json();
        };
    
        function bindPostData(form) { // 
            form.addEventListener('submit', (e) => { // событие по нажатию кнопки
                e.preventDefault(); // обязательно задаем переменную и отменяем привычное поведение. Тк если этого не сделать страница будет перезагружаться
    
                const statusMessage = document.createElement('img'); // создаем элемент (имг)
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display:block;
                    margin: 0 auto;
                `; // стилизуем
                form.insertAdjacentElement('afterend', statusMessage); // помещаем наш элемент в форму
    
                // const request = new XMLHttpRequest(); // делаем запрос
                // request.open('POST', 'server.php'); // говорим что запрос имеет форму POST и куда отсылать данные
    
                // // request.setRequestHeader('Content-type', 'multipart/form-data'); когда создаем запрос через XMLHttpRequest() и затем отправляем его методом FormData() заголовок (setRequestHeader('Content-type', 'multipart/form-data')) создавать не нужно!
                const formData = new FormData(form); // FormData метод отправки запроса 
    
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
    
                postData('http://localhost:3000/requests', json)
                .then((data) => {
                        console.log(data); // data -это те данные которые нам вернул сервер, которые мы определяем как аргумент и передаем
                        showThanksModal(message.success);  
                        statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
                // request.send(formData); // send - отправляем
    
                // request.addEventListener('load', () => { // событие после загрузки
                //     if (request.status === 200) { // если запрос.статус - все ок
                //         console.log(request.response); // выводим ответ (объект) - необязательно
                //         showThanksModal(message.success); // выводим сообщение о том, что все прошло успешно
                //         form.reset(); // очищаем форму
                //         statusMessage.remove();
                //     } else {
                //         showThanksModal(message.failure); // выводим, если чтото пошло не так
                //     }
                // })
            });
        }
    
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.add('hide');
            open();
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
            `;
            document.querySelector('.modal').append(thanksModal);
    
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                close();
            },4000);
    
        }
    
        // fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));
    
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // Modal

    const   openModal = document.querySelectorAll('[data-modal]'),
            modalWindow = document.querySelector('.modal');

    openModal.forEach(item => {
        item.addEventListener('click', open);
    });

    function open() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timerOpenId);
    }

    function close() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = 'visible';
    }


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            close();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            close();
        }
    });

    const timerOpenId = setTimeout(open, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            open();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
            // slider

            const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            current = document.querySelector('#current'),
            total = document.querySelector('#total'),
            slider = document.querySelector('.offer__slider'),
            slideswrapper = document.querySelector('.offer__slider-wrapper'),
            slidesField = document.querySelector('.offer__slider-inner'), // элемент в котором наши картинки идут подряд(лента)
            width = window.getComputedStyle(slideswrapper).width; // ширина обертки нашего слайдера для конечного пользователя

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // задаем ширину нашего элемента с картинками равного количеству картинок умноженного на 100%

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicators.append(dot);

        dots.push(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }
    }



    slides.forEach (item => {
        item.style.width = width; // задаем ширину каждой картинки равной ширине нашей оберкти
    });

    slidesField.style.display = 'flex'; // выстраиваем нашу ленту в ряд 
    slidesField.style.transition = '0.5s all'; // анимация
    slideswrapper.style.overflow = 'hidden'; // скрываем все, что за пределами нашей обертки

    function dotOpacity() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function currentValue() {
        if (slides.length < 10) { // присваиваем текущему значению значение нашего счетчика
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function deleteNoDiggits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNoDiggits(width) * (slides.length - 1)) { // условие перехода в начало
            offset = 0;
        } else {
            offset += deleteNoDiggits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`; // сдвигаем по оси Х нашу ленту на количество пикселей равной ширине одной картинки

        if (slideIndex == slides.length) { // сбрасываем счетчик
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentValue();

        dotOpacity();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDiggits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDiggits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentValue();

        dotOpacity();

    });

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            currentValue();

            offset = deleteNoDiggits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dotOpacity();
        });
    });

    // simple slider

    //     if (slides.length < 10) {
    //         total.textContent = `0${slides.length}`;
    //     } else {
    //         total.textContent = slides.length;
    //     }


    //     slider(slideIndex);

    //     function slider(n) {
        // if (n> slides.length) {
        //     slideIndex = 1;
        // }
        // if (n < 1) {
        //     slideIndex = slides.length;
        // }
    //         slides.forEach(item => item.style.display = 'none');
    //         slides[slideIndex -1].style.display = 'block';

    //         if (slides.length < 10) {
    //             current.textContent = `0${slideIndex}`;
    //         } else {
    //             current.textContent = slideIndex;
    //         }
    

    //     }

    //     function nextSlide(n) {
    //         slider(slideIndex += n);
    //     }

    //     prev.addEventListener('click', () => {
    //         nextSlide(-1);
    //     });
    
    //     next.addEventListener('click', () => {
    //         nextSlide(1);
    //     });

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
        //Tabs

        const   tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show', 'fade');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item,i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
        //Timer
    
        const deadline = '03-20-2021'; //задаем конечное время

        function timeDifference(end) { // функция для рассчета оставшегося времени
            const   t = Date.parse(end) - Date.parse(new Date()), // в милисекундах, дальше дробим на дни, часы, минуты
                    days = Math.floor(t / (1000*60*60*24)), 
                    hours = Math.floor((t / (1000*60*60)) % 24),
                    minutes = Math.floor(t / (1000*60) % 60),
                    seconds = Math.floor(t / 1000 % 60);
            return { // вывод в объект
                'total' : t,
                'days' : days,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }
    
        function zeroBefore(arg) { // функция для приписки нолика к однозначному числу
            if (arg >= 0 && arg < 10) {
                return `0${arg}`;
            } else {
                return arg;
            }
        }
    
        function setClock(end) { // Основная функция, для вывода оставшегося времени 
            const   timer = document.querySelector('.timer'), // получаем форму таймера со страницы, дальше получаем объекты с этой формы (дни, часы, минуты и тд)
                    days = timer.querySelector('#days'),
                    hours = timer.querySelector('#hours'),
                    minutes = timer.querySelector('#minutes'),
                    seconds = timer.querySelector('#seconds');
    
            setInterval(refreshTime, 1000); // интервал для функции ниже
            refreshTime();
    
            function refreshTime() { // функция, выводит время на страницу
                const t = timeDifference(end); 
    
                days.innerHTML = zeroBefore(t.days); 
                hours.innerHTML = zeroBefore(t.hours);
                minutes.innerHTML = zeroBefore(t.minutes);
                seconds.innerHTML = zeroBefore(t.seconds);
                if (t.total == 0) {
                    clearInterval(refreshTime); // по истечению времени очищает интервал
                }
            }
        }
        setClock(deadline); //запускаем основную функцию, передаем в нее дедлайн
    
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
        
    tabs();
    modal();
    slider();
    timer();
    forms();
    cards();
    calc();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map