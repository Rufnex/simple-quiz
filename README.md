
# 📘 Quiz-App – Nutzeranleitung

## 🎯 Ziel des Spiels
Teste dein Wissen in verschiedenen Kategorien und sammle möglichst viele Punkte durch richtige Antworten und schnelle Reaktionen.

---

## 🌐 Live-Demo

Du möchtest die Quiz-App direkt ausprobieren?

👉 **Jetzt testen unter [https://jg-webdesign.de/demos/simple-quiz/](https://jg-webdesign.de/demos/simple-quiz/)**

Die Quiz-App läuft direkt im Browser – responsiv. Viel Spaß beim Rätseln! 🎉  
Feedback & Ideen sind willkommen. 😎

---

## 🧩 So funktioniert das Quiz

### 1. Quiz starten
Wähle auf der Startseite eine Quiz-Variante:
- 🔢 **Anzahl der Fragen**: Wähle, wie viele Fragen gestellt werden sollen (z. B. 1, 3, 5 oder alle).
- 🧠 **Kategorie**: Wähle aus verschiedenen Kategorien wie Allgemeinwissen, Wissenschaft, Kunst, Geografie, Musik oder Zufall.
- ⏱️ **Zeitbegrenzung**: Entscheide, ob ein Timer aktiviert sein soll (10 Sekunden pro Frage).
- 🔄 **Neustart-Option**: Nach dem Quiz kannst du entscheiden, ob eine Neustart-Option angezeigt wird.
- ⏸️ **Pausenstrafe**: Aktiviere optional eine Strafpunktabzug für Pausen (nur bei aktiviertem Timer).
- 📋 **Sortierreihenfolge**: Bestimme, wie die Fragen sortiert werden: zufällig (`random`), alphabetisch (`a-z`) oder in der Standardreihenfolge (`default`).

Die Kategorien können entweder **statisch** im HTML definiert oder **automatisch** aus den Kategorien (`questionSets`) generiert werden.

### 2. Fragen beantworten
- Pro Frage stehen dir mehrere Antwortmöglichkeiten zur Verfügung (Anzahl variiert je nach Frage).
- Wenn der **Timer aktiviert ist**, hast du **10 Sekunden Zeit**. Der Timer-Balken wechselt die Farbe (grün → gelb → rot), um die Dringlichkeit anzuzeigen.
- Jede Frage bringt:
  - ✅ **1 Punkt** für die richtige Antwort.
  - ⚡ **Bonuspunkte** für schnelle Antworten (abhängig von der verbleibenden Zeit).
- Nach jeder Antwort erhältst du eine **Erklärung**, warum die Antwort richtig oder falsch ist.
- Die Antwortfelder zeigen dezente Tastaturkürzel (z. B. `1`, `2`, `3`, ...), die du verwenden kannst, um die Antwort auszuwählen.
- Eine Frage kann nur einmal beantwortet werden – Mehrfachantworten sind nicht möglich.

### 3. Timer & Pause
- ⏸ **Pause-Button**: Unterbricht den Timer (nur bei aktiviertem Timer sichtbar).
- ▶ **Fortsetzen**: Timer läuft weiter, Restzeit bleibt erhalten.
- ⚠️ **Pausenstrafe**: Wenn aktiviert, kostet jede Pause 1 Punkt (optional).
- ⌛ **Wichtig**: Wenn du eine Frage während der Pause beantwortest, wird die Pausenzeit trotzdem gezählt.

---

## 📊 Auswertung am Ende

Am Ende des Quiz erhältst du eine detaillierte Auswertung:

| Wert                          | Bedeutung                                  |
|------------------------------|--------------------------------------------|
| 🧠 **Punkte**                 | Gesamtpunkte inklusive Bonus              |
| 🏆 **Highscore**             | Dein bisher bestes Ergebnis               |
| 📈 **Antwortzeit (netto)**   | Durchschnittliche Zeit ohne Pausen        |
| 🎯 **Genauigkeit**           | Prozentzahl richtiger Antworten           |
| ⏸️ **Pausenanzahl**          | Wie oft du pausiert hast                  |
| ⌛ **Gesamtpausenzeit**      | Wie lange du insgesamt pausiert hast      |
| ⚠️ **Strafen**               | Strafpunkte für Pausen (falls aktiviert)  |

Zusätzlich wird ein **Review-Bereich** angezeigt, in dem du alle Fragen noch einmal einsehen kannst:
- Jede Frage ist zusammenklappbar (klick auf die Frage, um Details zu sehen).
- Zeigt die richtige Antwort, deine Antwort und die Erklärung.

---

## ⌨️ Tastaturkürzel

- `1`, `2`, `3`, ... → Antwortauswahl (dynamisch basierend auf der Anzahl der Antworten, z. B. `1` bis `5` für 5 Antworten). Funktioniert nur, wenn die Frage noch nicht beantwortet wurde.
- `Leertaste` → Pause/Fortfahren (nur wenn das Quiz aktiv ist).
- `Enter` → Zur nächsten Frage wechseln (nachdem eine Antwort ausgewählt wurde, solange das Quiz nicht pausiert ist).
- `Escape` → Quiz schließen / zurück zur Übersicht.

---

## ⚙️ Startoptionen (für Entwickler oder Power-User)

Du kannst das Quiz mit benutzerdefinierten Optionen starten:

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

### Option | Beschreibung
--- | ---
**questionCount** | Anzahl der Fragen (z. B. '5', 'all'). Muss eine positive Zahl oder 'all' sein, sonst wird ein Fehler ausgelöst.
**category** | Kategorie: 'general', 'science', 'art', 'geo', 'music', 'mixed', 'general_with_penalty', 'quickstart'. Bei ungültigen Kategorien wird ein Fehler ausgelöst.
**withTimer** | true = Zeitlimit (10 Sekunden), false = unbegrenzte Zeit.
**showRestart** | true = Neustart-Option anzeigen, false = nicht anzeigen.
**pausePenalty** | true = 1 Punkt Abzug pro Pause, false = keine Strafe.
**choose** | true = Öffnet das Kategorieauswahl-Modal.
**sortOrder** | Sortierreihenfolge der Fragen: 'default', 'random', 'a-z'.

### Sortierreihenfolge (sortOrder) und Priorität

Die Reihenfolge der Fragen kann durch die sortOrder-Option gesteuert werden. Die Priorität der sortOrder-Einstellung ist wie folgt:

1. `window.QuizConfig.sortOrder` – höchste Priorität (globale Konfiguration im HTML).
2. `questionSets[category].options.sortOrder` – zweithöchste Priorität (in der JSON-Datei questions.js).
3. `options.sortOrder` (aus `QuizApp.open`) – dritthöchste Priorität.
4. `'random'` – Standardwert (Fallback, wenn nichts definiert ist).

#### Mögliche Werte für sortOrder:

- `'default'`: Fragen in der Reihenfolge, wie sie in `questionSets` definiert sind.
- `'random'`: Fragen werden zufällig gemischt.
- `'a-z'`: Fragen werden alphabetisch nach dem Fragentext sortiert.

#### Beispiel:

```html
<script>
  window.QuizConfig = { 
    sortOrder: 'a-z'
  };
</script>
```

In diesem Fall werden die Fragen alphabetisch sortiert, unabhängig von den Einstellungen in `questionSets` oder `QuizApp.open`.

---

## 🗂️ Kategorien-Konfiguration

### Statische Kategorien (ohne `window.QuizConfig`)

```html
<main class="quiz-links">
  <div class="quiz-card-start" onclick="QuizApp.open({ category: 'general' })">
    <div class="icon">🧠</div>
    <span>Allgemeinwissen</span>
  </div>
  <div class="quiz-card-start" onclick="QuizApp.open({ category: 'science' })">
    <div class="icon">🔬</div>
    <span>Wissenschaft</span>
  </div>
</main>
```

### Automatische Erzeugung (mit `window.QuizConfig`)

```javascript
window.QuizConfig = {
  sortOrder: 'a-z' // Fragen alphabetisch sortieren
};
```

#### Nur bestimmte Kategorien anzeigen

```javascript
window.QuizConfig = {
  sortOrder: 'a-z',
  categories: ['general', 'science']
};
```

### Option | Beschreibung
--- | ---
**sortOrder** | Sortierreihenfolge der Fragen: 'default', 'random', 'a-z' (höchste Priorität).
**categories** | Liste der anzuzeigenden Kategorien (z. B. ['general', 'science']). Wenn nicht angegeben, werden alle Kategorien erzeugt.

---

## 🛠️ Fehlerbehandlung

- **Ungültige Kategorien**: Wenn eine Kategorie nicht existiert, wird ein Fehler ausgelöst (`throw new Error`), und das Skript stoppt.
- **Keine Fragen in der Kategorie**: Wenn eine Kategorie keine Fragen enthält, wird ein Fehler ausgelöst (`throw new Error`).
- **Ungültiger `questionCount`**: Wenn `questionCount` keine positive Zahl oder 'all' ist, wird ein Fehler ausgelöst.
- **Ungültiger `sortOrder`**: Wenn ein ungültiger `sortOrder`-Wert angegeben wird, wird eine Warnung in der Konsole ausgegeben, und `'random'` wird als Fallback verwendet.

💡 Hinweis: Alle Werte (z. B. Highscore, letzte Kategorie) werden im Browser gespeichert (`localStorage`). Dein Highscore bleibt also erhalten – außer du löschst den Verlauf oder wechselst den Browser.

---

## 📄 Lizenz

Dieses Projekt ist vollständig frei nutzbar (Public Domain).

Du darfst es kopieren, verändern, verbreiten und verwenden – auch kommerziell – ohne Einschränkungen.

Ein Hinweis auf den ursprünglichen Autor ("Johannes Gamperl aka Rufnex") ist im Code und in dieser Dokumentation enthalten und willkommen, aber nicht erforderlich.
