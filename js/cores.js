// Seleciona todos os botões que trocam o tema da página
const buttons = document.querySelectorAll('.btn-theme');

buttons.forEach(button => {
  // Adiciona um listener para cada botão
  button.addEventListener('click', () => {
    // Remove quaisquer classes de tema previamente aplicadas
    document.body.classList.remove('darkmode', 'bluemode');

    // Obtém o tema escolhido a partir do atributo data-theme
    const theme = button.getAttribute('data-theme');

    // Adiciona a nova classe de tema, exceto se for o tema claro (light)
    if (theme !== 'light') {
      document.body.classList.add(theme);
    }
  });
});
