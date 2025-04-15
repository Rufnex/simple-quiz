const questionSets = {
  general: {
    meta: { icon: '🧠', label: 'Allgemeinwissen' },
    options: { questionCount: '3', withTimer: true, showRestart: true, pausePenalty: false, sortOrder: 'a-z' },
    questions: [
      { question: "Wie viele Planeten hat unser Sonnensystem?", answers: ["7", "8", "9", "10"], correct: 1, explanation: "Unser Sonnensystem hat 8 Planeten: Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus und Neptun." },
      { question: "Wie viele Kontinente gibt es?", answers: ["5", "6", "7"], correct: 2, explanation: "Es gibt 7 Kontinente: Afrika, Antarktika, Asien, Australien, Europa, Nordamerika und Südamerika." },
      { question: "Wer schrieb 'Faust'?", answers: ["Goethe", "Schiller", "Lessing"], correct: 0, explanation: "Johann Wolfgang von Goethe schrieb 'Faust', ein bedeutendes Werk der deutschen Literatur." },
      { question: "Welches Land hat die meisten Einwohner?", answers: ["Indien", "China", "USA"], correct: 1, explanation: "China hat die meisten Einwohner, mit über 1,4 Milliarden Menschen (Stand 2023)." },
      { question: "Was ist die Hauptstadt von Japan?", answers: ["Kyoto", "Osaka", "Tokyo"], correct: 2, explanation: "Tokyo ist die Hauptstadt von Japan und eine der größten Städte der Welt." }
    ]
  },
  science: {
    meta: { icon: '🧪', label: 'Wissenschaft' },
    options: { questionCount: '5', withTimer: false, showRestart: false, pausePenalty: false },
    questions: [
      { question: "Was ist H2O?", answers: ["Sauerstoff", "Wasserstoff", "Wasser"], correct: 2, explanation: "H2O ist die chemische Formel für Wasser, bestehend aus zwei Wasserstoffatomen und einem Sauerstoffatom." },
      { question: "Was ist die chemische Formel von Salz?", answers: ["NaCl", "HCl", "KCl"], correct: 0, explanation: "Die chemische Formel von Kochsalz ist NaCl, bestehend aus Natrium (Na) und Chlor (Cl)." },
      { question: "Welche Teilchen umkreisen den Atomkern?", answers: ["Protonen", "Elektronen", "Neutronen"], correct: 1, explanation: "Elektronen umkreisen den Atomkern, während Protonen und Neutronen im Kern selbst sind." },
      { question: "Was ist die Einheit der elektrischen Spannung?", answers: ["Ampere", "Volt", "Ohm"], correct: 1, explanation: "Die Einheit der elektrischen Spannung ist Volt, benannt nach Alessandro Volta." },
      { question: "Welcher Planet ist der größte in unserem Sonnensystem?", answers: ["Mars", "Jupiter", "Saturn"], correct: 1, explanation: "Jupiter ist der größte Planet in unserem Sonnensystem, mit einem Durchmesser von etwa 139.820 km." }
    ]
  },
  art: {
    meta: { icon: '🎨', label: 'Kunst' },
    options: { questionCount: 'all', withTimer: true, showRestart: true, pausePenalty: false },
    questions: [
      { question: "Wer malte die Mona Lisa?", answers: ["Van Gogh", "Picasso", "Da Vinci"], correct: 2, explanation: "Leonardo da Vinci malte die Mona Lisa, ein berühmtes Kunstwerk, das im Louvre hängt." },
      { question: "Welcher Stil prägte die 1920er?", answers: ["Art Déco", "Barock", "Gotik"], correct: 0, explanation: "Art Déco war ein einflussreicher Stil der 1920er, bekannt für seine geometrischen Formen und luxuriösen Materialien." },
      { question: "Wo hängt die 'Sternennacht' von Van Gogh?", answers: ["Louvre", "MoMA", "Tate Modern"], correct: 1, explanation: "Die 'Sternennacht' von Vincent van Gogh hängt im Museum of Modern Art (MoMA) in New York." },
      { question: "Wer schuf die Skulptur 'David'?", answers: ["Michelangelo", "Donatello", "Bernini"], correct: 0, explanation: "Michelangelo schuf die berühmte Skulptur 'David', die in Florenz ausgestellt ist." },
      { question: "Welcher Künstler ist für seine 'Campbell's Soup Cans' bekannt?", answers: ["Andy Warhol", "Jackson Pollock", "Claude Monet"], correct: 0, explanation: "Andy Warhol ist bekannt für seine Pop-Art-Werke, darunter die 'Campbell's Soup Cans'." }
    ]
  },
  geo: {
    meta: { icon: '🌍', label: 'Geografie' },
    options: { questionCount: 'all', withTimer: true, showRestart: true, pausePenalty: false },
    questions: [
      { question: "Hauptstadt von Australien?", answers: ["Sydney", "Melbourne", "Canberra"], correct: 2, explanation: "Canberra ist die Hauptstadt Australiens, gewählt als Kompromiss zwischen Sydney und Melbourne." },
      { question: "Welcher ist der längste Fluss der Welt?", answers: ["Nil", "Amazonas", "Jangtse"], correct: 1, explanation: "Der Amazonas ist der längste Fluss der Welt, mit einer Länge von etwa 6.992 km." },
      { question: "Welcher Kontinent hat die meisten Länder?", answers: ["Asien", "Afrika", "Europa"], correct: 1, explanation: "Afrika hat die meisten Länder (54), gefolgt von Asien (48) und Europa (44)." },
      { question: "Welches Land grenzt an die meisten anderen Länder?", answers: ["Russland", "China", "Brasilien"], correct: 1, explanation: "China grenzt an 14 Länder, mehr als jedes andere Land." },
      { question: "Welcher Ozean ist der größte?", answers: ["Atlantik", "Indischer Ozean", "Pazifik"], correct: 2, explanation: "Der Pazifische Ozean ist der größte Ozean der Welt, mit einer Fläche von etwa 155,6 Millionen km²." }
    ]
  },
  music: {
    meta: { icon: '🎵', label: 'Musik' },
    options: { questionCount: 'all', withTimer: true, showRestart: true, pausePenalty: false },
    questions: [
      { question: "Welcher Ton ist am tiefsten?", answers: ["A", "C", "F"], correct: 0, explanation: "In der Standardstimmung ist A (La) tiefer als C (Do) und F (Fa)." },
      { question: "Welches Instrument hat Tasten?", answers: ["Violine", "Klavier", "Trompete"], correct: 1, explanation: "Das Klavier ist ein Tasteninstrument, während Violine und Trompete keine Tasten haben." },
      { question: "Was ist ein Crescendo?", answers: ["Leiser werden", "Schneller werden", "Lauter werden"], correct: 2, explanation: "Ein Crescendo bedeutet in der Musik, dass die Lautstärke allmählich zunimmt." },
      { question: "Wer komponierte die 'Fünfte Symphonie'?", answers: ["Mozart", "Beethoven", "Bach"], correct: 1, explanation: "Ludwig van Beethoven komponierte die 'Fünfte Symphonie', bekannt für ihr ikonisches 'da-da-da-dum' Motiv." },
      { question: "Welches Genre ist mit Elvis Presley verbunden?", answers: ["Jazz", "Rock 'n' Roll", "Klassik"], correct: 1, explanation: "Elvis Presley ist bekannt als der 'King of Rock 'n' Roll'." }
    ]
  },
  mixed: {
    meta: { icon: '🎲', label: 'Zufall' },
    options: { questionCount: 'all', withTimer: true, showRestart: true, pausePenalty: false },
    questions: [] // Wird in QuizApp gefüllt
  },
  general_with_penalty: {
    meta: { icon: '🧠', label: 'Allgemeinwissen (mit Timerstrafe)' },
    options: { questionCount: '3', withTimer: true, showRestart: true, pausePenalty: true },
    questions: [] // Wird in QuizApp gefüllt
  },
  quickstart: {
    meta: { icon: '⚡', label: 'Quickstart' },
    options: { questionCount: '1', withTimer: true, showRestart: true, pausePenalty: false },
    questions: [] // Wird in QuizApp gefüllt
  }
};