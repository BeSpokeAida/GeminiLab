import { initialState } from "./state.js";
import { renderAll } from "./render.js";

/* ============================================================
   State & Render
   ============================================================ */

let state = structuredClone(initialState);

function render() { renderAll(state); }

/* ============================================================
   Toast
   ============================================================ */

let toastTimer = null;
function showToast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast-noop";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

/* ============================================================
   Dispatch
   ============================================================ */

function dispatch(action) {
  switch (action.type) {

    case "new-chat":
      state.view = "chat";
      state.activeNotebook = null;
      state.messages = [];
      state.composerText = "";
      state.settingsMenuOpen = false;
      break;

    case "go-view":
      state.view = action.view;
      state.activeNotebook = null;
      state.settingsMenuOpen = false;
      break;

    case "composer-input":
      state.composerText = action.value;
      return; // skip full re-render

    case "send-message":
      if (!state.composerText.trim()) return;
      state.messages.push({ role: "user", text: state.composerText });
      state.messages.push({
        role: "assistant",
        text: "Questo è un simulatore didattico — non connesso a servizi reali. La risposta reale di Gemini sarebbe visibile qui.",
      });
      state.composerText = "";
      break;

    case "toggle-settings":
      state.settingsMenuOpen = !state.settingsMenuOpen;
      break;

    case "close-settings":
      state.settingsMenuOpen = false;
      break;

    case "toggle-notebooks":
      state.notebookExpanded = !state.notebookExpanded;
      break;

    case "open-create-notebook":
      state.modal = "create-notebook";
      state.notebookDraft = { name: "" };
      state.settingsMenuOpen = false;
      break;

    case "open-notebook":
      state.activeNotebook = action.nbId;
      state.view = "notebook";
      state.notebookTab = "chat";
      state.settingsMenuOpen = false;
      break;

    case "open-chat":
      state.view = "chat";
      state.activeNotebook = null;
      state.settingsMenuOpen = false;
      break;

    case "notebook-tab":
      state.notebookTab = action.tab;
      break;

    case "save-notebook": {
      const name = state.notebookDraft.name.trim() || "Untitled notebook";
      const nb = { id: "nb" + Date.now(), name };
      state.notebooks.push(nb);
      state.modal = null;
      state.activeNotebook = nb.id;
      state.view = "notebook";
      state.notebookTab = "chat";
      break;
    }

    case "close-modal":
      state.modal = null;
      break;

    case "toggle-memoria":
      state.memoriaEnabled = !state.memoriaEnabled;
      break;

    case "toggle-istruzioni":
      state.istruzioniEnabled = !state.istruzioniEnabled;
      break;

    case "toggle-app": {
      const idx = state.connectedApps.indexOf(action.appId);
      if (idx >= 0) state.connectedApps.splice(idx, 1);
      else state.connectedApps.push(action.appId);
      break;
    }

    case "app-filter":
      state.appFilter = action.filter;
      break;

    case "gem-tab":
      state.gemTab = action.tab;
      break;

    case "save-gem": {
      const { name, desc, instructions } = state.gemDraft;
      if (!name.trim()) { showToast("Dai un nome al tuo Gem per salvarlo"); return; }
      state.myGems.push({ id: "gem" + Date.now(), name: name.trim(), desc, instructions });
      state.gemDraft = { name: "", desc: "", instructions: "" };
      state.view = "gem";
      state.gemTab = "miei";
      showToast("Gem creato con successo!");
      break;
    }

    case "draft-input":
      if (action.draft === "gem") {
        state.gemDraft[action.field] = action.value;
      } else if (action.draft === "notebook") {
        state.notebookDraft[action.field] = action.value;
      }
      return; // skip re-render

    case "copy-import-prompt":
      // handled in asyncDispatch — should not reach here
      return;

    case "noop":
      return;

    case "noop-label":
      showToast(action.label || "Funzionalità non disponibile in questa demo");
      return;

    default:
      return;
  }

  render();
}

/* ============================================================
   Async dispatch wrapper (for clipboard)
   ============================================================ */

async function asyncDispatch(action) {
  if (action.type === "copy-import-prompt") {
    const { IMPORT_PROMPT } = await import("./state.js");
    navigator.clipboard?.writeText(IMPORT_PROMPT)
      .then(() => showToast("Prompt copiato negli appunti!"))
      .catch(() => showToast("Copia non riuscita — usa Ctrl+A → Ctrl+C sul testo"));
    return;
  }
  dispatch(action);
}

/* ============================================================
   Event delegation
   ============================================================ */

document.addEventListener("click", e => {
  const btn = e.target.closest("[data-action]");
  if (!btn) {
    if (state.settingsMenuOpen) {
      state.settingsMenuOpen = false;
      render();
    }
    return;
  }

  const action = btn.dataset.action;

  if (action === "copy-import-prompt") {
    asyncDispatch({ type: action });
    return;
  }

  const payload = {
    type: action,
    view:    btn.dataset.view,
    tab:     btn.dataset.tab,
    nbId:    btn.dataset.nbId,
    chatId:  btn.dataset.chatId,
    appId:   btn.dataset.appId,
    filter:  btn.dataset.filter,
    label:   btn.dataset.label,
  };

  dispatch(payload);
});

/* ============================================================
   Keyboard
   ============================================================ */

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (state.modal) { dispatch({ type: "close-modal" }); return; }
    if (state.settingsMenuOpen) { dispatch({ type: "close-settings" }); return; }
  }
  if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "O") {
    e.preventDefault();
    dispatch({ type: "new-chat" });
  }
});

/* ============================================================
   Expose dispatch for render.js listeners
   ============================================================ */

window.__gemDispatch__ = dispatch;

/* ============================================================
   Boot
   ============================================================ */

render();
