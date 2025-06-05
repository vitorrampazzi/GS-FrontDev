const buttons = document.querySelectorAll('.btn-theme');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove todas as classes de tema
    document.body.classList.remove('darkmode', 'bluemode');

    const theme = button.getAttribute('data-theme');
    if (theme !== 'light') {
      document.body.classList.add(theme);
    }
  });
});
