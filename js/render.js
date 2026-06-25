import { ic } from "./icons.js";
import { IMPORT_PROMPT } from "./state.js";

function esc(s) {
  return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

/* ============================================================
   Sidebar
   ============================================================ */

export function renderSidebar(state) {
  const sidebar = document.getElementById("sidebar");

  const navItems = [
    { label: "Nuova chat",      icon: "edit",       action: "new-chat" },
    { label: "Cerca nelle chat",icon: "search",     action: "noop" },
    { label: "Video",           icon: "video",      action: "go-view", view: "video" },
    { label: "Raccolta",        icon: "collection", action: "go-view", view: "raccolta" },
  ];

  const navHtml = navItems.map(n => `
    <button class="sidebar__nav-btn ${state.view === n.view ? "active" : ""}"
      data-action="${n.action}" ${n.view ? `data-view="${n.view}"` : ""}>
      ${ic[n.icon]}
      ${n.label}
    </button>`).join("");

  const notebooks = state.notebooks;
  const nbHtml = notebooks.map(nb => `
    <button class="sidebar__item ${state.activeNotebook === nb.id ? "active" : ""}"
      data-action="open-notebook" data-nb-id="${nb.id}">
      ${ic.notebook}
      <span class="sidebar__item-label">${esc(nb.name)}</span>
    </button>`).join("");

  const recentiHtml = state.chats.slice(0, 14).map(c => `
    <button class="sidebar__item" data-action="open-chat" data-chat-id="${c.id}">
      <span class="sidebar__item-label">${esc(c.title)}</span>
    </button>`).join("");

  sidebar.innerHTML = `
    <div class="sidebar__top">
      <button class="sidebar__logo-btn" data-action="new-chat">
        <span style="width:24px;height:24px;display:block;">${ic.geminiStar}</span>
        <span class="sidebar__logo-text">Gemini</span>
      </button>
      <button class="sidebar__collapse" data-action="noop" title="Comprimi">${ic.expand}</button>
    </div>

    <nav class="sidebar__nav">${navHtml}</nav>

    <div class="sidebar__sections">
      <div class="sidebar__section">
        <div class="sidebar__section-header" data-action="toggle-notebooks">
          <span class="sidebar__section-title">Notebook</span>
          ${ic.chevDown}
        </div>
        ${state.notebookExpanded ? `
        <button class="sidebar__add-btn" data-action="open-create-notebook">
          ${ic.plus} Nuovo notebook
        </button>
        ${nbHtml}` : ""}
      </div>

      <div class="sidebar__section">
        <div class="sidebar__recenti-title">Recenti</div>
        ${recentiHtml}
      </div>
    </div>

    <div class="sidebar__footer">
      <button class="sidebar__attivita-btn" data-action="noop-label" data-label="Attività non disponibile in questa demo">
        ${ic.clock} Attività
      </button>
      <div class="sidebar__user-row">
        <div class="sidebar__avatar">BA</div>
        <div class="sidebar__user-info">
          <div class="sidebar__user-name">BespokeAIDA</div>
          <div class="sidebar__user-plan">Plus</div>
        </div>
        <button class="sidebar__gear-btn" data-action="toggle-settings" title="Impostazioni">
          ${ic.gear}
        </button>
      </div>
    </div>
  `;
}

/* ============================================================
   Settings Menu
   ============================================================ */

export function renderSettingsMenu(state) {
  let el = document.getElementById("settings-menu");
  if (!el) {
    el = document.createElement("div");
    el.id = "settings-menu";
    el.className = "settings-menu";
    document.body.appendChild(el);
  }

  if (!state.settingsMenuOpen) { el.classList.add("hidden"); return; }
  el.classList.remove("hidden");

  const items = [
    { label: "Contesto personale",               icon: "memory",   action: "go-view", view: "contesto",    dot: true },
    { label: "Importa informazione salvata in Gemini", icon: "upload", action: "go-view", view: "importa" },
    { label: "Limiti di utilizzo",               icon: "info",     action: "go-view", view: "limiti" },
    { label: "App connesse",                      icon: "link",     action: "go-view", view: "app-connesse", dot: true },
    { label: "Azioni programmate",               icon: "clock",    action: "go-view", view: "azioni" },
    { label: "Gem",                              icon: "gem",      action: "go-view", view: "gem" },
    null,
    { label: "I tuoi link pubblici",             icon: "link",     action: "noop-label", data: "Non disponibile in questa demo" },
    { label: "Tema",                             icon: "gear",     action: "noop-label", data: "Non disponibile in questa demo", arrow: true },
    { label: "Gestisci abbonamento",             icon: "sparkle",  action: "noop-label", data: "Non disponibile in questa demo" },
    { label: "NotebookLM",                       icon: "notebook", action: "noop-label", data: "Non disponibile in questa demo" },
    { label: "Invia feedback",                   icon: "send",     action: "noop-label", data: "Non disponibile in questa demo" },
    { label: "Guida",                            icon: "info",     action: "noop-label", data: "Non disponibile in questa demo", arrow: true },
  ];

  el.innerHTML = items.map(item => {
    if (!item) return `<div class="settings-menu__sep"></div>`;
    const dataView = item.view ? `data-view="${item.view}"` : "";
    const dataLabel = item.data ? `data-label="${esc(item.data)}"` : "";
    return `
      <button class="settings-menu__item" data-action="${item.action}" ${dataView} ${dataLabel}>
        ${ic[item.icon] ?? ""}
        ${esc(item.label)}
        ${item.dot ? `<span class="dot"></span>` : ""}
        ${item.arrow ? `<span class="arrow">${ic.chevRight}</span>` : ""}
      </button>`;
  }).join("");
}

/* ============================================================
   Main
   ============================================================ */

export function renderMain(state) {
  const main = document.getElementById("main");
  switch (state.view) {
    case "chat":        main.innerHTML = renderChatView(state); break;
    case "contesto":    main.innerHTML = renderContestoView(state); break;
    case "importa":     main.innerHTML = renderImportaView(state); break;
    case "limiti":      main.innerHTML = renderLimitiView(state); break;
    case "app-connesse":main.innerHTML = renderAppConnesseView(state); break;
    case "azioni":      main.innerHTML = renderAzioniView(state); break;
    case "gem":         main.innerHTML = renderGemView(state); break;
    case "create-gem":  main.innerHTML = renderCreateGemView(state); break;
    case "notebook":    main.innerHTML = renderNotebookView(state); break;
    case "raccolta":    main.innerHTML = renderRaccoltaView(state); break;
    case "video":       main.innerHTML = renderVideoView(state); break;
    default:            main.innerHTML = renderChatView(state);
  }
}

/* ============================================================
   Chat View
   ============================================================ */

function renderChatView(state) {
  const composer = composerHtml(state);

  if (state.messages.length > 0) {
    const msgs = state.messages.map(m => `
      <div class="chat-msg ${m.role}">
        <div class="chat-msg__label">${m.role === "user" ? "Tu" : "Gemini"}</div>
        <div class="chat-msg__bubble">${esc(m.text)}</div>
      </div>`).join("");
    return `
      <div class="chat-view">
        <div class="chat-view__messages">${msgs}</div>
        <div class="composer-wrap">${composer}</div>
        <p class="chat-disclaimer">Gemini può fare errori. Questo è un simulatore didattico — nessun dato viene inviato a servizi reali.</p>
      </div>`;
  }

  return `
    <div class="chat-greeting">
      <h1 class="chat-greeting__title">Come posso aiutarti, BespokeAIDA?</h1>
      <div class="chat-greeting__composer-wrap">${composer}</div>
    </div>
    <p class="chat-disclaimer">Gemini può fare errori. Questo è un simulatore didattico AI Act.</p>`;
}

function composerHtml(state) {
  return `
    <div class="composer">
      <input class="composer__input" id="composer-input"
        placeholder="Chiedi a Gemini"
        value="${esc(state.composerText)}" />
      <div class="composer__actions">
        <button class="composer__model-btn" data-action="noop">
          Pro ${ic.chevDown}
        </button>
        <button class="composer__icon-btn" data-action="noop" title="Voce">${ic.mic}</button>
        <button class="composer__icon-btn" data-action="send-message" title="Invia">${ic.send}</button>
      </div>
    </div>`;
}

/* ============================================================
   Contesto personale
   ============================================================ */

function renderContestoView(state) {
  return `
    <div class="settings-view">
      <div class="page-header">
        <h1 class="page-title">Contesto personale</h1>
        <p class="page-subtitle">Ottieni un'esperienza personalizzata grazie all'informazione salvata delle tue chat precedenti. Inoltre, personalizza le risposte di Gemini fornendogli le istruzioni.</p>
      </div>
      <div class="view-body">

        <div class="settings-section">
          <div class="settings-section__title">Memoria</div>
          <div class="settings-section__body">
            <div class="toggle-wrap">
              <div>
                <div class="toggle-label">Memoria</div>
                <div class="toggle-desc">
                  Gemini impara dalle tue chat precedenti per conoscerti meglio. Disponibile a breve su i.ve.<br>
                  <a href="#" data-action="noop">Gestisci ed elimina</a> le tue chat precedenti in qualsiasi momento. <a href="#" data-action="noop">Scopri di più</a>
                </div>
              </div>
              <div class="toggle ${state.memoriaEnabled ? "on" : ""}" data-action="toggle-memoria"></div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">Le tue istruzioni per Gemini</div>
          <div class="settings-section__body">
            <div class="toggle-wrap">
              <div style="flex:1">
                <div class="toggle-label">Le tue istruzioni per Gemini</div>
                <div class="toggle-desc">
                  Personalizza la tua esperienza con Gemini fornendogli istruzioni. <a href="#" data-action="noop">Scopri di più</a><br>
                  <strong style="font-size:12px;color:var(--fg-muted)">Esempi:</strong>
                </div>
                <div style="font-size:var(--font-size-sm);color:var(--fg-muted);padding-left:var(--sp-4);margin-top:4px;line-height:1.8">
                  • Inizia le risposte con un riepilogo TL;DR<br>
                  • Utilizza elenchi puntati per i paragrafi lunghi
                </div>
                <button class="btn-secondary" style="margin-top:var(--sp-4);font-size:var(--font-size-sm)"
                  data-action="noop-label" data-label="Aggiunta istruzioni non disponibile in questa demo">
                  ${ic.plus} Aggiungi
                </button>
                <p style="font-size:var(--font-size-sm);color:var(--fg-subtle);margin-top:var(--sp-3)">
                  Non hai ancora chiesto a Gemini di salvare le tue informazioni
                </p>
              </div>
              <div class="toggle ${state.istruzioniEnabled ? "on" : ""}" data-action="toggle-istruzioni"></div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">I tuoi contenuti premium</div>
          <div class="settings-section__body">
            <p class="page-subtitle">Gemini dà la priorità ai tuoi abbonamenti a pagamento per generare risposte migliori per te. Puoi controllare quali fonti sono incluse per questa risposta.</p>
            <a href="#" data-action="noop" style="font-size:var(--font-size-sm);display:block;margin-top:var(--sp-3)">Gestisci gli abbonamenti collegati al tuo Account Google</a>
          </div>
        </div>

      </div>
    </div>`;
}

/* ============================================================
   Importa informazione
   ============================================================ */

function renderImportaView(state) {
  const promptSafe = esc(IMPORT_PROMPT);

  return `
    <div class="settings-view">
      <div class="page-header">
        <h1 class="page-title">Importa informazione salvata in Gemini</h1>
      </div>
      <div class="view-body">

        <div class="import-step">
          <div class="import-step__num">1 &nbsp; Copia questo prompt in una chat con l'altro fornitore di AI</div>
          <div class="import-prompt-box">${promptSafe}</div>
          <button class="btn-secondary" id="copy-prompt-btn" data-action="copy-import-prompt">
            ${ic.copy} Copia
          </button>
        </div>

        <div class="import-step">
          <div class="import-step__num">2 &nbsp; Incolla qui la risposta</div>
          <textarea class="import-paste-area" id="import-paste"
            placeholder="Incolla qui le tue informazioni...">${esc(state.importedInfo)}</textarea>
          <button class="btn-primary" data-action="noop-label"
            data-label="Salvataggio informazioni non disponibile in questa demo">
            ${ic.plus} Aggiungi informazione
          </button>
        </div>

        <div class="import-step">
          <div class="import-step__num" style="margin-bottom:var(--sp-3)">Importa chat</div>
          <p style="font-size:var(--font-size-sm);color:var(--fg-muted);line-height:1.7;margin-bottom:var(--sp-4)">
            Esporta i tuoi dati da un <a href="#" data-action="noop">fornitore di AI supportato</a> e carica il file .zip (fino a 5 GB) direttamente su Gemini. <a href="#" data-action="noop">Scopri di più</a>
          </p>
          <button class="btn-secondary" data-action="noop-label" data-label="Upload file non disponibile in questa demo">
            ${ic.upload} Aggiungi
          </button>
        </div>

      </div>
    </div>`;
}

/* ============================================================
   Limiti di utilizzo
   ============================================================ */

function renderLimitiView(_state) {
  return `
    <div class="settings-view">
      <div class="page-header">
        <h1 class="page-title">Limiti di utilizzo <span class="limit-badge">PLUS</span></h1>
        <p class="page-subtitle">I limiti del tuo piano determinano in che misura puoi utilizzare Gemini nel tempo. I modelli e le funzionalità avanzati possono richiedere un maggiore utilizzo. <a href="#" data-action="noop">Scopri di più</a></p>
        <p style="font-size:var(--font-size-sm);color:var(--fg-muted);margin-top:var(--sp-2)">Appena aggiornato</p>
      </div>
      <div class="view-body">

        <div class="limit-card">
          <div class="limit-card__label">
            Utilizzo attuale ${ic.info}
            <span class="limit-card__pct">0% in uso</span>
          </div>
          <div class="limit-bar"><div class="limit-bar__fill" style="width:0%"></div></div>
          <div class="limit-card__reset">Si resetta alle ore 10:53</div>
        </div>

        <div class="limit-card">
          <div class="limit-card__label">
            Limite settimanale
            <span class="limit-card__pct">0% in uso</span>
          </div>
          <div class="limit-bar"><div class="limit-bar__fill" style="width:0%"></div></div>
          <div class="limit-card__reset">Si resetta il giorno 29 giu alle ore 14:53</div>
        </div>

        <div class="upgrade-banner">
          <div>
            <div class="upgrade-banner__text">Ottieni un utilizzo 2 volte superiore con AI Pro</div>
            <div class="upgrade-banner__price">9,99 € al mese</div>
          </div>
          <button class="btn-primary" data-action="noop-label" data-label="Upgrade non disponibile in questa demo">
            Fai l'upgrade
          </button>
        </div>

      </div>
    </div>`;
}

/* ============================================================
   App connesse
   ============================================================ */

function renderAppConnesseView(state) {
  const filters = [
    { id: "google", label: "Da Google" },
    { id: "altro",  label: "Altro" },
  ];

  const filterHtml = filters.map(f => `
    <button class="app-conn-filter ${state.appFilter === f.id ? "active" : ""}"
      data-action="app-filter" data-filter="${f.id}">${f.label}</button>`).join("");

  const appsHtml = state.googleApps.map(app => {
    const isConnected = state.connectedApps.includes(app.id);
    const subAppsHtml = app.subApps ? `
      <div class="app-conn-subapps">
        ${app.subApps.map(s => `
          <div class="app-conn-subapp">
            <div class="app-conn-subapp__name">${esc(s.name)}</div>
            <div class="app-conn-subapp__handle">${esc(s.handle)}</div>
          </div>`).join("")}
      </div>` : "";

    return `
      <div class="app-conn-card">
        <div class="app-conn-card__header">
          <div class="app-conn-card__icon">${app.icon}</div>
          <div style="flex:1">
            <div class="app-conn-card__name">${esc(app.name)}</div>
          </div>
          <div class="toggle ${isConnected ? "on" : ""}" data-action="toggle-app" data-app-id="${app.id}"></div>
        </div>
        <p class="app-conn-card__desc">${esc(app.desc)}</p>
        ${isConnected ? subAppsHtml : `<button class="btn-secondary" data-action="toggle-app" data-app-id="${app.id}">Connetti</button>`}
      </div>`;
  }).join("");

  return `
    <div class="settings-view">
      <div class="page-header">
        <h1 class="page-title">App connesse</h1>
        <p class="page-subtitle">Connetti le tue app preferite per un aiuto più intelligente. <a href="#" data-action="noop">Scopri di più</a></p>
      </div>
      <div class="view-body">
        <div class="app-conn-filters">${filterHtml}</div>
        ${appsHtml}
      </div>
    </div>`;
}

/* ============================================================
   Azioni programmate
   ============================================================ */

function renderAzioniView(state) {
  const templatesHtml = state.scheduledTemplates.map(t => `
    <div class="azioni-template-card" data-action="noop-label"
      data-label="Azioni programmate non disponibili in questa demo">
      <div class="azioni-template-card__emoji">${t.emoji}</div>
      <div class="azioni-template-card__name">${esc(t.name)}</div>
      <div class="azioni-template-card__desc">${esc(t.desc)}</div>
      <div class="azioni-template-card__add">${ic.plus}</div>
    </div>`).join("");

  return `
    <div class="settings-view">
      <div class="page-header">
        <h1 class="page-title">Gestore azioni programmate</h1>
        <p class="page-subtitle">Lascia che Gemini lavori per te mentre svolgi le tue attività quotidiane. Ricevi notizie giornaliere, ispirazione creativa o strumenti per sviluppare le tue competenze, pronti e disponibili nella chat all'orario previsto.</p>
      </div>
      <div class="view-body">

        <div class="azioni-banner">
          <div class="azioni-banner__text">
            <div class="azioni-banner__title">Inizia la giornata con CC di Google Labs</div>
            <div class="azioni-banner__sub">Approfondimenti e assistenza quotidiani e personalizzati, direttamente nella tua posta in arrivo</div>
          </div>
          <button class="btn-secondary" data-action="noop-label" data-label="Non disponibile in questa demo">Scopri di più</button>
          <button class="azioni-banner__close" data-action="noop">${ic.close}</button>
        </div>

        <div class="azioni-section-title">
          Modali
          <button class="btn-secondary" data-action="noop-label" data-label="Non disponibile in questa demo" style="font-size:11px;padding:4px 10px">
            Mostra altro ${ic.chevDown}
          </button>
        </div>
        <div class="azioni-templates-grid">${templatesHtml}</div>

        <div class="azioni-section-title">
          Le mie azioni
          <button class="btn-primary" data-action="noop-label" data-label="Creazione azioni non disponibile in questa demo">
            ${ic.plus} Nuova azione
          </button>
        </div>
        <div class="azioni-empty">
          ${ic.clock}
          Non hai ancora programmato nulla
        </div>

      </div>
    </div>`;
}

/* ============================================================
   Gem View
   ============================================================ */

function renderGemView(state) {
  const predHtml = state.predefinedGems.map(g => `
    <div class="gem-card" data-action="noop-label" data-label="${esc(g.name)} — apertura non disponibile in questa demo">
      <div class="gem-card__header">
        <div class="gem-card__icon" style="background:${g.color}">${g.name.charAt(0)}</div>
        <button class="gem-card__more" data-action="noop">${ic.moreV}</button>
      </div>
      ${g.tag ? `<span class="gem-tag">${esc(g.tag)}</span>` : ""}
      <div class="gem-card__name">${esc(g.name)}</div>
      <div class="gem-card__desc">${esc(g.desc)}</div>
    </div>`).join("");

  const myGemsHtml = state.myGems.length === 0
    ? `<div class="gem-onboarding">
        <div class="gem-onboarding__visual">✨</div>
        <div>
          <div class="gem-onboarding__title">Scopri, crea e gestisci i Gem</div>
          <div class="gem-onboarding__desc">
            I Gem sono versioni personalizzate di Gemini che ti danno risposta a misura. Puoi personalizzare un Gem predefinito oppure crearne uno nuovo dal nero utilizzando le istruzioni impostate da te. Qui troverai tutti tuoi Gem e potrai modificarli in qualsiasi momento oppure puoi iniziare subito una chat con un Gem predefinito.
          </div>
          <div class="gem-onboarding__actions">
            <button class="btn-secondary" data-action="noop-label" data-label="Non disponibile in questa demo">Chiudi</button>
            <button class="btn-secondary" data-action="noop-label" data-label="Non disponibile in questa demo">Scopri di più</button>
          </div>
        </div>
      </div>`
    : state.myGems.map(g => `
        <div class="gem-card">
          <div class="gem-card__icon" style="background:#1a73e8">${g.name.charAt(0)}</div>
          <div class="gem-card__name">${esc(g.name)}</div>
          <div class="gem-card__desc">${esc(g.desc)}</div>
        </div>`).join("");

  return `
    <div class="gem-view">
      <div class="page-header-row">
        <h1 class="page-title">Gestore dei Gem</h1>
        <button class="btn-primary" data-action="go-view" data-view="create-gem">
          ${ic.plus} Nuovo Gem
        </button>
      </div>

      <div class="tab-bar">
        <button class="tab-btn ${state.gemTab === "predefiniti" ? "active" : ""}"
          data-action="gem-tab" data-tab="predefiniti">Predefiniti di Google</button>
        <button class="tab-btn ${state.gemTab === "miei" ? "active" : ""}"
          data-action="gem-tab" data-tab="miei">I miei Gem</button>
      </div>

      <div class="view-body">
        ${state.gemTab === "predefiniti"
          ? `<div class="gem-predefined-grid">${predHtml}</div>`
          : `<div class="gem-my-section-header">
              <span style="font-size:var(--font-size-md);color:var(--fg-muted)">I miei Gem ${ic.info}</span>
              <button class="btn-primary" data-action="go-view" data-view="create-gem">
                ${ic.plus} Nuovo Gem
              </button>
             </div>
             ${myGemsHtml}`}
      </div>
    </div>`;
}

/* ============================================================
   Create Gem View
   ============================================================ */

function renderCreateGemView(state) {
  const d = state.gemDraft;
  return `
    <div class="create-gem-view">
      <div class="create-gem-header">
        <button class="create-gem-header__back" data-action="go-view" data-view="gem">
          ${ic.back} Nuovo Gem
        </button>
        <span class="create-gem-header__title"></span>
        <button class="btn-primary" data-action="save-gem">Salva</button>
      </div>

      <div class="create-gem-body">
        <div class="create-gem-form">
          <div class="form-field">
            <label class="form-label">Nome</label>
            <input class="form-input" type="text" placeholder="Dai un nome al tuo Gem"
              value="${esc(d.name)}" data-field="name" data-draft="gem" />
          </div>
          <div class="form-field">
            <label class="form-label">Descrizione</label>
            <input class="form-input" type="text" placeholder="Descrivi il tuo Gem e spiega cosa fa"
              value="${esc(d.desc)}" data-field="desc" data-draft="gem" />
          </div>
          <div class="form-field">
            <label class="form-label">Istruzioni ${ic.info}</label>
            <textarea class="form-input form-textarea" data-field="instructions" data-draft="gem"
              placeholder="Esempio: sei un esperto di orticoltura, in particolare di prati naturali e autoctoni, e aiuti gli altri a progettare giardini che richiedono poca acqua...">${esc(d.instructions)}</textarea>
          </div>
          <div class="form-field">
            <label class="form-label">Strumento predefinito ${ic.info}</label>
            <select class="form-input form-select" disabled>
              <option>Nessuno strumento predefinito</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Conoscenze ${ic.info}</label>
            <p class="form-note" style="margin-bottom:var(--sp-2)">Le conversazioni di Gem possono usare le informazioni dei file caricati.</p>
            <input class="form-input" type="text"
              placeholder="Aggiungi file a cui il tuo Gem può fare riferimento"
              readonly onfocus="this.blur()"
              data-action="noop-label" data-label="Upload file non disponibile in questa demo" />
          </div>
          <label class="form-checkbox">
            <input type="checkbox" /> Disattiva citazione di conoscenza
          </label>
          <p class="create-gem-disclaimer">
            ©Gemini può fare errori, quindi verifica le risposte. I tuoi Gem personalizzati saranno visibili anche in Gemini for Workspace (<a href="#" data-action="noop">scopri di più</a>). Crea Gem in modo responsabile.
          </p>
        </div>

        <div class="create-gem-preview">
          <div class="create-gem-preview__icon">${ic.geminiStar}</div>
          <p class="create-gem-preview__hint">Per visualizzare l'anteprima del Gem, inizia assegnandogli un nome</p>
        </div>
      </div>
    </div>`;
}

/* ============================================================
   Notebook View
   ============================================================ */

function renderNotebookView(state) {
  const nb = state.notebooks.find(n => n.id === state.activeNotebook);
  if (!nb) return `<div style="padding:var(--sp-8);color:var(--fg-muted)">Notebook non trovato.</div>`;

  const tabHtml = ["chat", "fonti"].map(t => `
    <button class="tab-btn ${state.notebookTab === t ? "active" : ""}"
      data-action="notebook-tab" data-tab="${t}">
      ${t === "chat" ? "Chat" : "Fonti"}
    </button>`).join("");

  let bodyHtml = "";
  if (state.notebookTab === "chat") {
    bodyHtml = `
      <div class="notebook-chat-empty">
        ${ic.notebook}
        <span>Le chat del notebook verranno visualizzate qui</span>
      </div>`;
  } else {
    bodyHtml = `
      <div class="notebook-chat-empty">
        ${ic.upload}
        <span>Carica file, connetti Drive o altre fonti per arricchire il contesto del notebook.</span>
      </div>`;
  }

  return `
    <div class="notebook-view">
      <div class="notebook-header">
        <div class="notebook-header__left">
          <div class="notebook-icon">📘</div>
          <span class="notebook-title">${esc(nb.name)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--sp-2)">
          <button class="notebook-add-fonti" data-action="noop-label" data-label="Aggiunta fonti non disponibile in questa demo">
            ${ic.plus} Aggiungi fonti
          </button>
          <button class="icon-btn" data-action="noop">${ic.link}</button>
          <button class="icon-btn" data-action="noop">${ic.more}</button>
        </div>
      </div>

      <div class="notebook-composer">
        ${composerHtml(state)}
      </div>

      <div class="tab-bar" style="padding:0 var(--sp-8)">${tabHtml}</div>

      <div class="view-body">
        <p style="font-size:var(--font-size-sm);color:var(--fg-muted);font-weight:500;margin-bottom:var(--sp-4)">Chat passate</p>
        ${bodyHtml}
      </div>
    </div>`;
}

/* ============================================================
   Raccolta View
   ============================================================ */

function renderRaccoltaView(state) {
  const gridHtml = state.raccoltaMedia.map(m => `
    <div class="raccolta-cell" style="background:${m.color}" data-action="noop"></div>`).join("");

  return `
    <div class="raccolta-view">
      <div class="page-header">
        <h1 class="page-title">Raccolta</h1>
      </div>
      <div class="view-body">
        <div class="raccolta-section-label">Documenti</div>
        <div class="raccolta-docs-empty">
          ${ic.file} I documenti che crei verranno visualizzati qui
        </div>
        <div class="raccolta-section-label" style="margin-top:var(--sp-6)">Media</div>
        <div class="raccolta-grid">${gridHtml}</div>
      </div>
    </div>`;
}

/* ============================================================
   Video View
   ============================================================ */

function renderVideoView(state) {
  const templatesHtml = state.videoTemplates.map(t => `
    <div class="video-template-card" style="background:${t.color}"
      data-action="noop-label" data-label="${esc(t.name)} — generazione video non disponibile in questa demo">
      <div class="video-template-card__emoji">${t.emoji}</div>
      <div class="video-template-card__name">${esc(t.name)}</div>
    </div>`).join("");

  return `
    <div class="video-view">
      <div class="page-header">
        <h1 class="page-title">${ic.video} Crea video</h1>
        <p class="page-subtitle">Prova un modello o descrivi un video nella chat. Crea con Omni.</p>
      </div>
      <div class="view-body">
        <div class="video-templates-grid">${templatesHtml}</div>
      </div>
      <div class="video-composer-wrap">
        <div class="video-composer">
          ${ic.plus}
          <input class="video-composer__input" type="text" placeholder="Descrivi il video" readonly
            onfocus="this.blur()"
            data-action="noop-label" data-label="Generazione video non disponibile in questa demo" />
          <div class="video-composer__controls">
            <div class="video-mode-btn">${ic.video} Video ${ic.chevDown}</div>
            <div class="video-mode-btn">Orizzontale (16:9) ${ic.chevDown}</div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ============================================================
   Modal
   ============================================================ */

export function renderModal(state) {
  const overlay = document.getElementById("overlay");
  const wrapper = document.getElementById("modal-wrapper");

  if (!state.modal) { overlay.classList.add("hidden"); return; }
  overlay.classList.remove("hidden");

  if (state.modal === "create-notebook") {
    const d = state.notebookDraft;
    wrapper.innerHTML = `
      <div class="modal">
        <div class="modal__header">
          <span class="modal__title">Nuovo notebook</span>
          <button class="modal__close" data-action="close-modal">${ic.close}</button>
        </div>
        <div class="modal__body">
          <div class="form-field">
            <label class="form-label">Nome del notebook</label>
            <input class="form-input" id="nb-name" type="text"
              placeholder="es. Progetto AI Act"
              value="${esc(d.name)}"
              data-field="name" data-draft="notebook" />
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn-secondary" data-action="close-modal">Annulla</button>
          <button class="btn-primary" data-action="save-notebook">Crea</button>
        </div>
      </div>`;
  }
}

/* ============================================================
   Full render
   ============================================================ */

export function renderAll(state) {
  renderSidebar(state);
  renderMain(state);
  renderModal(state);
  renderSettingsMenu(state);

  const input = document.getElementById("composer-input");
  if (input) {
    input.addEventListener("input", e => {
      window.__gemDispatch__?.({ type: "composer-input", value: e.target.value });
    });
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        window.__gemDispatch__?.({ type: "send-message" });
      }
    });
  }

  document.querySelectorAll("[data-draft]").forEach(el => {
    el.addEventListener("input", () => {
      window.__gemDispatch__?.({
        type: "draft-input",
        draft: el.dataset.draft,
        field: el.dataset.field,
        value: el.value,
      });
    });
  });
}
