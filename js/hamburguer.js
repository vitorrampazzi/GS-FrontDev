    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.header ul');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });