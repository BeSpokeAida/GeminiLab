# 🎓 GeminiLab — Simulatore didattico di Google Gemini

> Un ambiente immersivo per imparare a usare Gemini senza collegarsi a servizi reali.

![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-interno-blue)
![Built With](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20Vanilla%20JS-orange)
![AI Act](https://img.shields.io/badge/AI%20Act-compliant-green)

---

## 🧠 Cos'è GeminiLab?

**GeminiLab** è un simulatore didattico che riproduce l'interfaccia web di **Google Gemini**, l'assistente conversazionale di Google.

A differenza di slide statiche o video tutorial, gli studenti possono **navigare liberamente**: avviare chat, esplorare notebook con fonti, gestire Gem personalizzati, collegare app Google, importare contesto da altri assistenti e sperimentare la sezione Video — tutto in locale, senza account Google né chiamate API.

Progettato da **BespokeAIDA** per corsi di alfabetizzazione all'AI e formazione conforme all'**AI Act**.

---

## 🎬 Contesto d'uso

Immagina una sessione formativa su *assistenti conversazionali, memoria contestuale e integrazioni con l'ecosistema Google*.

Il docente non vuole che ogni partecipante crei un account Gemini Advanced, spenda crediti o esplori funzioni avanzate su dati reali.

Apre **GeminiLab** nel browser: ogni studente vede un'interfaccia credibile, con sidebar, chat centrale, area di lavoro BespokeAIDA e tutte le sezioni principali — e può sperimentare senza conseguenze operative.

---

## ✨ Funzionalità

### 💬 Chat principale
- Schermata home con saluto personalizzato e composer
- Invio messaggi con risposte didattiche simulate
- Selettore modello Pro e input vocale (simulato)
- Sidebar con chat recenti e sezione Notebook
- Banner educativo blu scuro sempre visibile

### ⚙️ Impostazioni (ingranaggio)
- Menu popup con tutte le voci del prodotto reale
- **Contesto personale** — toggle Memoria e Istruzioni, esempi e sezione Premium
- **Importa informazione salvata** — prompt copiabile negli appunti per migrare contesto da ChatGPT, Claude, Grok ecc.
- **Limiti di utilizzo** — barre di consumo attuale e settimanale, banner upgrade
- **App connesse** — Google Workspace (Gmail, Calendar, Docs…), Google Foto, YouTube Music, NotebookLM
- **Azioni programmate** — template suggeriti e gestione attività ricorrenti
- **Gem** — accesso al gestore Gem personalizzati
- Voci non implementate (Tema, Abbonamento, NotebookLM, Guida…) → toast informativo

### 💎 Gem (equivalente dei GPT)
- **Predefiniti di Google** — Storybook, Generatore di Idee, Consulente di carriera, Partner di programmazione
- **I miei Gem** — onboarding e lista Gem creati dall'utente
- **Crea Gem** — modale operativo con nome, descrizione, istruzioni, strumento predefinito, conoscenza e anteprima

### 📓 Notebook (equivalente dei Progetti)
- Lista notebook nella sidebar con creazione guidata
- Vista notebook con composer, tab **Chat passate** e **Fonti**
- Pulsante *Aggiungi fonti* per knowledge base del notebook
- Modale creazione nuovo notebook

### 🗂️ Raccolta (equivalente della Libreria)
- Sezione **Documenti** con empty state
- Sezione **Media** — griglia di contenuti prodotti nelle chat

### 🎬 Video
- Sezione esclusiva di Gemini: griglia di 15 template stilistici
- Composer dedicato con modalità Video e aspect ratio
- Avviso per generazione non disponibile in demo

### 🗂 Navigazione sidebar
- **Nuova chat** / **Cerca nelle chat**
- **Video** / **Raccolta**
- **Notebook** — espandibile con lista e creazione
- **Recenti** — storico chat simulate
- **Attività** — cronologia (toast informativo in demo)
- Profilo **BespokeAIDA** con badge Plus

### 🛡 Design didattico
- Funzioni non implementate → toast informativo
- Nessun dato inviato all'esterno
- Branding **BespokeAIDA** al posto di dati personali reali
- Palette nero/grigio/bianco con stella multicolor Gemini

---

## 🧱 Stack tecnico

- HTML5
- CSS3 (design tokens, tema scuro Gemini-inspired)
- JavaScript ES modules (vanilla, senza framework)
- Stato in-memory con render dichiarativo

---

## 🎯 Perché esiste

La maggior parte della formazione sui chatbot AI fallisce perché è **passiva**: si osserva l'interfaccia, non si configura.

GeminiLab nasce per rendere l'apprendimento:
- **concreto** — si esplorano Gem, notebook, app e contesto personale senza rischi
- **accessibile** — basta un browser, zero installazione
- **sicuro** — niente API, niente dati in cloud
- **conforme** — pensato per contesti regolamentati (AI Act)

L'obiettivo non è sostituire Google Gemini, ma **preparare** chi lo userà per la prima volta in produzione.

---

## 📂 Struttura del progetto

```
gemini-trainer/
├── index.html          # Entry point
├── assets/             # Logo BespokeAIDA
├── styles/
│   ├── tokens.css      # Design tokens (palette Gemini)
│   └── main.css        # Layout e componenti
└── js/
    ├── app.js          # Eventi e dispatch
    ├── state.js        # Stato iniziale e dati demo
    ├── render.js       # Rendering UI e modali
    └── icons.js        # Icone SVG inline (stella multicolor)
```

---

## 🤝 Contributi

Il progetto è mantenuto internamente da **BespokeAIDA**.

Per segnalazioni, miglioramenti all'interfaccia o nuovi scenari didattici, contattare il team formativo.

---

## ⚠️ Disclaimer

Questo progetto è destinato **esclusivamente** a scopi didattici e di alfabetizzazione all'AI.

- Non è affiliato, approvato o sponsorizzato da **Google** o **Gemini**
- Non si connette a servizi, modelli o API reali
- Non deve essere usato come sostituto del prodotto in ambienti di produzione
- L'interfaccia è una **replica non commerciale** a scopo formativo

---

**GeminiLab by BespokeAIDA** · Simulatore didattico AI Act
