export const IMPORT_PROMPT = `Mi stai aiutando a importare il contesto da un assistente AI a un altro. Il tuo compito è quello di ripercorrere le nostre conversazioni passate e riassumere ciò che sai di me.

Nell'output, evita di usare pronomi in prima persona (io, mio, mia, miei, mie) e in seconda persona (tu, tuo, tua, tuoi, tue). Invece, fai riferimento alla persona di cui hai appreso informazioni come "l'utente" o utilizza un linguaggio neutro.

Se possibile, riporta le parole dell'utente alla lettera, soprattutto per istruzioni e preferenze.

Categorie (output in questo ordine):
1. Informazioni demografiche: nomi preferiti, professione, istruzione e residenza generale.
2. Interessi e preferenze: coinvolgimenti attivi e continuativi (non solo il possesso di un oggetto o un acquisto una tantum).
3. Relazioni: relazioni confermate e durature.
4. Eventi, progetti e piani con data: un registro delle attività recenti significative.
5. Istruzioni: regole che ti ho chiesto esplicitamente di seguire in futuro, ad esempio "fai sempre X", "non fare mai Y", e correzioni al tuo comportamento. Includi solo le regole tratte dalle informazioni salvate memorizzate, non dalle conversazioni.

Formato:
Dividi i contenuti nella sezione etichettata utilizzando le categorie sopra. Cerca di includere citazioni testuali dei miei prompt che giustifichino ogni voce. Struttura ogni voce utilizzando questo formato:
* Il nome dell'utente è <name>.
    * Prova: l'utente ha detto "chiamami <name>". Data: [YYYY-MM-DD].

Output:
- Restituisci SOLO le informazioni richieste. Non includere riempitivi colloquiali, testo introduttivo o chiusure.

Infine, completa la frase "Informazioni importate da: <name>", dove "name" è ChatGPT, Claude, Grok ecc. Questo deve essere il testo finale assoluto nella tua risposta.`;

export const initialState = {
  view: "chat",
  modal: null,            // null | "create-notebook"
  settingsMenuOpen: false,

  composerText: "",
  messages: [],

  /* Contesto personale */
  memoriaEnabled: false,
  istruzioniEnabled: true,
  importedInfo: "",

  /* Notebook */
  notebookExpanded: true,
  activeNotebook: null,
  notebookTab: "chat",   // chat | fonti
  notebookDraft: { name: "" },

  /* Gem */
  gemTab: "predefiniti", // predefiniti | miei
  gemDraft: { name: "", desc: "", instructions: "" },
  myGems: [],

  /* App connesse */
  connectedApps: ["workspace"],
  appFilter: "google",

  /* Raccolta */
  raccoltaFilter: "tutti",

  /* Video */
  videoDraft: "",
  videoTemplate: null,

  /* --- DATA --- */

  chats: [
    { id: 1,  title: "Donne in tuta motion capture su corda" },
    { id: 2,  title: "Ripristino Volti Deformati in Foto" },
    { id: 3,  title: "Miglioramento Qualità Logo Senza Alta..." },
    { id: 4,  title: "Rimozione Scarabocchi Blu da Foto" },
    { id: 5,  title: "Volto Trasferito Tra Immagini" },
    { id: 6,  title: "Trasformazione Foto Stagista con Felpa" },
    { id: 7,  title: "Aggiunta Membro Team Felpa Logo" },
    { id: 8,  title: "Migliora la qualità del logo SENZA MOD..." },
    { id: 9,  title: "Chiarimento Richiesta Previsioni Terra" },
    { id: 10, title: "Controllo Plagio: Limiti e Consigli" },
    { id: 11, title: "Richiesta Biglietto Auguri Con Persona..." },
    { id: 12, title: "Modifica Testo PDF Tramite AI" },
    { id: 13, title: "avrei bisogno che senza assolutamente..." },
    { id: 14, title: "Divisore di Testo Tricolore" },
    { id: 15, title: "Crea una immagine di sfondo per un p..." },
  ],

  notebooks: [
    { id: "nb1", name: "Test" },
    { id: "nb2", name: "Untitled notebook" },
  ],

  predefinedGems: [
    { id: "pg1", name: "Storybook", tag: "Esperimento", desc: "Crea un libro illustrato personalizzato, per bambini o adulti, in base a un tema scelto...", color: "#1a73e8" },
    { id: "pg2", name: "Generatore di Idee", tag: null, desc: "Trova facilmente ispirazione e idee originali per feste, regali, nuove attività e tanto altro...", color: "#f0ab00" },
    { id: "pg3", name: "Consulente di carriera", tag: null, desc: "Sfrutta al meglio il tuo potenziale professionale. Ottieni un piano dettagliato personalizzato...", color: "#e91e63" },
    { id: "pg4", name: "Partner di programmazione", tag: null, desc: "Migliora la tua capacità di programmazione. Ottieni l'aiuto di cui hai bisogno per ogni sfida...", color: "#0f9d58" },
  ],

  scheduledTemplates: [
    { id: "st1", emoji: "⚽", name: "Sintesi delle notizie sul calcio", desc: "Aggiornami sulle notizie di calcio internazionale" },
    { id: "st2", emoji: "📰", name: "Sintesi delle notizie", desc: "Aggiornami sulle notizie" },
    { id: "st3", emoji: "🔭", name: "Esplorazioni", desc: "Soddisfa la mia curiosità insegnandomi qualcosa di nuovo ogni giorno" },
    { id: "st4", emoji: "🍽", name: "Cosa c'è per cena?", desc: "Inviami ricette per cene salutari ogni fine settimana" },
  ],

  googleApps: [
    {
      id: "workspace", name: "Google Workspace", icon: "🟩",
      desc: "Ricevi, trova e ottieni risposte dai tuoi contenuti per sostenere il tuo progetto.",
      subApps: [
        { name: "Gmail",          handle: "@Gmail" },
        { name: "Google Calendar",handle: "@Google Calendar" },
        { name: "Google Docs",    handle: "@Google Docs" },
        { name: "Google Drive",   handle: "@Google Drive" },
        { name: "Google Keep",    handle: "@Google Keep" },
        { name: "Google Tasks",   handle: "@Google Tasks" },
      ],
    },
    { id: "foto",       name: "Google Foto",   icon: "📷", desc: "Riconosci approfondimenti personalizzati in base alle tue foto..." },
    { id: "youtube",    name: "YouTube Music", icon: "🎵", desc: "Riproduci; cerca e scopri le canzoni, gli artisti e le playlist..." },
    { id: "notebooklm", name: "NotebookLM",    icon: "📓", desc: "I notebook sono un modo per organizzare i tuoi progetti nelle app Gemini..." },
  ],

  videoTemplates: [
    { id: "vt1",  name: "Animali parlanti",          emoji: "🐾", color: "#2e7d32" },
    { id: "vt2",  name: "Anime",                     emoji: "🎌", color: "#ad1457" },
    { id: "vt3",  name: "Avventura a 8 bit",         emoji: "🎮", color: "#6a1b9a" },
    { id: "vt4",  name: "Mondo di peluche",          emoji: "🧸", color: "#e65100" },
    { id: "vt5",  name: "Invito alla festa",         emoji: "🎉", color: "#b71c1c" },
    { id: "vt6",  name: "Vlog caotico",              emoji: "📹", color: "#1565c0" },
    { id: "vt7",  name: "Fumetto",                   emoji: "💥", color: "#f57f17" },
    { id: "vt8",  name: "Videogioco",                emoji: "🕹",  color: "#4527a0" },
    { id: "vt9",  name: "Noir",                      emoji: "🎩", color: "#37474f" },
    { id: "vt10", name: "Origami",                   emoji: "📄", color: "#00695c" },
    { id: "vt11", name: "Cabina fotografica a 360°", emoji: "📸", color: "#bf360c" },
    { id: "vt12", name: "Giornata della carriera",   emoji: "💼", color: "#0277bd" },
    { id: "vt13", name: "Carta tagliata",            emoji: "✂️", color: "#880e4f" },
    { id: "vt14", name: "Video musicale anni '90",   emoji: "🎸", color: "#004d40" },
    { id: "vt15", name: "La luna",                   emoji: "🌙", color: "#263238" },
  ],

  raccoltaMedia: [
    { id: "m1",  color: "#1565c0" }, { id: "m2",  color: "#6a1b9a" },
    { id: "m3",  color: "#2e7d32" }, { id: "m4",  color: "#e65100" },
    { id: "m5",  color: "#880e4f" }, { id: "m6",  color: "#004d40" },
    { id: "m7",  color: "#1a237e" }, { id: "m8",  color: "#bf360c" },
    { id: "m9",  color: "#4a148c" }, { id: "m10", color: "#1b5e20" },
    { id: "m11", color: "#b71c1c" }, { id: "m12", color: "#01579b" },
  ],
};
