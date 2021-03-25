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