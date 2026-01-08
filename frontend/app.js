const API_BASE = "https://session-production-4bcb.up.railway.app";

async function loadCases() {
  try {
    const res = await fetch(`${API_BASE}/api/cases`);
    const cases = await res.json();

    const container = document.getElementById("caseList");
    if (!container) {
      console.error("caseList container not found");
      return;
    }

    container.innerHTML = "";

    cases.forEach(item => {
      const div = document.createElement("div");
      div.style.marginBottom = "32px";

      div.innerHTML = `
        <h3>${item.meta.title}</h3>
        <p><strong>Industry:</strong> ${item.meta.industry}</p>
        <p><strong>Region:</strong> ${item.meta.region}</p>
        <p>${item.context.situationSummary}</p>
        <hr/>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Failed to fetch cases:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCases);

