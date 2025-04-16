// Simple-Quiz
// Author: Johannes Gamperl aka Rufnex (https://jg-webdesign.de)
// License: Public Domain – A credit to the original author is appreciated but not required.

const QuizApp = (() => {
  // Zentraler Zustand
  const state = {
    current: 0,
    score: 0,
    questions: [],
    timerInterval: null,
    timeLeft: 0,
    isPaused: false,
    questionCount: 'all',
    withTimer: true,
    showRestart: true,
    responseTimes: [],
    correctAnswers: 0,
    totalQuestions: 0,
    pauseDurations: [],
    pauseStart: 0,
    pausedThisRound: false,
    penalties: 0,
    pausePenalty: false,
    hasAnswered: false, // Neuer Zustand, um Mehrfachantworten zu verhindern
    currentCategory: null, // Aktuelle Kategorie
  };

  // Mixed-Kategorie dynamisch füllen
  questionSets.mixed.questions = Object.values(questionSets)
    .filter(category => category !== questionSets.mixed)
    .flatMap(category => category.questions);

  // Spezielle Kategorien füllen
  questionSets.quickstart.questions = [...questionSets.general.questions];

  // DOM-Elemente (Caching)
  const elements = {};

  // Utility-Funktion: Array mischen
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Utility-Funktion: Sicherer DOM-Zugriff
  const getElement = (id) => {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with ID "${id}" not found`);
    return element;
  };

  // DOM-Element erstellen
  const createElement = (tag, attrs = {}, children = []) => {
    const element = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'style') {
        Object.assign(element.style, value);
      } else if (key === 'className') {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  };

  // Zentrale Funktion: Kategorien-Karte erstellen
  const createCategoryCard = (cat, clickHandler) => {
    const card = createElement('div', { className: 'category-card', 'data-category': cat.category }, [
      createElement('div', { className: 'icon' }, [
        createElement('i', { className: cat.icon })
      ]),
      cat.label,
    ]);
    card.addEventListener('click', clickHandler);
    return card;
  };

  // Zentrale Funktion: Kategorien-Karte für Startseite erstellen
  const createQuizCard = (cat, clickHandler) => {
    const card = createElement('div', { className: 'quiz-card-start', 'data-category': cat.category }, [
      createElement('div', { className: 'icon' }, [
        createElement('i', { className: cat.icon })
      ]),
      createElement('span', {}, [cat.label]),
    ]);
    card.addEventListener('click', clickHandler);
    return card;
  };

  // Hilfsfunktion: Kategorien-Liste aus questionSets generieren
  const generateCategories = () => {
    const config = window.QuizConfig || {};
    let categories = Object.keys(questionSets).map(category => {
      const meta = questionSets[category].meta || { icon: 'ri-question-line', label: category }; // Fallback
      return {
        category,
        icon: meta.icon,
        label: meta.label,
        options: questionSets[category].options || { questionCount: 'all', withTimer: true, showRestart: true, pausePenalty: false },
      };
    });

    // Filter: Nur Kategorien anzeigen, die in QuizConfig.categories aufgeführt sind (falls definiert)
    if (config.categories) {
      const validCategories = config.categories.filter(cat => {
        if (!questionSets[cat]) {
          console.warn(`Kategorie "${cat}" in QuizConfig.categories ist ungültig und wird ignoriert.`);
          return false;
        }
        return true;
      });

      if (validCategories.length === 0) {
        console.warn('Keine gültigen Kategorien in QuizConfig.categories gefunden. Zeige alle Kategorien an.');
      } else {
        categories = categories.filter(cat => validCategories.includes(cat.category));
      }
    }

    // Sortierung: Alphabetisch nach Label
    categories.sort((a, b) => a.label.localeCompare(b.label));

    return categories;
  };

  // Kategorien in index.html rendern
  const renderCategories = () => {
    const quizLinks = document.querySelector('.quiz-links');
    if (!quizLinks) throw new Error('Element with class "quiz-links" not found');

    const categories = generateCategories();
    quizLinks.innerHTML = ''; // Bestehende Karten entfernen

    categories.forEach(cat => {
      const options = cat.category === 'choose'
        ? { choose: true }
        : { ...cat.options, category: cat.category };

      const card = createQuizCard(cat, () => QuizApp.open(options));
      quizLinks.appendChild(card);
    });
  };

  // Kategorie-Modal erstellen
  const createCategoryModal = () => {
    const categories = generateCategories();

    const modal = createElement('div', { id: 'categoryModal', className: 'modal' }, [
      createElement('div', { className: 'modal-content' }, [
        createElement('h2', {}, ['Kategorie wählen']),
        createElement('div', { className: 'grid' }, categories.map(cat =>
          createCategoryCard(cat, () => {
            const category = cat.category;
            localStorage.setItem('lastCategory', category);
            chooseCategory(category);
          })
        )),
      ]),
    ]);

    return modal;
  };

  // Quiz-Modal erstellen
  const createQuizModal = () => {
    return createElement('div', { id: 'quizModal', className: 'modal', style: { display: 'none' } }, [
      createElement('div', { className: 'quiz-card' }, [
        createElement('div', { className: 'feedback-badge', id: 'closeQuiz', style: { left: '-14px', right: 'auto', top: '-14px', background: '#ddd', cursor: 'pointer' } }, ['✖']),
        createElement('div', { className: 'feedback-badge', id: 'badge' }, [
          createElement('i', { className: 'ri-question-line' })
        ]),
        createElement('div', { className: 'progress-container' }, [
          createElement('div', { className: 'progress-bar', id: 'progressBar' }),
        ]),
        createElement('div', { id: 'questionNumber' }),
        createElement('div', { className: 'current-score', id: 'currentScore' }, ['Punkte: 0']),
        createElement('div', { className: 'question', id: 'question' }, ['Frage wird geladen...']),
        createElement('div', { className: 'answers', id: 'answers' }),
        createElement('div', { id: 'timerDisplay', style: { marginTop: '1rem', fontWeight: 'bold' } }),
        createElement('div', { id: 'timerBarContainer' }, [
          createElement('div', { id: 'timerBar' }),
        ]),
        createElement('button', { className: 'pause-btn', id: 'pauseBtn' }, ['⏸ Pause']),
        createElement('div', { className: 'explanation', id: 'explanation' }),
        createElement('div', { className: 'bonus-feedback', id: 'bonusFeedback' }),
        createElement('button', { className: 'next-btn', id: 'nextBtn', style: { display: 'none' } }, ['Nächste Frage']),
        createElement('div', { className: 'score', id: 'score', style: { display: 'none' } }),
        createElement('button', { className: 'next-btn', id: 'closeBtn', style: { display: 'none' } }, ['Quiz beenden']),
        createElement('div', { className: 'highscore', id: 'highscore', style: { display: 'none' } }),
        createElement('div', { className: 'stats', id: 'stats', style: { display: 'none' } }),
        createElement('button', { className: 'reset-link', id: 'resetHighscoreBtn', style: { display: 'none' } }, [
          createElement('i', { className: 'ri-delete-bin-line' }),
          ' Highscore zurücksetzen'
        ]),
      ]),
    ]);
  };

  // Restart-Modal erstellen
  const createRestartModal = () => {
    const categories = generateCategories();

    const modal = createElement('div', { id: 'restartModal', className: 'modal', style: { display: 'none' } }, [
      createElement('div', { className: 'modal-content' }, [
        createElement('h2', {}, ['Quiz beendet']),
        createElement('p', {}, ['Möchtest du ein neues Quiz starten?']),
        createElement('div', { className: 'grid' }, categories.map(cat =>
          createCategoryCard(cat, () => {
            const category = cat.category;
            elements.restartModal.style.display = 'none';
            open({ questionCount: state.questionCount, category, withTimer: state.withTimer, showRestart: state.showRestart, pausePenalty: state.pausePenalty });
          })
        )),
        createElement('button', { className: 'next-btn', id: 'closeRestartBtn' }, ['Schließen']),
      ]),
    ]);

    return modal;
  };

  // Initialisierung
  const init = () => {
    // Modals erstellen
    document.body.appendChild(createCategoryModal());
    document.body.appendChild(createQuizModal());
    document.body.appendChild(createRestartModal());

    // DOM-Elemente cachen
    elements.categoryModal = getElement('categoryModal');
    elements.quizModal = getElement('quizModal');
    elements.restartModal = getElement('restartModal');
    elements.closeQuiz = getElement('closeQuiz');
    elements.nextBtn = getElement('nextBtn');
    elements.closeBtn = getElement('closeBtn');
    elements.pauseBtn = getElement('pauseBtn');
    elements.closeRestartBtn = getElement('closeRestartBtn');
    elements.resetHighscoreBtn = getElement('resetHighscoreBtn');
    elements.badge = getElement('badge');
    elements.question = getElement('question');
    elements.questionNumber = getElement('questionNumber');
    elements.currentScore = getElement('currentScore');
    elements.answers = getElement('answers');
    elements.timerDisplay = getElement('timerDisplay');
    elements.timerBarContainer = getElement('timerBarContainer');
    elements.timerBar = getElement('timerBar');
    elements.explanation = getElement('explanation');
    elements.bonusFeedback = getElement('bonusFeedback');
    elements.score = getElement('score');
    elements.highscore = getElement('highscore');
    elements.stats = getElement('stats');
    elements.progressBar = getElement('progressBar');

    // Prüfe, ob Kategorien erzeugt werden sollen
    if (window.QuizConfig) {
      renderCategories();
    }

    // Tastaturevents
    document.addEventListener('keydown', handleKeydown);

    // Event-Listener
    elements.categoryModal.addEventListener('click', e => {
      if (e.target === elements.categoryModal) closeModal();
    });
    elements.quizModal.addEventListener('click', e => {
      if (e.target === elements.quizModal) closeQuiz();
    });
    elements.restartModal.addEventListener('click', e => {
      if (e.target === elements.restartModal) elements.restartModal.style.display = 'none';
    });
    elements.closeQuiz.addEventListener('click', closeQuiz);
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.closeBtn.addEventListener('click', closeQuiz);
    elements.pauseBtn.addEventListener('click', togglePause);
    elements.closeRestartBtn.addEventListener('click', () => {
      elements.restartModal.style.display = 'none';
    });
    elements.resetHighscoreBtn.addEventListener('click', resetHighscore);
  };

  // Tastatureingaben
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeQuiz();
      elements.restartModal.style.display = 'none';
    }
    if (e.key === ' ' && elements.quizModal.style.display === 'flex') togglePause();
    if (elements.quizModal.style.display === 'flex') {
      if (!state.isPaused && !state.hasAnswered) {
        // Antwort auswählen mit 1, 2, 3, ...
        const currentQuestion = state.questions[state.current];
        const numAnswers = currentQuestion.shuffledAnswers.length;
        const keyIndex = parseInt(e.key) - 1; // Tasten 1, 2, 3, ... zu Index 0, 1, 2, ...
        if (keyIndex >= 0 && keyIndex < numAnswers) {
          handleAnswer(keyIndex);
        }
      }
      // Mit Enter zur nächsten Frage, wenn die Frage beantwortet wurde
      if (e.key === 'Enter' && state.hasAnswered && !state.isPaused) {
        nextQuestion();
      }
    }
  };

  const open = (options = {}) => {
    elements.pauseBtn.style.display = options.withTimer ? 'inline-block' : 'none';
    state.pausedThisRound = false;
    state.penalties = 0;
    state.pausePenalty = options.pausePenalty || false;
    state.questionCount = options.questionCount || 'all';
    const category = options.category || null;
    state.withTimer = options.withTimer !== undefined ? options.withTimer : true;
    state.showRestart = options.showRestart !== undefined ? options.showRestart : true;
    state.currentCategory = category; // Speichere die aktuelle Kategorie

    // SortOrder mit Priorität bestimmen
    const config = window.QuizConfig || {};
    const categoryOptions = category && questionSets[category] && questionSets[category].options ? questionSets[category].options : {};
    const sortOrder = config.sortOrder !== undefined ? config.sortOrder : (categoryOptions.sortOrder || (options.sortOrder !== undefined ? options.sortOrder : 'random'));

    // Quiz zurücksetzen
    state.current = 0;
    state.score = 0;
    state.correctAnswers = 0;
    state.responseTimes = [];
    state.pauseDurations = [];
    state.pauseStart = 0;
    elements.quizModal.style.display = 'none';
    elements.score.style.display = 'none';
    elements.highscore.style.display = 'none';
    elements.closeBtn.style.display = 'none';
    elements.resetHighscoreBtn.style.display = 'none';
    elements.stats.style.display = 'none';
    elements.progressBar.style.width = '0%';
    elements.restartModal.style.display = 'none';

    if (category && questionSets[category]) {
      chooseCategory(category, sortOrder);
    } else {
      elements.categoryModal.style.display = 'flex';
    }
  };

  const closeModal = () => {
    elements.categoryModal.style.display = 'none';
  };

  const chooseCategory = (category, sortOrder) => {
    closeModal();
    if (!questionSets[category]) {
      throw new Error(`Category "${category}" not found in questionSets. Available categories: ${Object.keys(questionSets).join(', ')}`);
    }

    let allQuestions = [...questionSets[category].questions];
    if (!allQuestions || allQuestions.length === 0) {
      throw new Error(`No questions found for category "${category}".`);
    }

    // Fragen sortieren basierend auf sortOrder
    switch (sortOrder) {
      case 'random':
        allQuestions = shuffle([...questionSets[category].questions]); // Direkte Kopie der ursprünglichen Fragen
        break;
      case 'a-z':
        allQuestions = [...questionSets[category].questions].sort((a, b) => a.question.localeCompare(b.question));
        break;
      case 'default':
        allQuestions = [...questionSets[category].questions]; // Direkte Kopie der ursprünglichen Fragen
        break;
      default:
        console.warn(`Ungültiger sortOrder "${sortOrder}". Verwende "random" als Standard.`);
        allQuestions = shuffle([...questionSets[category].questions]);
        break;
    }

    if (state.questionCount !== 'all') {
      const count = parseInt(state.questionCount);
      if (isNaN(count) || count <= 0) {
        throw new Error(`Invalid questionCount "${state.questionCount}". Must be a positive number or "all".`);
      }
      allQuestions = allQuestions.slice(0, count);
    }
    state.questions = allQuestions;
    state.totalQuestions = state.questions.length;
    state.questions.forEach(q => {
      const answersWithIndex = q.answers.map((answer, index) => ({ answer, index }));
      shuffle(answersWithIndex);
      q.shuffledAnswers = answersWithIndex.map(item => item.answer);
      q.correct = answersWithIndex.findIndex(item => item.index === q.correct);
    });
    elements.quizModal.style.display = 'flex';
    loadQuestion();
  };

  const loadQuestion = () => {
    state.isPaused = false;
    state.hasAnswered = false; // Zurücksetzen, da eine neue Frage geladen wird
    elements.pauseBtn.textContent = '⏸ Pause';
    const q = state.questions[state.current];
    elements.question.textContent = q.question;
    elements.questionNumber.textContent = `Frage ${state.current + 1} von ${state.questions.length}`;
    elements.currentScore.textContent = `Punkte: ${state.score}`;
    elements.answers.innerHTML = '';
    q.shuffledAnswers.forEach((a, i) => {
      const btn = createElement('button', { className: 'answer-btn' }, [
        createElement('span', { className: 'answer-text' }, [a]),
        createElement('span', { className: 'key-hint' }, [(i + 1).toString()]),
      ]);
      btn.onclick = () => handleAnswer(i);
      elements.answers.appendChild(btn);
    });
    elements.badge.style.background = '#3498db';
    elements.badge.innerHTML = ''; // Entferne vorherigen Inhalt
    elements.badge.appendChild(createElement('i', { className: 'ri-question-line' }));
    elements.nextBtn.style.display = 'none';
    elements.nextBtn.textContent = state.current === state.questions.length - 1 ? 'Auswertung anzeigen' : 'Nächste Frage';
    elements.progressBar.style.width = `${((state.current + 1) / state.questions.length) * 100}%`;
    elements.explanation.style.display = 'none';
    elements.timerDisplay.style.display = state.withTimer ? 'block' : 'none';
    elements.timerBarContainer.style.display = state.withTimer ? 'block' : 'none';
    elements.pauseBtn.style.display = state.withTimer ? 'block' : 'none';
    if (state.withTimer) startTimer();
  };

  const startTimer = () => {
    const TIME_RESOLUTION = 100;
    const TIME_LIMIT_SECONDS = 10;
    state.timeLeft = TIME_LIMIT_SECONDS * 1000;
    elements.timerDisplay.textContent = `⏳ ${(state.timeLeft / 1000).toFixed(1)} Sekunden`;
    elements.timerBar.style.width = '100%';

    if (state.timerInterval) clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
      if (state.isPaused) return;
      state.timeLeft -= TIME_RESOLUTION;

      const seconds = (state.timeLeft / 1000).toFixed(1);
      elements.timerDisplay.textContent = `⏳ ${seconds} Sekunden`;

      const percentage = (state.timeLeft / (TIME_LIMIT_SECONDS * 1000)) * 100;
      elements.timerBar.style.width = `${percentage}%`;

      if (percentage > 50) {
        elements.timerBar.style.background = '#2ecc71';
      } else if (percentage > 20) {
        elements.timerBar.style.background = '#f39c12';
      } else {
        elements.timerBar.style.background = '#e74c3c';
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        handleAnswer(-1);
        elements.timerDisplay.textContent = '⏰ Zeit abgelaufen!';
        elements.pauseBtn.style.display = 'none';
      }
    }, TIME_RESOLUTION);
  };

  const togglePause = () => {
    if (!state.withTimer) return;
    state.isPaused = !state.isPaused;
    if (state.isPaused) {
      state.pauseStart = Date.now();
      state.pausedThisRound = true;
    }
    if (!state.isPaused) {
      const duration = Date.now() - state.pauseStart;
      state.pauseDurations.push(duration);
      if (state.pausePenalty) {
        state.penalties++;
        state.score = Math.max(0, state.score - 1);
        elements.currentScore.textContent = `Punkte: ${state.score}`;
      }
    }
    elements.pauseBtn.textContent = state.isPaused ? '▶ Fortfahren' : '⏸ Pause';
    elements.timerDisplay.textContent = state.isPaused ? '⏸ Pausiert' : `⏳ ${(state.timeLeft / 1000).toFixed(1)} Sekunden`;
  };

  const handleAnswer = (index) => {
    // Verhindern, dass die Frage mehrfach beantwortet wird
    if (state.hasAnswered) return;
    state.hasAnswered = true;

    if (state.isPaused && state.pauseStart) {
      const duration = Date.now() - state.pauseStart;
      state.pauseDurations.push(duration);
      state.pauseStart = 0;
      state.isPaused = false;
      if (state.pausePenalty && state.pausedThisRound) {
        state.penalties++;
        state.score = Math.max(0, state.score - 1);
      }
    }
    if (state.withTimer && state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      elements.pauseBtn.style.display = 'none';
      elements.timerBarContainer.style.display = 'none';
    }
    const correct = state.questions[state.current].correct;
    const bonusPoints = state.withTimer ? Math.floor(state.timeLeft / 1000) : 0;
    state.responseTimes.push(state.withTimer ? (10 * 1000 - state.timeLeft) : 0);
    state.questions[state.current].userAnswer = index;
    if (index === correct) {
      elements.badge.style.background = '#2ecc71';
      elements.badge.innerHTML = ''; // Entferne vorherigen Inhalt
      elements.badge.appendChild(createElement('i', { className: 'ri-check-line' }));
      state.score += 1 + bonusPoints;
      state.correctAnswers++;
      if (bonusPoints > 0) {
        elements.bonusFeedback.textContent = `+${bonusPoints} Bonus!`;
        elements.bonusFeedback.style.display = 'block';
        setTimeout(() => elements.bonusFeedback.style.display = 'none', 1000);
      }
    } else {
      elements.badge.style.background = '#e74c3c';
      elements.badge.innerHTML = ''; // Entferne vorherigen Inhalt
      elements.badge.appendChild(createElement('i', { className: 'ri-close-line' }));
    }
    Array.from(elements.answers.children).forEach((btn, i) => {
      btn.disabled = true;
      btn.style.background = i === correct ? '#2ecc71' : i === index ? '#e74c3c' : btn.style.background;
    });
    elements.explanation.textContent = state.questions[state.current].explanation;
    elements.explanation.style.display = 'block';
    elements.currentScore.textContent = `Punkte: ${state.score}`;
    elements.nextBtn.style.display = 'inline-block';
  };

  const nextQuestion = () => {
    state.current++;
    if (state.current < state.questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  };

  const showScore = () => {
    elements.explanation.style.display = 'none';
    elements.bonusFeedback.style.display = 'none';

    // Highscore pro Kategorie laden
    const highscoreKey = `quizHighscore_${state.currentCategory}`;
    const oldScore = parseInt(localStorage.getItem(highscoreKey) || '0');
    if (state.score > oldScore) {
      localStorage.setItem(highscoreKey, state.score);
      elements.highscore.textContent = `🎉 Neuer Highscore für ${questionSets[state.currentCategory].meta.label}: ${state.score}`;
    } else {
      elements.highscore.textContent = `🏆 Dein Highscore für ${questionSets[state.currentCategory].meta.label}: ${oldScore}`;
    }
    elements.question.textContent = 'Quiz beendet!';
    elements.questionNumber.textContent = '';
    elements.currentScore.textContent = '';
    elements.timerDisplay.textContent = '';
    elements.answers.innerHTML = '';
    elements.badge.style.background = '#f39c12';
    elements.badge.innerHTML = ''; // Entferne vorherigen Inhalt
    elements.badge.appendChild(createElement('i', { className: 'ri-star-line' }));
    elements.nextBtn.style.display = 'none';
    elements.score.style.display = 'block';
    elements.pauseBtn.style.display = 'none';
    elements.highscore.style.display = 'block';
    elements.closeBtn.style.display = 'inline-block';
    elements.progressBar.style.width = '100%';

    const totalPauseMs = state.pauseDurations.reduce((a, b) => a + b, 0, 0);
    const totalResponseMs = state.responseTimes.reduce((a, b) => a + b, 0, 0);
    const avgResponseTime = state.responseTimes.length > 0 ? ((totalResponseMs - totalPauseMs) / state.responseTimes.length / 1000).toFixed(1) : 0;
    const pauseSeconds = (totalPauseMs / 1000).toFixed(1);
    const accuracy = ((state.correctAnswers / state.totalQuestions) * 100).toFixed(1);

    // Nur die durchschnittliche Antwortzeit anzeigen, wenn der Timer aktiviert ist
    let statsHtml = `
      <p>Richtige Antworten: ${state.correctAnswers} von ${state.totalQuestions}</p>
      <p>Genauigkeit: ${accuracy}%</p>
      <p>⏸️ Pausen: ${state.pauseDurations.length} (insgesamt ${pauseSeconds} Sekunden)</p>
    `;
    if (state.withTimer) {
      statsHtml = `<p>Durchschnittliche Antwortzeit: ${avgResponseTime} Sekunden</p>` + statsHtml;
    }
    if (state.pausePenalty) {
      statsHtml += `<p>Strafen für Pausen: ${state.penalties}</p>`;
    }
    elements.stats.innerHTML = statsHtml;

    elements.stats.style.display = 'block';

    const reviewContainer = createElement('div', { className: 'review-container' });
    state.questions.forEach((q, idx) => {
      const entry = createElement('div', {
        className: `review-card ${q.userAnswer === q.correct ? 'correct' : q.userAnswer !== undefined ? 'incorrect' : 'unanswered'}`
      });

      const header = createElement('div', { className: 'review-card-header' }, [
        createElement('span', { className: 'review-card-status' }, [
          createElement('i', { className: q.userAnswer === q.correct ? 'ri-check-line' : q.userAnswer !== undefined ? 'ri-close-line' : 'ri-timer-line' })
        ]),
        `Frage ${idx + 1}: ${q.question}`,
        createElement('span', { className: 'review-card-toggle' }, ['▼'])
      ]);

      const body = createElement('div', { className: 'review-card-body' });
      q.shuffledAnswers.forEach((ans, i) => {
        const p = createElement('p', {
          className: `review-answer ${
            i === q.userAnswer && i === q.correct ? 'correct-answer' :
            i === q.userAnswer && i !== q.correct && q.userAnswer !== undefined ? 'wrong-answer' :
            i === q.correct ? 'correct-option' : ''
          }`
        }, [ans]);
        body.appendChild(p);
      });

      const expl = createElement('p', { className: 'review-explanation' }, []);
      expl.innerHTML = `<strong>Erklärung:</strong> ${q.explanation || "–"}`;
      body.appendChild(expl);

      header.onclick = () => {
        body.classList.toggle('open');
        const toggle = header.querySelector('.review-card-toggle');
        toggle.textContent = body.classList.contains('open') ? '▲' : '▼';
      };

      entry.appendChild(header);
      entry.appendChild(body);
      reviewContainer.appendChild(entry);
    });

    // Füge den "Highscore zurücksetzen"-Button nach dem Review-Bereich hinzu
    const quizCard = elements.quizModal.querySelector('.quiz-card');
    quizCard.appendChild(reviewContainer);
    elements.resetHighscoreBtn.style.display = 'inline-block';
    quizCard.appendChild(elements.resetHighscoreBtn);
  };

  // Funktion zum Zurücksetzen des Highscores für die aktuelle Kategorie
  const resetHighscore = () => {
    if (state.currentCategory) {
      const highscoreKey = `quizHighscore_${state.currentCategory}`;
      localStorage.removeItem(highscoreKey);
      elements.highscore.textContent = `🏆 Dein Highscore für ${questionSets[state.currentCategory].meta.label}: 0`;
    }
  };

  const closeQuiz = () => {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      elements.pauseBtn.style.display = 'none';
      elements.timerBarContainer.style.display = 'none';
    }
    elements.quizModal.style.display = 'none';
    state.current = 0;
    state.score = 0;
    state.correctAnswers = 0;
    state.responseTimes = [];
    state.pauseDurations = [];
    state.pauseStart = 0;
    state.pausedThisRound = false;
    state.penalties = 0;
    elements.score.style.display = 'none';
    elements.highscore.style.display = 'none';
    elements.closeBtn.style.display = 'none';
    elements.resetHighscoreBtn.style.display = 'none';
    elements.stats.style.display = 'none';
    elements.progressBar.style.width = '0%';

    const reviewContainer = document.querySelector('.review-container');
    if (reviewContainer) reviewContainer.remove();

    if (state.showRestart) {
      elements.restartModal.style.display = 'flex';
    }
  };

  return { init, open, closeModal, chooseCategory, nextQuestion, closeQuiz, renderCategories, resetHighscore };
})();

// Initialisierung beim Laden
window.addEventListener('DOMContentLoaded', QuizApp.init);