const caseList = document.getElementById("caseList");

const API_BASE = "http://localhost:3001";

async function loadCases() {
  try {
    const res = await fetch(`${API_BASE}/api/cases`);

    if (!res.ok) {
      throw new Error("Fetch failed");
    }

    const data = await res.json();

    if (!data.length) {
      caseList.innerHTML = "<p>No cases available.</p>";
      return;
    }

    caseList.innerHTML = data
      .map(
        (c) => `
        <div class="case-card">
          <h3>${c.meta.title}</h3>
          <p><strong>Industry:</strong> ${c.meta.industry}</p>
          <p><strong>Region:</strong> ${c.meta.region}</p>
          <p><strong>Core Tension:</strong> ${c.meta.coreTension}</p>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
    caseList.innerHTML = "❌ Failed to load cases";
  }
}

loadCases();
