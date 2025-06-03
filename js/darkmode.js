// Seleciona o botão de troca de tema
const themeSwitch = document.getElementById('theme-switch');

// Seleciona todos os ícones de dentro do botão
const themeIcons = themeSwitch.querySelectorAll('img');

// Variável para controlar qual tema está ativo
let currentTheme = 'light';

// Função que atualiza o tema da página
function updateTheme() {
    // Remove todas as classes de tema do body
    document.body.classList.remove('darkmode', 'bluemode');

    // Deixa todos os ícones escondidos
    themeIcons.forEach(icon => icon.style.display = 'none');

    if (currentTheme === 'light') {
        // Tema Light: não adiciona nenhuma classe (já é padrão)
        document.body.classList.remove('darkmode', 'bluemode');
        // Mostra o ícone referente ao modo Dark (para próxima troca)
        themeIcons[0].style.display = 'block';
    } else if (currentTheme === 'dark') {
        // Adiciona a classe darkmode no body
        document.body.classList.add('darkmode');
        // Mostra o ícone referente ao modo Blue (para próxima troca)
        themeIcons[2].style.display = 'block';
    } else if (currentTheme === 'blue') {
        // Adiciona a classe bluemode no body
        document.body.classList.add('bluemode');
        // Mostra o ícone referente ao modo Light (para próxima troca)
        themeIcons[1].style.display = 'block';
    }
}

// Função para alternar entre os modos
function toggleTheme() {
    if (currentTheme === 'light') {
        currentTheme = 'dark';
    } else if (currentTheme === 'dark') {
        currentTheme = 'blue';
    } else {
        currentTheme = 'light';
    }
    // Atualiza o tema
    updateTheme();
}

// Quando a página carregar, deixa o ícone correto visível
updateTheme();

// Adiciona o evento de clique ao botão para trocar o tema
themeSwitch.addEventListener('click', toggleTheme);