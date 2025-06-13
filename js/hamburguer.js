// Seleciona o botão de menu (hambúrguer)
const menuToggle = document.getElementById('menu-toggle');

// Seleciona a lista de navegação no cabeçalho
const nav = document.querySelector('.header ul');

// Alterna a visibilidade do menu ao clicar no botão
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});
