# 📘 Simple Quiz

## 🎯 Ziel des Spiels

Teste dein Wissen in verschiedenen Kategorien und sammle möglichst viele Punkte durch richtige Antworten und schnelle Reaktionen. Dieses Quiz-Spiel bietet eine unterhaltsame Möglichkeit, dein Wissen in Bereichen wie Allgemeinwissen, Wissenschaft, Kunst, Geografie und Musik zu testen, während du Highscores verfolgst und dein Können verbesserst.

---

## 🌐 Live-Demo

Du möchtest die Quiz-App direkt ausprobieren?

👉 **Jetzt testen unter [https://jg-webdesign.de/demos/simple-quiz/](https://jg-webdesign.de/demos/simple-quiz/)**

Die Quiz-App läuft direkt im Browser und ist vollständig responsiv. Viel Spaß beim Rätseln! 🎉\
Feedback & Ideen sind herzlich willkommen. 😎

---

## 🧩 Überblick

Simple Quiz ist ein webbasiertes Quiz-Spiel, das in HTML, CSS und JavaScript entwickelt wurde. Es wurde von Johannes Gamperl (aka Rufnex) erstellt und steht unter Public Domain. Das Projekt bietet eine Vielzahl von Kategorien, anpassbaren Einstellungen und ein Highscore-System, um den Spielspaß zu maximieren.

### Hauptmerkmale

| Funktion | Beschreibung |
| --- | --- |
| **Verschiedene Kategorien** | Wähle aus Kategorien wie Allgemeinwissen, Wissenschaft, Kunst, Geografie, Musik und mehr. |
| **Anpassbare Einstellungen** | Konfiguriere die Anzahl der Fragen, Timer, Pausenstrafe, Neustart-Option und Sortierreihenfolge. |
| **Timer und Pausenstrafe** | Optionaler 10-Sekunden-Timer pro Frage mit Pausenstrafe für zusätzliche Herausforderungen. |
| **Highscore-System** | Verfolge deinen Highscore pro Kategorie und setze ihn bei Bedarf zurück. |
| **Feedback und Erklärungen** | Erhalte nach jeder Antwort Feedback (richtig/falsch) und eine detaillierte Erklärung. |
| **Farbliche Icons** | Jede Kategorie hat ein farbiges RemixIcon zur visuellen Unterscheidung. |
| **Responsive Design** | Das Quiz passt sich an verschiedene Bildschirmgrößen an (Desktop, Tablet, Smartphone). |
| **Datenschutzfreundlich** | Alle Ressourcen (einschließlich RemixIcon, nach dem Herunterladen) sind lokal gehostet, um DSGVO-Probleme zu vermeiden. |

---

## ⚠️ Hinweis zu den Quizfragen

**Wichtiger Hinweis**: Die Quizfragen in diesem Projekt dienen ausschließlich zu Demonstrationszwecken. Sie erheben keinen Anspruch auf inhaltliche Korrektheit oder Aktualität. Die Fragen und Antworten wurden zu Test- und Unterhaltungszwecken erstellt und können Fehler enthalten. Für eine verlässliche Wissensvermittlung nutze bitte geprüfte und zuverlässige Quellen.

---

## 🛠️ Installation

### Voraussetzungen

- Ein moderner Webbrowser (z. B. Chrome, Firefox, Safari, Edge).

### Schritte

1. **Projekt herunterladen oder klonen**:

   Lade das Projekt als ZIP-Datei herunter und entpacke es, oder klone das Repository mit:

   ```bash
   git clone <repository-url>
   ```

2. **RemixIcon herunterladen**:

   - Dieses Projekt verwendet RemixIcon für die Icons. Die RemixIcon-Dateien sind nicht im Repository enthalten, um Lizenzbedingungen einzuhalten und die Projektgröße zu minimieren.
   - Besuche das offizielle Git-Repository von RemixIcon unter [https://github.com/Remix-Design/RemixIcon](https://github.com/Remix-Design/RemixIcon).
   - Lade die neueste Version als ZIP-Datei herunter.
   - Entpacke die ZIP-Datei.
   - Erstelle im Projektverzeichnis einen Ordner namens `fonts`.
   - Kopiere die folgenden Dateien aus dem heruntergeladenen RemixIcon-Paket in den `fonts`-Ordner:
     - `remixicon.css`
     - `remixicon.eot`
     - `remixicon.svg`
     - `remixicon.ttf`
     - `remixicon.woff`
     - `remixicon.woff2`
     - `remixicon.symbol.svg`

   **Hinweis**: Die RemixIcon-Dateien sind notwendig, damit die Icons im Quiz angezeigt werden können. Ohne diese Dateien werden die Icons nicht korrekt dargestellt.

3. **Projektstruktur überprüfen**:

   Nach dem Hinzufügen der RemixIcon-Dateien sollte die folgende Struktur in deinem Projektverzeichnis vorhanden sein:

   ```
   /projektverzeichnis
   ├── fonts/
   │   ├── remixicon.css
   │   ├── remixicon.eot
   │   ├── remixicon.svg
   │   ├── remixicon.ttf
   │   ├── remixicon.woff
   │   ├── remixicon.woff2
   │   └── remixicon.symbol.svg
   ├── index.html
   ├── quiz.css
   ├── quiz.js
   ├── questions.js
   └── README.md
   ```

4. **Quiz starten**:

   Öffne die `index.html`-Datei direkt in einem Browser, indem du sie doppelt klickst. Das Quiz läuft lokal ohne zusätzlichen Webserver. Alternativ kannst du die Live-Demo unter https://jg-webdesign.de/demos/simple-quiz/ testen.

---

## 🧩 So funktioniert das Quiz

### 1. Quiz starten

Auf der Startseite stehen dir verschiedene Quiz-Varianten zur Auswahl. Jede Variante ist eine Kombination aus Kategorie und Einstellungen:

- **🔢 Anzahl der Fragen**: Wähle, wie viele Fragen gestellt werden sollen (z. B. `1`, `3`, `5` oder `all`).
- **🧠 Kategorie**: Wähle aus Kategorien wie Allgemeinwissen, Wissenschaft, Kunst, Geografie, Musik, Zufall und mehr.
- **⏱️ Zeitbegrenzung**: Entscheide, ob ein Timer aktiviert sein soll (10 Sekunden pro Frage).
- **🔄 Neustart-Option**: Wähle, ob nach dem Quiz ein Neustart-Modal angezeigt werden soll.
- **⏸️ Pausenstrafe**: Aktiviere optional eine Strafpunktabzug für Pausen (nur bei aktiviertem Timer).
- **📋 Sortierreihenfolge**: Bestimme, wie die Fragen sortiert werden: zufällig (`random`), alphabetisch (`a-z`) oder in der Standardreihenfolge (`default`).

#### Verfügbare Kategorien und ihre Einstellungen

| Kategorie | Fragenanzahl | Timer | Neustart | Pausenstrafe | Sortierreihenfolge | Icon-Farbe |
| --- | --- | --- | --- | --- | --- | --- |
| Allgemeinwissen (Standard) | 3 | Ja | Ja | Nein | Alphabetisch | Dunkelblau (#1e40af) |
| Allgemeinwissen (2 Fragen, kein Timer) | 2 | Nein | Ja | Ja | Zufällig | Dunkelblau (#1e40af) |
| Wissenschaft (alphabetisch, kein Neustart) | Alle | Ja | Nein | Nein | Alphabetisch | Grün (#2ecc71) |
| Gemischte Fragen (Pausenstrafe) | Alle | Ja | Ja | Ja | Zufällig | Rot (#e74c3c) |
| Schnellstart (1 Frage, kein Timer) | 1 | Nein | Ja | Nein | Zufällig | Gelb (#f1c40f) |
| Allgemeinwissen mit Strafe (default) | Alle | Ja | Ja | Ja | Standard | Dunkelblau (#1e40af) |
| Kategorieauswahl (Modal) | \- | \- | \- | \- | \- | \- |

Zusätzlich kannst du über die "Kategorieauswahl" ein Modal öffnen, das alle verfügbaren Kategorien anzeigt, einschließlich Kunst, Geografie und Musik.

### 2. Fragen beantworten

- **Antwortmöglichkeiten**: Jede Frage bietet mehrere Antwortmöglichkeiten (die Anzahl variiert je nach Frage).
- **Timer**: Wenn aktiviert, hast du **10 Sekunden pro Frage**. Der Timer-Balken wechselt die Farbe (grün → gelb → rot), um die verbleibende Zeit anzuzeigen:
  - Grün: &gt;50% der Zeit übrig.
  - Gelb: 20–50% der Zeit übrig.
  - Rot: &lt;20% der Zeit übrig.
- **Punktevergabe**:
  - ✅ **1 Punkt** für jede richtige Antwort.
  - ⚡ **Bonuspunkte** für schnelle Antworten (abhängig von der verbleibenden Zeit, nur mit Timer). Beispiel: 8 Sekunden übrig = 8 Bonuspunkte.
- **Erklärung**: Nach jeder Antwort erhältst du Feedback (richtig/falsch) und eine detaillierte Erklärung zur Frage.
- **Tastenkürzel**: Die Antwortfelder zeigen dezente Tastaturkürzel (z. B. `1`, `2`, `3`, ...), die du verwenden kannst, um die Antwort auszuwählen.
- **Einmalige Beantwortung**: Eine Frage kann nur einmal beantwortet werden – Mehrfachantworten sind nicht möglich.

### 3. Timer & Pause

- **⏸ Pause-Button**: Unterbricht den Timer (nur bei aktiviertem Timer sichtbar). Klicke auf "Pause", um das Spiel zu pausieren.
- **▶ Fortsetzen**: Setze das Spiel fort – die Restzeit bleibt erhalten.
- **⚠️ Pausenstrafe**: Wenn aktiviert, kostet jede Pause 1 Punkt. Der Punktestand kann nicht unter 0 fallen.
- **⌛ Wichtig**: Wenn du eine Frage während der Pause beantwortest, wird die Pausenzeit trotzdem gezählt und die Pause beendet.

---

## 📊 Auswertung am Ende

Am Ende des Quiz erhältst du eine detaillierte Auswertung mit den folgenden Informationen:

| Wert | Beschreibung |
| --- | --- |
| 🧠 **Punkte** | Gesamtpunkte, einschließlich Bonuspunkte für schnelle Antworten. |
| 🏆 **Highscore** | Dein bisher bestes Ergebnis in der Kategorie. Wird im `localStorage` gespeichert. |
| 📈 **Antwortzeit (netto)** | Durchschnittliche Zeit pro Frage (ohne Pausenzeiten), in Sekunden. |
| 🎯 **Genauigkeit** | Prozentsatz der richtigen Antworten (z. B. 80% bei 4/5 richtigen Antworten). |
| ⏸️ **Pausenanzahl** | Wie oft du das Spiel pausiert hast. |
| ⌛ **Gesamtpausenzeit** | Wie lange du insgesamt pausiert hast, in Sekunden. |
| ⚠️ **Strafen** | Strafpunkte für Pausen (nur wenn Pausenstrafe aktiviert). |

### Review-Bereich

Zusätzlich wird ein **Review-Bereich** angezeigt, in dem du alle Fragen noch einmal einsehen kannst:

- **Zusammenklappbare Fragen**: Klicke auf eine Frage, um die Details zu sehen (Pfeil zeigt nach unten `▼` oder oben `▲`).
- **Details pro Frage**:
  - Deine Antwort (grün, wenn richtig; rot, wenn falsch).
  - Die korrekte Antwort (hervorgehoben).
  - Die Erklärung zur Frage.
- **Visuelle Unterscheidung**:
  - Richtig beantwortete Fragen haben einen grünen Seitenstreifen.
  - Falsch beantwortete Fragen haben einen roten Seitenstreifen.
  - Unbeantwortete Fragen (z. B. wegen Zeitablauf) haben einen gelben Seitenstreifen.

### Highscore zurücksetzen

- Am Ende der Auswertung kannst du den Highscore für die aktuelle Kategorie zurücksetzen, indem du auf "Highscore zurücksetzen" klickst (rotes Mülleimer-Icon `ri-delete-bin-line`).

---

## ⌨️ Tastaturkürzel

| Taste | Funktion |
| --- | --- |
| `1`, `2`, `3`, ... | Antwortmöglichkeiten auswählen (dynamisch basierend auf der Anzahl der Antworten). Funktioniert nur, wenn die Frage noch nicht beantwortet wurde und das Quiz nicht pausiert ist. |
| `Leertaste` | Quiz pausieren/fortfahren (nur wenn der Timer aktiviert ist und das Quiz aktiv ist). |
| `Enter` | Zur nächsten Frage wechseln (nachdem eine Antwort ausgewählt wurde, solange das Quiz nicht pausiert ist). |
| `Escape` | Quiz oder Modal schließen und zur Übersicht zurückkehren. |

---

## ⚙️ Konfiguration und Anpassung

### Startoptionen

Du kannst das Quiz mit benutzerdefinierten Optionen starten, indem du die `QuizApp.open()`-Funktion verwendest. Hier sind die verfügbaren Optionen:

#### `QuizApp.open()`-Optionen

| Option | Beschreibung | Standardwert |
| --- | --- | --- |
| `questionCount` | Anzahl der Fragen (z. B. `'5'`, `'all'`). Muss eine positive Zahl oder `'all'` sein, sonst Fehler. | `'all'` |
| `category` | Kategorie: `'general'`, `'science'`, `'art'`, `'geo'`, `'music'`, `'mixed'`, `'general_with_penalty'`, `'quickstart'`. Bei ungültigen Kategorien wird ein Fehler ausgelöst. | \- (Pflichtfeld) |
| `withTimer` | `true` = Zeitlimit (10 Sekunden pro Frage), `false` = unbegrenzte Zeit. | `true` |
| `showRestart` | `true` = Neustart-Option anzeigen, `false` = nicht anzeigen. | `true` |
| `pausePenalty` | `true` = 1 Punkt Abzug pro Pause, `false` = keine Strafe. | `false` |
| `choose` | `true` = Öffnet das Kategorieauswahl-Modal (kann nicht mit `category` kombiniert werden). | `false` |
| `sortOrder` | Sortierreihenfolge der Fragen: `'default'`, `'random'`, `'a-z'` (siehe Priorität unten). | `'random'` |

**Beispiel 1: Quiz mit 5 Fragen aus der Kategorie "science", mit Timer und Pausenstrafe:**

```javascript
QuizApp.open({
  questionCount: '5',
  category: 'science',
  withTimer: true,
  showRestart: true,
  pausePenalty: true,
  sortOrder: 'a-z'
});
```

**Beispiel 2: Kategorieauswahl-Modal öffnen:**

```javascript
QuizApp.open({
  choose: true
});
```

**Beispiel 3: Schnellstart mit 1 Frage, ohne Timer:**

```javascript
QuizApp.open({
  questionCount: '1',
  category: 'quickstart',
  withTimer: false,
  showRestart: true,
  pausePenalty: false,
  sortOrder: 'random'
});
```

#### Sortierreihenfolge (`sortOrder`) und Priorität

Die Reihenfolge der Fragen kann durch die `sortOrder`-Option gesteuert werden. Die Priorität der `sortOrder`-Einstellung ist wie folgt:

1. `window.QuizConfig.sortOrder`: Höchste Priorität (globale Konfiguration im HTML).
2. `questionSets[category].options.sortOrder`: Zweithöchste Priorität (in `questions.js` definiert).
3. `options.sortOrder` **(aus** `QuizApp.open`**)**: Dritthöchste Priorität.
4. `'random'`: Standardwert (Fallback, wenn nichts definiert ist).

**Mögliche Werte für** `sortOrder`:

| Wert | Beschreibung |
| --- | --- |
| `default` | Fragen in der Reihenfolge, wie sie in `questionSets` definiert sind. |
| `random` | Fragen werden zufällig gemischt. |
| `a-z` | Fragen werden alphabetisch nach dem Fragentext sortiert. |

**Beispiel für globale Sortierung (alphabetisch):**

Füge dies in `index.html` ein, vor dem Laden von `quiz.js`:

```html
<script>
  window.QuizConfig = { 
    sortOrder: 'a-z'
  };
</script>
```

In diesem Fall werden die Fragen in allen Kategorien alphabetisch sortiert, unabhängig von den Einstellungen in `questionSets` oder `QuizApp.open`.

---

### 🗂️ Kategorien-Konfiguration

Die Kategorienübersicht kann entweder **statisch im HTML** definiert oder **automatisch aus** `questionSets` erzeugt werden.

#### Statische Kategorien (ohne `window.QuizConfig`)

Wenn `window.QuizConfig` **nicht definiert ist**, erwartet das Skript, dass die Kategorienübersicht **statisch im HTML** vorhanden ist. Beispiel aus `index.html`:

```html
<main class="quiz-links">
  <div class="quiz-card-start" data-category="general" onclick="QuizApp.open({ category: 'general' })">
    <div class="icon">
      <i class="ri-book-line"></i>
    </div>
    <span>Allgemeinwissen (Standard)</span>
    <p>Alle Fragen, mit Timer, Neustart an, keine Pausenstrafe, zufällige Sortierung</p>
  </div>
  <div class="quiz-card-start" data-category="science" onclick="QuizApp.open({ category: 'science', sortOrder: 'a-z', withTimer: true, showRestart: false })">
    <div class="icon">
      <i class="ri-test-tube-line"></i>
    </div>
    <span>Wissenschaft (alphabetisch, kein Neustart)</span>
    <p>Alle Fragen, mit Timer, kein Neustart, keine Pausenstrafe, alphabetische Sortierung</p>
  </div>
</main>
```

- Das `data-category`-Attribut wird verwendet, um die Farbe des Icons in `quiz.css` zuzuweisen.
- Die Beschreibung (`<p>`-Tag) gibt dem Nutzer einen Hinweis auf die Einstellungen der Kategorie.

#### Automatische oder gesteuerte Erzeugung (mit `window.QuizConfig`)

Wenn `window.QuizConfig` **definiert ist**, werden die Kategorien **automatisch aus** `questionSets` erzeugt.

**Ohne** `categories`**-Eintrag**: Alle Kategorien aus `questionSets` werden automatisch verwendet.

```javascript
window.QuizConfig = {
  sortOrder: 'a-z' // Fragen alphabetisch sortieren
};
```

**Mit** `categories`**-Eintrag**: Nur die angegebenen Kategorien werden angezeigt.

```javascript
window.QuizConfig = {
  sortOrder: 'a-z', // Fragen alphabetisch sortieren
  categories: ['general', 'science'] // Nur diese Kategorien anzeigen
};
```

**Optionen für** `window.QuizConfig`:

| Option | Beschreibung | Standardwert |
| --- | --- | --- |
| `sortOrder` | Sortierreihenfolge: `'default'`, `'random'`, `'a-z'`. Hat die höchste Priorität. | `'random'` |
| `categories` | Liste der anzuzeigenden Kategorien (z. B. `['general', 'science']`). Wenn nicht gesetzt, werden alle Kategorien angezeigt. | Alle Kategorien aus `questionSets` |

> **Hinweis**: Wenn `window.QuizConfig` definiert ist, werden die Kategorien auf der Startseite, im Kategorieauswahl-Modal und im Neustart-Modal **automatisch erzeugt**. Wenn `window.QuizConfig` **nicht definiert ist**, werden die **statisch im HTML definierten Karten** verwendet.

**Warnung bei Fehlkonfiguration**:\
Wenn ungültige Kategorien in `window.QuizConfig.categories` angegeben werden, wird eine Warnung in der Konsole ausgegeben, und die betroffenen Kategorien werden ignoriert.

---

### Fragen und Kategorien definieren (`questions.js`)

Die Datei `questions.js` enthält die Kategorien und Fragen des Quiz. Sie ist im JSON-Format aufgebaut und kann leicht angepasst werden.

#### Aufbau von `questions.js`

Die Datei definiert ein Objekt `questionSets`, das mehrere Kategorien enthält. Jede Kategorie hat die folgende Struktur:

| Schlüssel | Beschreibung |
| --- | --- |
| `meta` | Enthält Metadaten wie das Icon (`icon`) und den Namen der Kategorie (`label`). |
| `options` | Enthält die Standard-Einstellungen für die Kategorie (siehe `QuizApp.open()`-Optionen). |
| `questions` | Ein Array von Fragenobjekten, die die Fragen, Antwortmöglichkeiten, die richtige Antwort und eine Erklärung enthalten. |

**Beispiel einer Kategorie:**

```javascript
const questionSets = {
  general: {
    meta: { icon: 'ri-book-line', label: 'Allgemeinwissen' },
    options: { questionCount: '3', withTimer: true, showRestart: true, pausePenalty: false, sortOrder: 'a-z' },
    questions: [
      {
        question: "Wie viele Planeten hat unser Sonnensystem?",
        answers: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "Unser Sonnensystem hat 8 Planeten: Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus und Neptun."
      },
      {
        question: "Wie viele Kontinente gibt es?",
        answers: ["5", "6", "7"],
        correct: 2,
        explanation: "Es gibt 7 Kontinente: Afrika, Antarktika, Asien, Australien, Europa, Nordamerika und Südamerika."
      }
    ]
  }
};
```

**Aufbau eines Fragenobjekts**:

| Schlüssel | Beschreibung |
| --- | --- |
| `question` | Der Fragentext (z. B. "Wie viele Planeten hat unser Sonnensystem?"). |
| `answers` | Ein Array von Antwortmöglichkeiten (z. B. `["7", "8", "9", "10"]`). |
| `correct` | Der Index der richtigen Antwort im `answers`-Array (z. B. `1` für die zweite Antwort). |
| `explanation` | Eine Erklärung, die nach der Beantwortung angezeigt wird (z. B. "Unser Sonnensystem hat 8 Planeten..."). |

**Hinweise**:

- Kategorien wie `mixed`, `general_with_penalty` und `quickstart` können ein leeres `questions`-Array haben, da sie dynamisch aus anderen Kategorien gefüllt werden (siehe `quiz.js`).
- Die `meta.icon`-Eigenschaft verwendet RemixIcon-Klassen (z. B. `ri-book-line`). Du kannst andere RemixIcon-Icons aus der RemixIcon-Dokumentation auswählen.

#### Neue Kategorie hinzufügen

1. Öffne die `questions.js`-Datei.

2. Füge eine neue Kategorie hinzu:

   ```javascript
   questionSets.newCategory = {
     meta: { icon: 'ri-star-line', label: 'Neue Kategorie' },
     options: { questionCount: 'all', withTimer: true, showRestart: true, pausePenalty: false, sortOrder: 'random' },
     questions: [
       {
         question: "Was ist die Hauptstadt von Brasilien?",
         answers: ["Rio de Janeiro", "São Paulo", "Brasília"],
         correct: 2,
         explanation: "Brasília ist die Hauptstadt von Brasilien, seit 1960."
       }
     ]
   };
   ```

3. Füge die Kategorie zur Startseite in `index.html` hinzu (für statische Kategorien):

   ```html
   <div class="quiz-card-start" data-category="newCategory" onclick="QuizApp.open({ category: 'newCategory' })">
     <div class="icon">
       <i class="ri-star-line"></i>
     </div>
     <span>Neue Kategorie</span>
     <p>Alle Fragen, mit Timer, Neustart an, keine Pausenstrafe, zufällige Sortierung</p>
   </div>
   ```

4. Optional: Passe die Farbe der neuen Kategorie in `quiz.css` an:

   ```css
   .quiz-card-start[data-category="newCategory"] .icon i,
   .category-card[data-category="newCategory"] .icon i {
     color: #ff0000; /* Rot für die neue Kategorie */
   }
   ```

#### Neue Fragen hinzufügen

1. Öffne die `questions.js`-Datei.

2. Füge eine neue Frage zu einer bestehenden Kategorie hinzu:

   ```javascript
   questionSets.general.questions.push({
     question: "Was ist die Hauptstadt von Kanada?",
     answers: ["Toronto", "Ottawa", "Vancouver"],
     correct: 1,
     explanation: "Ottawa ist die Hauptstadt von Kanada."
   });
   ```

3. Speichere die Datei – die neuen Fragen werden automatisch im Quiz verwendet.

---

### Farben der Icons anpassen

Die Farben der Icons sind in `quiz.css` unter den Klassen `.quiz-card-start[data-category="..."] .icon i` und `.category-card[data-category="..."] .icon i` definiert. Du kannst die Farben nach deinen Wünschen anpassen:

**Beispiel: Farbe für Allgemeinwissen ändern**

```css
.quiz-card-start[data-category="general"] .icon i,
.category-card[data-category="general"] .icon i,
.quiz-card-start[data-category="general_with_penalty"] .icon i,
.category-card[data-category="general_with_penalty"] .icon i {
  color: #ff0000; /* Ändere zu Rot */
}
```

**Aktuelle Farben**:

| Kategorie | Icon-Farbe |
| --- | --- |
| Allgemeinwissen (Standard) | Dunkelblau (#1e40af) |
| Allgemeinwissen mit Strafe | Dunkelblau (#1e40af) |
| Wissenschaft | Grün (#2ecc71) |
| Kunst | Lila (#9b59b6) |
| Geografie | Blau (#3498db) |
| Musik | Orange (#e67e22) |
| Zufall (Mixed) | Rot (#e74c3c) |
| Schnellstart | Gelb (#f1c40f) |

---

## 🎨 Verwendung von RemixIcon

Dieses Projekt verwendet **RemixIcon** als Icon-Bibliothek, um visuell ansprechende und moderne Icons für die Kategorien und die Benutzeroberfläche bereitzustellen.

### Warum RemixIcon?

- **Open Source**: RemixIcon ist unter der Apache License 2.0 verfügbar, was die Nutzung für persönliche und kommerzielle Projekte erlaubt.
- **Vielfalt**: Mit über 2.000 Icons in zwei Stilen (Line und Fill) bietet RemixIcon eine große Auswahl für verschiedene Anwendungsfälle.
- **Datenschutzfreundlich**: Die Icons werden lokal im `fonts`-Ordner gehostet (nach dem Herunterladen), um externe Abhängigkeiten zu vermeiden und Datenschutzbedenken (DSGVO) zu adressieren. Es werden keine Daten an externe Server gesendet.

### Integration von RemixIcon

Die RemixIcon-Dateien müssen aus dem offiziellen Git-Repository Remix-Design/RemixIcon heruntergeladen und in den `fonts`-Ordner des Projekts eingefügt werden (siehe Installationsanweisungen). Sie werden in `index.html` über die `remixicon.css` eingebunden:

```html
<link rel="stylesheet" href="fonts/remixicon.css">
```

Die Icons werden dann über Klassen wie `ri-book-line`, `ri-test-tube-line` usw. in den HTML-Elementen verwendet. Jede Kategorie hat ein spezifisches Icon, das in `questions.js` definiert ist (z. B. `ri-book-line` für Allgemeinwissen).

### Anpassung der Icons

Du kannst die verwendeten Icons anpassen, indem du die `meta.icon`-Eigenschaft in `questions.js` änderst:

1. Öffne die Datei `questions.js`.

2. Wähle ein neues Icon aus der RemixIcon-Dokumentation oder dem Remix-Design/RemixIcon Git-Repository.

3. Ändere die `icon`-Eigenschaft der gewünschten Kategorie:

   ```javascript
   questionSets.general.meta.icon = 'ri-brain-line'; // Ändert das Icon für Allgemeinwissen zu einem Gehirn-Symbol
   ```

4. Aktualisiere ggf. die Farbe des neuen Icons in `quiz.css`, falls nötig.

### Lizenzhinweis für RemixIcon

RemixIcon ist unter der **Apache License 2.0** lizenziert. Dies bedeutet, dass du die Icons frei verwenden, modifizieren und verteilen kannst, solange du die Lizenzbedingungen einhältst. Stelle sicher, dass du die Lizenzbedingungen einhältst, wenn du die Icons weiterverwendest (siehe Abschnitt "Lizenz" für weitere Details).

---

## 🛠️ Fehlerbehandlung

Das Quiz ist robust gegen Fehler und bietet klare Rückmeldungen, wenn etwas schiefgeht:

| Fehler | Beschreibung | Reaktion |
| --- | --- | --- |
| Ungültige Kategorie | Wenn eine Kategorie in `QuizApp.open()` nicht existiert. | Fehler: `Category "..." not found in questionSets.` |
| Keine Fragen in der Kategorie | Wenn eine Kategorie keine Fragen enthält. | Fehler: `No questions found for category "...".` |
| Ungültiger `questionCount` | Wenn `questionCount` keine positive Zahl oder `'all'` ist (z. B. `'0'` oder `'abc'`). | Fehler: `Invalid questionCount "...". Must be a positive number or "all".` |
| Ungültiger `sortOrder` | Wenn ein ungültiger `sortOrder`-Wert angegeben wird (z. B. `'invalid'`). | Warnung in der Konsole: `'random'` wird als Fallback verwendet. |
| Ungültige Kategorien in `window.QuizConfig.categories` | Wenn Kategorien in `window.QuizConfig.categories` nicht existieren. | Warnung in der Konsole: Ungültige Kategorien werden ignoriert. |

**Hinweis**: Alle Werte (z. B. Highscore, letzte Kategorie) werden im `localStorage` des Browsers gespeichert. Dein Highscore bleibt also erhalten, bis du den Browser-Verlauf löschst oder einen anderen Browser verwendest.

---

## 📄 Lizenz

Dieses Projekt steht unter **Public Domain**. Du darfst es frei nutzen, kopieren, verändern, verbreiten und auch kommerziell einsetzen – ohne Einschränkungen.

Ein Hinweis auf den ursprünglichen Autor ("Johannes Gamperl aka Rufnex") ist im Code und in dieser Dokumentation enthalten und wird geschätzt, ist aber nicht erforderlich.

**Hinweis zu RemixIcon**: Die verwendeten Icons aus RemixIcon stehen unter der **Apache License 2.0**. Wenn du die Icons mit deinem Projekt weiterverwendest, stelle sicher, dass du die Lizenzbedingungen einhältst. Eine Kopie der Lizenz findest du im RemixIcon Git-Repository.


