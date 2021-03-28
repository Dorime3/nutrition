function open(modalSelector, timerOpenId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
        if (timerOpenId) {
            clearInterval(timerOpenId);
        }
}

function close(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = 'visible';
}

function modal(openModalSelector, modalSelector, timerOpenId) {
    // Modal

    const   openModal = document.querySelectorAll(openModalSelector),
            modalWindow = document.querySelector(modalSelector);

    openModal.forEach(item => {
        item.addEventListener('click', () => open(modalSelector));
    });


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            close(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            close(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            open(modalSelector, timerOpenId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {close, open};