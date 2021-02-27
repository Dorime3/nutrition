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
});