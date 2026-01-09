const API_URL = "http://localhost:3001/api/cases";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("cases");
    container.innerHTML = "";

    data.forEach(c => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${c.meta.title}</h3>
        <p><b>Industry:</b> ${c.meta.industry}</p>
        <p><b>Region:</b> ${c.meta.region}</p>
        <p><b>Core Tension:</b> ${c.meta.coreTension}</p>
        <hr/>
      `;
      container.appendChild(div);
    });
  })
  .catch(() => {
    document.getElementById("cases").innerText = "Failed to load cases";
  });
