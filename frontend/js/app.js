const API_URL = "https://session-production-fd45.up.railway.app";

async function loadCases() {
  const container = document.getElementById("caseList");

  try {
    const res = await fetch(`${API_URL}/api/cases`);

    if (!res.ok) {
      throw new Error("API error");
    }

    const cases = await res.json();

    container.innerHTML = "";

    cases.forEach(c => {
      const card = document.createElement("div");
      card.className = "case-card";

      card.innerHTML = `
        <h3>${c.meta.title}</h3>
        <p><strong>Industry:</strong> ${c.meta.industry}</p>
        <p><strong>Region:</strong> ${c.meta.region}</p>
        <p><strong>Core Tension:</strong> ${c.meta.coreTension}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="error">❌ Failed to load cases</p>`;
  }
}

loadCases();
