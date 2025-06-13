let contador = 1;

// Marca o primeiro botão de rádio como selecionado, exibindo a primeira imagem do slide
document.getElementById("radio1").checked = true;

// Define um intervalo de tempo para trocar a imagem automaticamente a cada 5 segundos (5000 milissegundos)
setInterval(function(){
    proximaImagem();
}, 5000);

// Função responsável por avançar para a próxima imagem
function proximaImagem(){
    contador++;

    // Se o contador ultrapassar o número total de imagens (4), ele reinicia para 0
    if(contador > 4){
        contador = 0;
    }
    else {
        // Marca o botão de rádio correspondente ao novo valor do contador, trocando a imagem exibida
        document.getElementById("radio" + contador).checked = true;
    }
}
