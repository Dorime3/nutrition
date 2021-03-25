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