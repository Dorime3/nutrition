function timer(id, deadline) {
        //Timer
    
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
        setClock(id, deadline); //запускаем основную функцию, передаем в нее дедлайн
    
}

export default timer;