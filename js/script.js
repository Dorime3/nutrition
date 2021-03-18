window.addEventListener('DOMContentLoaded', () => {

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

    // cards

    class MenuCard { // задаем класс для карточек
        constructor (src, alt, title, subtitle, price, parentElement, ...classes) { // последний аргумент это rest оператор, образует массив с аргументами
            this.src = src, // определяем аргументы через контекст вызова
            this.alt = alt,
            this.title = title,
            this.subtitle = subtitle,
            this.price = price,
            this.parentElement = document.querySelector(parentElement), // также задаем родительский элемент, чтобы поместить в него нашу карточку
            this.classes = classes
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
    }

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     })
    // })

    getResource('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        })
    }
    // Forms

    const forms = document.querySelectorAll('form'); // получаем формы с idex.html

    const message = { // объект с необходимыми для нас сообщениями
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

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
    }

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

            const json = JSON.stringify(Object.fromEntries(formData.entries()))


            postData('http://localhost:3000/requests', json)
            .then((data) => {
                    console.log(data); // data -это те данные которые нам вернул сервер, которые мы определяем как аргумент и передаем
                    showThanksModal(message.success);  
                    statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
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
        })
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
        `
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            close();
        },4000)

    }

    fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));



});

