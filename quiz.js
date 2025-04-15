const QuizApp = (() => {
  let current = 0, score = 0, questions = [];
  let timerInterval = null, timeLeft, isPaused = false, questionCount = 'all', withTimer = true, showRestart = true;
  let responseTimes = [], correctAnswers = 0, totalQuestions = 0;
  let pauseDurations = [], pauseStart = 0;

  questionSets.mixed = Object.values(questionSets).flat();

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function init() {
    // Kategorieauswahl-Modal erstellen (nur für Fallback)
    const categoryModal = document.createElement('div');
    categoryModal.id = 'categoryModal';
    categoryModal.className = 'modal';
    categoryModal.innerHTML = `
      <div class="modal-content">
        <h2>Kategorie wählen</h2>
        <div class="grid">
          <div class="category-card" data-category="general"><span>🧠</span>Allgemeinwissen</div>
          <div class="category-card" data-category="science"><span>🧪</span>Wissenschaft</div>
          <div class="category-card" data-category="art"><span>🎨</span>Kunst</div>
          <div class="category-card" data-category="geo"><span>🌍</span>Geografie</div>
          <div class="category-card" data-category="music"><span>🎵</span>Musik</div>
          <div class="category-card" data-category="mixed"><span>🎲</span>Zufall</div>
        </div>
      </div>
    `;
    document.body.appendChild(categoryModal);

    // Quiz-Modal erstellen
    const quizModal = document.createElement('div');
    quizModal.id = 'quizModal';
    quizModal.className = 'modal';
    quizModal.style.display = 'none';
    quizModal.innerHTML = `
      <div class="quiz-card">
        <div class="feedback-badge" style="left:-14px;right:auto;top:-14px;background:#ddd;cursor:pointer;" id="closeQuiz">✖</div>
        <div class="feedback-badge" id="badge"><i class="fas fa-question"></i></div>
        <div class="progress-container"><div class="progress-bar" id="progressBar"></div></div>
        <div id="questionNumber"></div>
        <div class="current-score" id="currentScore">Punkte: 0</div>
        <div class="question" id="question">Frage wird geladen...</div>
        <div class="answers" id="answers"></div>
        <div id="timerDisplay" style="margin-top:1rem;font-weight:bold;"></div>
        <div id="timerBarContainer"><div id="timerBar"></div></div>
        <button class="pause-btn" id="pauseBtn">⏸ Pause</button>
        <div class="explanation" id="explanation"></div>
        <div class="bonus-feedback" id="bonusFeedback"></div>
        <button class="next-btn" id="nextBtn" style="display:none;">Nächste Frage</button>
        <div class="score" id="score" style="display:none;"></div>
        <button class="next-btn" id="closeBtn" style="display:none;">Quiz beenden</button>
        <div class="highscore" id="highscore" style="display:none;"></div>
        <div class="stats" id="stats" style="display:none;"></div>
      </div>
    `;
    document.body.appendChild(quizModal);

    // Restart-Modal erstellen
    const restartModal = document.createElement('div');
    restartModal.id = 'restartModal';
    restartModal.className = 'modal';
    restartModal.style.display = 'none';
    restartModal.innerHTML = `
      <div class="modal-content">
        <h2>Quiz beendet</h2>
        <p>Möchtest du ein neues Quiz starten?</p>
        <div class="grid">
          <div class="category-card" data-category="general"><span>🧠</span>Allgemeinwissen</div>
          <div class="category-card" data-category="science"><span>🧪</span>Wissenschaft</div>
          <div class="category-card" data-category="art"><span>🎨</span>Kunst</div>
          <div class="category-card" data-category="geo"><span>🌍</span>Geografie</div>
          <div class="category-card" data-category="music"><span>🎵</span>Musik</div>
          <div class="category-card" data-category="mixed"><span>🎲</span>Zufall</div>
        </div>
        <button class="next-btn" id="closeRestartBtn">Schließen</button>
      </div>
    `;
    document.body.appendChild(restartModal);

    // Tastaturevents
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        closeModal();
        closeQuiz();
        document.getElementById("restartModal").style.display = "none";
      }
      if (e.key === " " && document.getElementById("quizModal").style.display === "flex") togglePause();
      if (document.getElementById("quizModal").style.display === "flex" && !isPaused) {
        if (e.key === "1") handleAnswer(0);
        if (e.key === "2") handleAnswer(1);
        if (e.key === "3") handleAnswer(2);
      }
    });

    // Event-Listener
    document.getElementById("categoryModal").addEventListener("click", e => {
      if (e.target === document.getElementById("categoryModal")) closeModal();
    });
    document.getElementById("quizModal").addEventListener("click", e => {
      if (e.target === document.getElementById("quizModal")) closeQuiz();
    });
    document.getElementById("restartModal").addEventListener("click", e => {
      if (e.target === document.getElementById("restartModal")) document.getElementById("restartModal").style.display = "none";
    });
    document.getElementById("closeQuiz").addEventListener("click", closeQuiz);
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
    document.getElementById("closeBtn").addEventListener("click", closeQuiz);
    document.getElementById("pauseBtn").addEventListener("click", togglePause);
    document.getElementById("closeRestartBtn").addEventListener("click", () => {
      document.getElementById("restartModal").style.display = "none";
    });

    // Kategorieauswahl (Fallback)
    document.querySelectorAll("#categoryModal .category-card").forEach(card => {
      card.addEventListener("click", () => {
        const category = card.getAttribute("data-category");
        localStorage.setItem("lastCategory", category);
        chooseCategory(category);
      });
    });

    // Restart-Kategorieauswahl
    document.querySelectorAll("#restartModal .category-card").forEach(card => {
      card.addEventListener("click", () => {
        const category = card.getAttribute("data-category");
        document.getElementById("restartModal").style.display = "none";
        QuizApp.open({ questionCount, category, withTimer, showRestart });
      });
    });
  }

  function open(options = {}) {
  document.getElementById("pauseBtn").style.display = options.withTimer ? "inline-block" : "none";
  pausedThisRound = false;
  penalties = 0;
  pausePenalty = options.pausePenalty || false;
    // Parameter setzen
    questionCount = options.questionCount || 'all';
    const category = options.category || null;
    withTimer = options.withTimer !== undefined ? options.withTimer : true;
    showRestart = options.showRestart !== undefined ? options.showRestart : true;

    // Quiz zurücksetzen
    current = 0;
    score = 0;
    correctAnswers = 0;
    responseTimes = [];
    pauseDurations = [];
    pauseStart = 0;
    document.getElementById("quizModal").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("highscore").style.display = "none";
    document.getElementById("closeBtn").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("restartModal").style.display = "none";

    // Direkt starten, wenn Kategorie angegeben
    if (category && questionSets[category]) {
      chooseCategory(category);
    } else {
      // Fallback: Kategorieauswahl öffnen
      document.getElementById("categoryModal").style.display = "flex";
    }
  }

  function closeModal() {
    document.getElementById("categoryModal").style.display = "none";
  }

  function chooseCategory(category) {
    closeModal();
    let allQuestions = [...questionSets[category]];
    allQuestions = shuffle(allQuestions);
    if (questionCount !== 'all') {
      allQuestions = allQuestions.slice(0, parseInt(questionCount));
    }
    questions = allQuestions;
    totalQuestions = questions.length;
    questions.forEach(q => {
      const answersWithIndex = q.answers.map((answer, index) => ({ answer, index }));
      shuffle(answersWithIndex);
      q.shuffledAnswers = answersWithIndex.map(item => item.answer);
      q.correct = answersWithIndex.findIndex(item => item.index === q.correct);
    });
    document.getElementById("quizModal").style.display = "flex";
    loadQuestion();
  }

  function loadQuestion() {
    isPaused = false;
    document.getElementById("pauseBtn").textContent = "⏸ Pause";
    const q = questions[current];
    document.getElementById("question").textContent = q.question;
    document.getElementById("questionNumber").textContent = `Frage ${current + 1} von ${questions.length}`;
    document.getElementById("currentScore").textContent = `Punkte: ${score}`;
    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    q.shuffledAnswers.forEach((a, i) => {
      const btn = document.createElement("button");
      btn.textContent = a;
      btn.onclick = () => handleAnswer(i);
      answers.appendChild(btn);
    });
    document.getElementById("badge").style.background = "#3498db";
    document.getElementById("badge").innerHTML = '<i class="fas fa-question"></i>';
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = "none";
    nextBtn.textContent = (current === questions.length - 1) ? "Auswertung anzeigen" : "Nächste Frage";
    document.getElementById("progressBar").style.width = ((current + 1) / questions.length * 100) + "%";
    document.getElementById("explanation").style.display = "none";
    document.getElementById("timerDisplay").style.display = withTimer ? "block" : "none";
    document.getElementById("timerBarContainer").style.display = withTimer ? "block" : "none";
    document.getElementById("pauseBtn").style.display = withTimer ? "block" : "none";
    if (withTimer) startTimer();
  }

  function startTimer() {
    const TIME_RESOLUTION = 100;
    const TIME_LIMIT_SECONDS = 10;
    timeLeft = TIME_LIMIT_SECONDS * 1000;
    const display = document.getElementById("timerDisplay");
    const bar = document.getElementById("timerBar");
    
    display.textContent = `⏳ ${(timeLeft / 1000).toFixed(1)} Sekunden`;
    bar.style.width = "100%";
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      if (isPaused) return;
      timeLeft -= TIME_RESOLUTION;
      
      const seconds = (timeLeft / 1000).toFixed(1);
      display.textContent = `⏳ ${seconds} Sekunden`;
      
      const percentage = (timeLeft / (TIME_LIMIT_SECONDS * 1000)) * 100;
      bar.style.width = `${percentage}%`;
      
      if (percentage > 50) {
        bar.style.background = '#2ecc71';
      } else if (percentage > 20) {
        bar.style.background = '#f39c12';
      } else {
        bar.style.background = '#e74c3c';
      }
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        handleAnswer(-1);
        display.textContent = "⏰ Zeit abgelaufen!";
  document.getElementById("pauseBtn").style.display = "none";
      }
    }, TIME_RESOLUTION);
  }

  function togglePause() {
    if (!withTimer) return;
    isPaused = !isPaused;
    if (isPaused) pauseStart = Date.now();
    const pauseBtn = document.getElementById("pauseBtn");
    if (!isPaused) {
      const duration = Date.now() - pauseStart;
      pauseDurations.push(duration);
    }
    pauseBtn.textContent = isPaused ? "▶ Fortfahren" : "⏸ Pause";
    document.getElementById("timerDisplay").textContent = isPaused ? "⏸ Pausiert" : `⏳ ${(timeLeft / 1000).toFixed(1)} Sekunden`;
  }

  function handleAnswer(index) {
    if (isPaused && pauseStart) {
      const duration = Date.now() - pauseStart;
      pauseDurations.push(duration);
      pauseStart = 0;
      isPaused = false;
    }
    if (withTimer && timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById("pauseBtn").style.display = "none";
      document.getElementById("timerBarContainer").style.display = "none";
    }
    const correct = questions[current].correct;
    const badge = document.getElementById("badge");
    const bonusPoints = withTimer ? Math.floor(timeLeft / 1000) : 0;
    responseTimes.push(withTimer ? (10 * 1000 - timeLeft) : 0);
    if (index === correct) {
      badge.style.background = "#2ecc71";
      badge.innerHTML = '<i class="fas fa-check"></i>';
      score += 1 + bonusPoints;
      correctAnswers++;
      if (bonusPoints > 0) {
        const bonusFeedback = document.getElementById("bonusFeedback");
        bonusFeedback.textContent = `+${bonusPoints} Bonus!`;
        bonusFeedback.style.display = "block";
        setTimeout(() => bonusFeedback.style.display = "none", 1000);
      }
    } else {
      badge.style.background = "#e74c3c";
      badge.innerHTML = '<i class="fas fa-times"></i>';
    }
    Array.from(document.getElementById("answers").children).forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) btn.style.background = "#2ecc71";
      else if (i === index) btn.style.background = "#e74c3c";
    });
    const explanationEl = document.getElementById("explanation");
    explanationEl.textContent = questions[current].explanation;
    explanationEl.style.display = "block";
    document.getElementById("currentScore").textContent = `Punkte: ${score}`;
    document.getElementById("nextBtn").style.display = "inline-block";
  }

  function nextQuestion() {
    current++;
    if (current < questions.length) loadQuestion();
    else showScore();
  }

  function showScore() {
    const highscoreEl = document.getElementById("highscore");
    const oldScore = parseInt(localStorage.getItem("quizHighscore") || "0");
    if (score > oldScore) {
      localStorage.setItem("quizHighscore", score);
      highscoreEl.textContent = `🎉 Neuer Highscore: ${score}`;
    } else {
      highscoreEl.textContent = `🏆 Dein Highscore: ${oldScore}`;
    }
    document.getElementById("question").textContent = "Quiz beendet!";
    document.getElementById("questionNumber").textContent = "";
    document.getElementById("currentScore").textContent = "";
    document.getElementById("timerDisplay").textContent = "";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("badge").style.background = "#f39c12";
    document.getElementById("badge").innerHTML = '<i class="fas fa-star"></i>';
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("score").textContent = `Du hast ${score} Punkte erzielt!`;
    document.getElementById("score").style.display = "block";
  document.getElementById("pauseBtn").style.display = "none";
    highscoreEl.style.display = "block";
    document.getElementById("closeBtn").style.display = "inline-block";
    document.getElementById("progressBar").style.width = "100%";

    const totalPauseMs = pauseDurations.reduce((a, b) => a + b, 0);
    const totalResponseMs = responseTimes.reduce((a, b) => a + b, 0);
    const avgResponseTime = responseTimes.length > 0 ? ((totalResponseMs - totalPauseMs) / responseTimes.length / 1000).toFixed(1) : 0;
    const pauseSeconds = (totalPauseMs / 1000).toFixed(1);
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);
    document.getElementById("stats").innerHTML = `
      <p>Durchschnittliche Antwortzeit: ${withTimer ? avgResponseTime : 'N/A'} Sekunden</p>
      <p>Richtige Antworten: ${correctAnswers} von ${totalQuestions}</p>
      <p>Genauigkeit: ${accuracy}%</p>
      <p>⏸️ Pausen: ${pauseDurations.length} (insgesamt ${pauseSeconds} Sekunden)</p>
    `;
    document.getElementById("stats").style.display = "block";
  }

  function closeQuiz() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById("pauseBtn").style.display = "none";
      document.getElementById("timerBarContainer").style.display = "none";
    }
    document.getElementById("quizModal").style.display = "none";
    current = 0;
    score = 0;
    correctAnswers = 0;
    responseTimes = [];
    pauseDurations = [];
    pauseStart = 0;
    document.getElementById("score").style.display = "none";
    document.getElementById("highscore").style.display = "none";
    document.getElementById("closeBtn").style.display = "none";
    document.getElementById("stats").style.display = "none";
    document.getElementById("progressBar").style.width = "0%";

    // Restart-Modal anzeigen oder komplett schließen
    if (showRestart) {
      document.getElementById("restartModal").style.display = "flex";
    }
  }

  return { init, open, closeModal, chooseCategory, nextQuestion, closeQuiz };
})();

// Initialisierung beim Laden
window.addEventListener("DOMContentLoaded", QuizApp.init);