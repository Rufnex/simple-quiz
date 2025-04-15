
# 📘 Quiz-App – Nutzeranleitung

## 🎯 Ziel des Spiels
Teste dein Wissen in verschiedenen Kategorien und sammle möglichst viele Punkte durch richtige Antworten und schnelle Reaktionen.

---

## 🧩 So funktioniert das Quiz

### 1. Quiz starten
Wähle auf der Startseite eine Quiz-Variante:
- 🔢 Anzahl der Fragen
- 🧠 Kategorie (z. B. Allgemeinwissen, Wissenschaft, Kunst …)
- ⏱️ Ob mit oder ohne Zeitbegrenzung
- 🔄 Ob das Quiz nach dem Ende neu gestartet werden kann

### 2. Fragen beantworten
- Pro Frage stehen dir **3 Antwortmöglichkeiten** zur Verfügung.
- Wenn der **Timer aktiviert ist**, hast du **10 Sekunden Zeit**.
- Jede Frage bringt:
  - ✅ **1 Punkt** für die richtige Antwort
  - ⚡ **Bonuspunkte** für schnelle Antworten

### 3. Timer & Pause
- ⏸ **Pause-Button**: Unterbricht den Timer (nur bei aktivem Timer sichtbar)
- ▶ **Fortsetzen**: Timer läuft weiter, Restzeit bleibt erhalten
- ⌛ **Wichtig**: Wenn du eine Frage **während der Pause beantwortest**, wird die Pausenzeit trotzdem gezählt.

---

## 📊 Auswertung am Ende

| Wert                          | Bedeutung                                  |
|------------------------------|--------------------------------------------|
| 🧠 **Punkte**                 | Gesamtpunkte inklusive Bonus               |
| 🏆 **Highscore**             | Dein bisher bestes Ergebnis                |
| 📈 **Antwortzeit (netto)**   | Durchschnittliche Zeit ohne Pausen         |
| 🎯 **Genauigkeit**           | Prozentzahl richtiger Antworten            |
| ⏸️ **Pausenanzahl**          | Wie oft du pausiert hast                   |
| ⌛ **Gesamtpausenzeit**       | Wie lange du insgesamt pausiert hast       |

---

## ⌨️ Tastaturkürzel

- `1`, `2`, `3` → Antwortauswahl
- `Leertaste` → Pause / Fortsetzen
- `Escape` → Quiz schließen / zurück zur Übersicht

---

## ⚙️ Startoptionen (für Entwickler oder Power-User)

Du kannst das Quiz mit benutzerdefinierten Optionen starten:

```js
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
| `questionCount`| Anzahl der Fragen (z. B. `'5'`, `'all'`)                      |
| `category`     | Kategorie: `'general'`, `'science'`, `'art'`, `'geo'`, usw.   |
| `withTimer`    | `true` = Zeitlimit, `false` = unbegrenzte Zeit               |
| `showRestart`  | Zeigt nach dem Quiz die Möglichkeit zum Neustart             |
| `pausePenalty` | Aktiviert Straf- oder Statistik-Erfassung für Pausen         |

---

💡 **Hinweis:** Alle Werte werden im **Browser gespeichert**, dein Highscore bleibt also erhalten – außer du löschst den Verlauf oder wechselst den Browser.

---

## 📄 Lizenz

Dieses Projekt ist vollständig frei nutzbar (Public Domain).  
Du darfst es kopieren, verändern, verbreiten und verwenden – auch kommerziell – ohne Einschränkungen.  
Ein Hinweis auf den ursprünglichen Autor ("Rufnex") ist willkommen, aber nicht erforderlich.
