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
    
    const deadline = '03-09-2021'; //задаем конечное время

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
            modalWindow = document.querySelector('.modal'),
            closeModal = document.querySelector('[data-close]');

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

    closeModal.addEventListener('click', close);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            close();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            close();
        }
    });

    //const timerOpenId = setTimeout(open, 5000);

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

    new MenuCard( // задаем экземпляры карточек
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        228,
        ".menu .container",
    ).render(); // вызываем метод

    new MenuCard( // задаем экземпляры карточек
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        550,
        ".menu .container",

    ).render(); // вызываем метод

    new MenuCard( // задаем экземпляры карточек
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        430,
        ".menu .container",

    ).render(); // вызываем метод

    // Forms

        const forms = document.querySelectorAll('form'); // получаем формы с idex.html

        const message = { // объект с необходимыми для нас сообщениями
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        }

        forms.forEach(item => { // перебираем формы и для каждой запускаем функцию postData
            postData(item);
        });

        function postData(form) { // 
            form.addEventListener('submit', (e) => { // событие по нажатию кнопки
                e.preventDefault(); // обязательно задаем переменную и отменяем привычное поведение. Тк если этого не сделать страница будет перезагружаться

                const statusMessage = document.createElement('div'); // создаем элемент (див)
                statusMessage.classList.add('status'); // добавляем в него класс (статус)
                statusMessage.textContent = message.loading; // помещаем в него текст
                form.append(statusMessage); // помещаем наш элемент в форму

                const request = new XMLHttpRequest(); // делаем запрос
                request.open('POST', 'server.php'); // говорим что запрос имеет форму POST и куда отсылать данные

                // request.setRequestHeader('Content-type', 'multipart/form-data'); когда создаем запрос через XMLHttpRequest() и затем отправляем его методом FormData() заголовок (setRequestHeader('Content-type', 'multipart/form-data')) создавать не нужно!
                const formData = new FormData(form); // FormData метод отправки запроса 
                request.send(formData); // send - отправляем

                request.addEventListener('load', () => { // событие после загрузки
                    if (request.status === 200) { // если запрос.статус - все ок
                        console.log(request.response); // выводим ответ (объект) - необязательно
                        statusMessage.textContent = message.success; // выводим сообщение о том, что все прошло успешно
                        form.reset(); // очищаем форму
                        setTimeout(() => {  // метод, которым после задержки, удаляем сообщение
                            statusMessage.remove();
                        }, 2000);
                    } else {
                        statusMessage.textContent = message.failure; // выводим, если чтото пошло не так
                    }
                })
            })
        }





});

