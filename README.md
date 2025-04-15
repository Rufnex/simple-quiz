
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

Die Quiz-Varianten können entweder **statisch** im HTML definiert oder **dynamisch** aus den Kategorien (`questionSets`) generiert werden.

### 2. Fragen beantworten
- Pro Frage stehen dir **3 Antwortmöglichkeiten** zur Verfügung.
- Wenn der **Timer aktiviert ist**, hast du **10 Sekunden Zeit**.
- Jede Frage bringt:
  - ✅ **1 Punkt** für die richtige Antwort.
  - ⚡ **Bonuspunkte** für schnelle Antworten (abhängig von der verbleibenden Zeit).
- Nach jeder Antwort erhältst du eine **Erklärung**, warum die Antwort richtig oder falsch ist.

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

- `1`, `2`, `3` → Antwortauswahl
- `Leertaste` → Pause / Fortsetzen
- `Escape` → Quiz schließen / zurück zur Übersicht

---

## ⚙️ Startoptionen (für Entwickler oder Power-User)

Du kannst das Quiz mit benutzerdefinierten Optionen starten:

```javascript
QuizApp.open({
  questionCount: '5',
  category: 'science',
  withTimer: true,
  showRestart: true,
  pausePenalty: true
});
```

| Option         | Beschreibung                                                  |
|----------------|---------------------------------------------------------------|
| questionCount  | Anzahl der Fragen (z. B. '5', 'all')                          |
| category       | Kategorie: 'general', 'science', 'art', 'geo', 'music', 'mixed', 'general_with_penalty', 'quickstart' |
| withTimer      | true = Zeitlimit (10 Sekunden), false = unbegrenzte Zeit     |
| showRestart    | true = Neustart-Option anzeigen, false = nicht anzeigen      |
| pausePenalty   | true = 1 Punkt Abzug pro Pause, false = keine Strafe         |
| choose         | true = Öffnet das Kategorieauswahl-Modal                     |

### Dynamische Kategorien-Konfiguration

Du kannst die angezeigten Kategorien über `QuizConfig` steuern:

```javascript
window.QuizConfig = {
  dynamic: true, // Dynamische Erzeugung der Kategorien aktivieren
  categories: ['general', 'science'] // Nur diese Kategorien anzeigen
};
```

| Option     | Beschreibung                                                                 |
|------------|-------------------------------------------------------------------------------|
| dynamic    | true = Kategorien dynamisch aus questionSets erzeugen, false = statisch     |
| categories | Liste der anzuzeigenden Kategorien (z. B. ['general', 'science'])            |

> Wenn `dynamic: true` ist, werden nur die in `categories` aufgeführten Kategorien auf der Startseite, im Kategorieauswahl-Modal und im Neustart-Modal angezeigt.  
> Wenn `dynamic: false`, werden die statisch im HTML definierten Karten verwendet, und die Kategorieauswahl-Modal zeigt alle verfügbaren Kategorien aus `questionSets`.

---

## 💡 Hinweis

Alle Werte (z. B. Highscore, letzte Kategorie) werden im Browser gespeichert, dein Highscore bleibt also erhalten – außer du löschst den Verlauf oder wechselst den Browser.

---

## 📄 Lizenz

Dieses Projekt ist vollständig frei nutzbar (Public Domain).

Du darfst es kopieren, verändern, verbreiten und verwenden – auch kommerziell – ohne Einschränkungen.

Ein Hinweis auf den ursprünglichen Autor ("Rufnex") ist willkommen, aber nicht erforderlich.
