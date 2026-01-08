import state, { subscribe } from "./state.js";
import id from "../i18n/id.js";
import en from "../i18n/en.js";
import { getCaseId } from "./router.js";
import { fetchCases, fetchCaseById, saveSessionEntry } from "./api.js";

function t() {
  return state.language === "id" ? id : en;
}

export function renderCaseList(container) {
  const draw = async () => {
    container.innerHTML = `<p>Loading cases…</p>`;
    try {
      const cases = await fetchCases();
      container.innerHTML = `
        <section class="note">${t().caseLibraryNote}</section>
        ${cases.map(c => `
          <section>
            <h2>${c.meta.title}</h2>
            <p>${c.meta.industry} · ${c.meta.region} · ${c.meta.timeframe}</p>
            <p><strong>${c.meta.coreTension}</strong></p>
            <a href="case.html?id=${c.id}">Read Case</a>
          </section>
        `).join("")}
      `;
    } catch {
      container.innerHTML = `<p>Unable to load cases.</p>`;
    }
  };
  draw();
  subscribe(draw);
}

export function renderSingleCase(container) {
  const idParam = getCaseId();

  const draw = async () => {
    container.innerHTML = `<p>Loading case…</p>`;
    try {
      const c = await fetchCaseById(idParam);
      container.innerHTML = `
        <section>
          <h2>${c.meta.title}</h2>
          <p>${c.meta.industry} · ${c.meta.region} · ${c.meta.timeframe}</p>
        </section>

        <section>
          <h3>Case Context</h3>
          <p>${c.context.situationSummary}</p>
        </section>

        <section>
          <h3>${t().decisionSpace}</h3>
          <p><strong>${c.decision.decisionQuestion}</strong></p>
        </section>

        <section>
          <h3>${t().outcomeTitle}</h3>
          <p class="note">${t().outcomeNote}</p>
          ${c.outcome ? `<p>${c.outcome.whatHappened}</p>` : ""}
        </section>

        <section>
          <h3>${t().reflectionTitle}</h3>
          <p><strong>${c.reflection.transferableLesson}</strong></p>
        </section>

        <section>
          ${
            state.user.isAuthenticated
              ? `
                <textarea id="personalNotes" placeholder="Your notes"></textarea>
                <button id="saveReflection">Save my reflection</button>
              `
              : `<p><em>Sign in to save your reflection.</em></p>`
          }
        </section>
      `;

      const btn = document.getElementById("saveReflection");
      if (btn) {
        btn.onclick = async () => {
          const notes = document.getElementById("personalNotes").value;
          try {
            await saveSessionEntry(state.user.token, {
              caseId: c.id,
              personalNotes: notes,
              personalReflection: {}
            });
            alert("Saved.");
          } catch {
            alert("Failed to save.");
          }
        };
      }
    } catch {
      container.innerHTML = `<p>Case not found.</p>`;
    }
  };

  draw();
  subscribe(draw);
}
