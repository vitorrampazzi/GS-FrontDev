const questions = [
  {
    question: "O que deve ser feito ao receber um alerta de enchente?",
    answers: [
      { text: "Ignorar o alerta", correct: false },
      { text: "Buscar abrigo em local alto e seguro", correct: true },
      { text: "Esperar dentro de casa mesmo em área de risco", correct: false },
      { text: "Tentar atravessar áreas alagadas a pé", correct: false }
    ]
  },
  {
    question: "Qual item é essencial em um kit de emergência para enchentes?",
    answers: [
      { text: "Televisão", correct: false },
      { text: "Notebook", correct: false },
      { text: "Lanterna e pilhas", correct: true },
      { text: "Almofadas extras", correct: false }
    ]
  },
  {
    question: "Quem deve ser contatado em caso de emergência durante uma enchente?",
    answers: [
      { text: "Corpo de Bombeiros", correct: true },
      { text: "Serviço de Internet", correct: false },
      { text: "Agência de turismo", correct: false },
      { text: "Correios", correct: false }
    ]
  },
  {
    question: "O que NÃO se deve fazer durante uma enchente?",
    answers: [
      { text: "Evitar contato com a água da enchente", correct: false },
      { text: "Desligar a energia elétrica", correct: false },
      { text: "Atravessar áreas alagadas com correnteza", correct: true },
      { text: "Buscar informações em fontes confiáveis", correct: false }
    ]
  },
  {
    question: "Em que situação o risco de enchente é maior?",
    answers: [
      { text: "Durante o inverno seco", correct: false },
      { text: "Após longos períodos de seca", correct: false },
      { text: "Durante chuvas intensas e contínuas", correct: true },
      { text: "Durante ventos fortes sem chuva", correct: false }
    ]
  },
  {
    question: "Qual é um dos principais causadores de enchentes urbanas?",
    answers: [
      { text: "Construção de parques", correct: false },
      { text: "Descarte inadequado de lixo", correct: true },
      { text: "Pintura de muros", correct: false },
      { text: "Uso de bicicletas", correct: false }
    ]
  },
  {
    question: "O que fazer com alimentos que entraram em contato com água de enchente?",
    answers: [
      { text: "Consumir imediatamente", correct: false },
      { text: "Lavar bem e comer", correct: false },
      { text: "Descartar corretamente", correct: true },
      { text: "Secar ao sol e guardar", correct: false }
    ]
  },
  {
    question: "Por que a água da enchente é perigosa para a saúde?",
    answers: [
      { text: "Porque está quente", correct: false },
      { text: "Porque pode conter substâncias tóxicas e esgoto", correct: true },
      { text: "Porque é salgada", correct: false },
      { text: "Porque tem cor escura", correct: false }
    ]
  },
  {
    question: "Qual órgão geralmente emite alertas de enchente no Brasil?",
    answers: [
      { text: "INMET (Instituto Nacional de Meteorologia)", correct: true },
      { text: "IBGE", correct: false },
      { text: "Anvisa", correct: false },
      { text: "BACEN", correct: false }
    ]
  },
  {
    question: "Qual animal pode transmitir doenças após enchentes?",
    answers: [
      { text: "Pombo", correct: false },
      { text: "Gato", correct: false },
      { text: "Rato", correct: true },
      { text: "Papagaio", correct: false }
    ]
  }
];


let currentQuestionIndex = 0; // Índice da pergunta atual
let score = 0; // Pontuação do jogador
let timer; // Referência ao temporizador
const timeLimit = 15; // Tempo limite por pergunta (em segundos)

// Referências aos elementos do DOM
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

// Inicia o quiz ao clicar no botão "Começar"
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  quizContainer.classList.remove("hide");
  startQuiz();
});

// Inicializa o quiz, embaralha as perguntas e exibe a primeira
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questions.sort(() => Math.random() - 0.5); // Embaralha as perguntas
  nextButton.textContent = "Próxima";
  scoreElement.classList.add("hide");

  // Ativa o modo escuro automaticamente se o sistema do usuário estiver em dark mode
  document.body.classList.toggle("dark-mode", window.matchMedia('(prefers-color-scheme: dark)').matches);

  showQuestion();
}

// Exibe a pergunta atual e as alternativas
function showQuestion() {
  resetState();
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  updateProgressBar();

  // Cria um botão para cada resposta
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
}

// Limpa os estados da pergunta anterior
function resetState() {
  clearInterval(timer);
  nextButton.classList.add("hide");
  timerElement.textContent = '';
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

// Verifica se a resposta está correta e exibe os estilos de acerto/erro
function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Mostra quais eram as alternativas corretas
  Array.from(answersElement.children).forEach(button => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

// Atualiza a barra de progresso com base na pergunta atual
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Inicia o cronômetro da pergunta
function startTimer() {
  let timeLeft = timeLimit;
  timerElement.textContent = `⏳ ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏳ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerElement.textContent = "⏰ Tempo esgotado!";
      autoFailQuestion(); // Considera a pergunta como errada ao estourar o tempo
    }
  }, 1000);
}

// Mostra respostas certas e erradas se o tempo acabar
function autoFailQuestion() {
  Array.from(answersElement.children).forEach(button => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    else button.classList.add("wrong");
    button.disabled = true;
  });
  nextButton.classList.remove("hide");
}

// Exibe a pontuação final e campo para salvar o nome no ranking
function showScore() {
  resetState();
  questionElement.textContent = "Fim do Quiz!";
  scoreElement.innerHTML = `
    <p>Você acertou ${score} de ${questions.length} perguntas!</p>
    <input type="text" id="player-name" placeholder="Seu nome" />
    <button onclick="saveRanking()">Salvar pontuação</button>
    <div id="ranking"></div>
  `;
  scoreElement.classList.remove("hide");
  nextButton.textContent = "Jogar novamente";
  nextButton.classList.remove("hide");
}

// Salva o nome e pontuação no ranking (localStorage)
function saveRanking() {
  const name = document.getElementById("player-name").value.trim();
  if (!name) return alert("Digite um nome para salvar!");
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name, score });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 5)));
  showRanking();
  generateWhatsAppLink(name, score); // Função não incluída aqui, mas chamada após salvar
}

// Mostra o ranking com os 5 melhores jogadores
function showRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  const container = document.getElementById("ranking");
  container.innerHTML = "<h3>🏆 Ranking:</h3><ol>" + 
    ranking.map(player => `<li>${player.name} - ${player.score}</li>`).join("") + 
    "</ol>";
}

// Avança para a próxima pergunta ou reinicia o quiz
nextButton.addEventListener("click", () => {
  if (nextButton.textContent === "Jogar novamente") {
    startScreen.classList.remove("hide");
    quizContainer.classList.add("hide");
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});