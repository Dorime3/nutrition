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