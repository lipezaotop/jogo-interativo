(function () {
  "use strict";

  var NAMES = ["Alice","Bernardo","Camila","Diego","Elisa","Fábio","Gabriela","Heitor",
    "Isabela","João","Karina","Lucas","Marina","Noah","Otávio","Rafael","Sofia",
    "Thiago","Valentina"];

  var BANK = [
    {
      q: "Qual é a forma mais eficiente de economizar água durante o banho?",
      options: [
        "Tomar banhos curtos e fechar o registro ao se ensaboar",
        "Deixar o chuveiro ligado o tempo todo para não perder a temperatura",
        "Trocar o banho por um mergulho na banheira todos os dias",
        "Aumentar a pressão da água para terminar mais rápido"
      ],
      correct: 0,
      explain: "Reduzir o tempo de banho e fechar o registro ao se ensaboar pode economizar dezenas de litros por banho."
    },
    {
      q: "O que fazer com a água usada para lavar frutas e verduras?",
      options: [
        "Descartar imediatamente na pia",
        "Usar para lavar o carro",
        "Reaproveitar para regar plantas",
        "Misturar com produtos de limpeza e jogar fora"
      ],
      correct: 2,
      explain: "Sem produtos químicos fortes, essa água é ótima para regar jardins e vasos."
    },
    {
      q: "Qual atitude ajuda a evitar desperdício ao escovar os dentes?",
      options: [
        "Deixar a torneira aberta o tempo todo",
        "Fechar a torneira durante a escovação e abrir só para enxaguar",
        "Usar um copo novo de água a cada escovação",
        "Escovar os dentes no chuveiro"
      ],
      correct: 1,
      explain: "Fechar a torneira durante a escovação pode economizar até 12 litros de água por vez."
    },
    {
      q: "Como é possível perceber um vazamento escondido em casa?",
      options: [
        "Vazamentos escondidos não existem",
        "Só é possível ver a torneira pingando",
        "Chamando um eletricista",
        "Notando um aumento incomum na conta de água"
      ],
      correct: 3,
      explain: "Um aumento incomum e sem explicação na conta costuma ser sinal de vazamento oculto."
    },
    {
      q: "Qual a melhor forma de lavar roupas economizando água?",
      options: [
        "Lavar poucas peças várias vezes ao dia",
        "Esperar acumular uma carga completa na máquina",
        "Lavar tudo à mão com a torneira sempre aberta",
        "Usar sempre o ciclo mais longo disponível"
      ],
      correct: 1,
      explain: "Máquinas com carga completa otimizam a quantidade de água usada por peça lavada."
    },
    {
      q: "Qual o melhor horário para regar plantas e economizar água?",
      options: [
        "No meio do dia, quando o sol está mais forte",
        "Só depois que as folhas começam a murchar",
        "De manhã cedo ou ao entardecer",
        "Com a mangueira aberta por horas seguidas"
      ],
      correct: 2,
      explain: "Regar em horários mais frescos reduz a evaporação e aproveita melhor cada gota."
    },
    {
      q: "Na cozinha, qual hábito mais desperdiça água ao lavar louça?",
      options: [
        "Usar uma bacia para pré-lavar utensílios",
        "Deixar a torneira aberta o tempo todo",
        "Fechar a torneira entre um prato e outro",
        "Encher a pia com água e sabão"
      ],
      correct: 1,
      explain: "Deixar a torneira correndo continuamente gasta muito mais água do que necessário."
    },
    {
      q: "Para que serve reaproveitar a água da chuva?",
      options: [
        "Apenas para decoração",
        "Somente para beber",
        "Não é recomendado usar de forma alguma",
        "Regar plantas, lavar quintais e dar descarga"
      ],
      correct: 3,
      explain: "Captada corretamente, a água da chuva serve bem para diversas tarefas não potáveis."
    },
    {
      q: "O que ajuda a reduzir o consumo de água no vaso sanitário?",
      options: [
        "Caixa acoplada com duplo acionamento",
        "Descarga com fluxo contínuo e fixo",
        "Válvula sempre aberta",
        "Nenhum equipamento faz diferença"
      ],
      correct: 0,
      explain: "O duplo acionamento permite escolher o volume de água conforme a necessidade real."
    },
    {
      q: "Por que é importante fechar bem as torneiras após o uso?",
      options: [
        "Só para economizar tempo",
        "Não faz diferença no consumo",
        "Para evitar gotejamento constante que desperdiça água",
        "Isso importa apenas à noite"
      ],
      correct: 2,
      explain: "Uma torneira pingando pode desperdiçar dezenas de litros por dia sem que se perceba."
    },
    {
      q: "Qual é uma forma mais consciente de lavar o carro?",
      options: [
        "Usar mangueira aberta o tempo todo",
        "Usar balde e pano, com a mangueira só para enxaguar",
        "Lavar o carro todos os dias",
        "Usar água extra para 'garantir' que ficou limpo"
      ],
      correct: 1,
      explain: "Lavar com balde reduz bastante o volume de água em comparação à mangueira aberta o tempo todo."
    },
    {
      q: "Qual bom hábito ajuda quem tem piscina em casa?",
      options: [
        "Deixar a água evaporar e reabastecer sempre",
        "Trocar toda a água todas as semanas",
        "Deixar a piscina sempre transbordando",
        "Usar uma capa para reduzir a evaporação"
      ],
      correct: 3,
      explain: "Cobrir a piscina reduz a evaporação e a necessidade de repor água com frequência."
    }
  ];

  var ROUND_SIZE = 10;

  var state = { name: "", questions: [], index: 0, score: 0, answered: false };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickName() {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }

  function showScene(id) {
    document.querySelectorAll(".scene").forEach(function (s) {
      s.classList.toggle("active", s.id === id);
    });
  }

  function setTankLevel(prefix, pct) {
    var clamped = Math.max(0, Math.min(1, pct));
    var innerH = 260;
    var h = clamped * innerH;
    var y = 280 - h;
    var rect = document.getElementById("water-" + prefix);
    if (rect) { rect.setAttribute("y", y); rect.setAttribute("height", h); }
    var label = document.getElementById(prefix + "-level");
    if (label) label.textContent = Math.round(clamped * 100) + "%";
  }

  function setupRound(isFirst) {
    state.name = pickName();
    state.questions = shuffle(BANK).slice(0, ROUND_SIZE);
    state.index = 0;
    state.score = 0;
    state.answered = false;

    document.getElementById("intro-text").innerHTML =
      "A cidade de Vale Azul enfrenta a pior seca em décadas. Os reservatórios estão quase vazios " +
      "e a Estação Central de Água convocou uma pessoa para essa missão: <strong>" + state.name +
      "</strong>. Cada resposta certa devolve um pouco de água para a cidade.";

    setTankLevel("intro", 0);
    if (!isFirst) showScene("scene-intro");
  }

  function renderQuestion() {
    var q = state.questions[state.index];
    document.getElementById("quiz-name-tag").textContent = "Missão de " + state.name;
    document.getElementById("quiz-count").textContent =
      "Pergunta " + (state.index + 1) + " de " + state.questions.length;
    document.getElementById("question-text").textContent = q.q;

    var box = document.getElementById("choices");
    box.innerHTML = "";
    q.options.forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.className = "choice";
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", function () { handleAnswer(i, btn); });
      box.appendChild(btn);
    });

    document.getElementById("feedback").className = "feedback";
    document.getElementById("btn-next").style.display = "none";
    state.answered = false;

    setTankLevel("quiz", state.score / state.questions.length);
  }

  function handleAnswer(i, btnEl) {
    if (state.answered) return;
    state.answered = true;

    var q = state.questions[state.index];
    var correct = i === q.correct;
    if (correct) state.score++;

    var buttons = document.querySelectorAll("#choices .choice");
    buttons.forEach(function (b, idx) {
      b.disabled = true;
      if (idx === q.correct) b.classList.add("correct");
      else if (idx === i) b.classList.add("incorrect");
    });

    var fb = document.getElementById("feedback");
    fb.className = "feedback show" + (correct ? "" : " wrong");
    document.getElementById("feedback-tag").textContent = correct
      ? "Boa, " + state.name + "! Essa escolha economiza água."
      : "Essa não é a melhor escolha, " + state.name + ".";
    document.getElementById("feedback-text").textContent = q.explain;

    setTankLevel("quiz", state.score / state.questions.length);
    document.getElementById("btn-next").style.display = "inline-block";
  }

  function nextQuestion() {
    state.index++;
    if (state.index >= state.questions.length) {
      finishRound();
    } else {
      renderQuestion();
    }
  }

  function finishRound() {
    var pct = state.score / state.questions.length;
    setTankLevel("end", pct);
    document.getElementById("end-score").textContent = state.score;
    document.getElementById("end-of").textContent = "de " + state.questions.length + " acertos";

    var title, text;
    if (pct >= 0.85) {
      title = "Reservatório salvo!";
      text = state.name + " respondeu com atenção e ajudou a encher o reservatório de Vale Azul. A cidade toda agradece por cada gota economizada.";
    } else if (pct >= 0.5) {
      title = "Boa contribuição";
      text = state.name + " ajudou bastante, mas o reservatório de Vale Azul ainda precisa de mais alguns cuidados com a água.";
    } else {
      title = "Ainda dá tempo";
      text = "O reservatório de Vale Azul continua baixo, mas " + state.name + " já deu o primeiro passo para mudar isso. Bora tentar de novo?";
    }
    document.getElementById("end-title").textContent = title;
    document.getElementById("end-text").textContent = text;

    showScene("scene-end");
  }

  document.getElementById("btn-start").addEventListener("click", function () {
    showScene("scene-quiz");
    renderQuestion();
  });
  document.getElementById("btn-next").addEventListener("click", nextQuestion);
  document.getElementById("btn-again").addEventListener("click", function () {
    setupRound(false);
  });

  setupRound(true);
})();
