function convertData() {
  const data = document.getElementById("inputData").value;
  const result = generateHTML(data);

  document.getElementById("outputHTML").value = result;
  document.getElementById("preview").innerHTML = result;
}

// COPY
function copyOutput() {
  const output = document.getElementById("outputHTML");
  output.select();
  document.execCommand("copy");
  alert("Berhasil di-copy!");
}

// CLEAR
function clearAll() {
  document.getElementById("inputData").value = "";
  document.getElementById("outputHTML").value = "";
  document.getElementById("preview").innerHTML = "";
}

// ESCAPE HTML
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// GENERATE HTML
function generateHTML(data) {
  const lines = data.split("\n");

  let html = "";
  let currentLeague = "";
  let matchIndex = 0;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // DETEKSI LIGA
    if (!/^\d{2}\/\d{2}/.test(line)) {

      if (currentLeague !== "") {
        html += `</div></div><!-- END BLOCK -->`;
      }

      currentLeague = line;
      matchIndex = 0;

      html += `
<div class="league-block">
<div class="league-inner">
<div class="crown-name">🏆 ${currentLeague} 🏆</div>
`;

      continue;
    }

    // PARSE MATCH
    const match = line.match(/(\d{2}\/\d{2})\s+(\d{2}:\d{2})\s+WIB\s+(.+?)\s+VS\s+(.+?)\s+(\d+)\s*:\s*(\d+)/);

    if (!match) continue;

    let [, date, time, team1, team2, s1, s2] = match;

    team1 = escapeHTML(team1.replace(/\[\d+\]|\[w\]/gi, "").trim());
    team2 = escapeHTML(team2.replace(/\[\d+\]|\[w\]/gi, "").trim());

    const cardClass = matchIndex % 2 === 0 ? "even" : "odd";
    matchIndex++;

    html += `
<div class="match-card ${cardClass}">
  <div class="team-side">
    <img class="team-logo" src="https://via.placeholder.com/30">
    <span>${team1}</span>
  </div>

  <div class="score-center">
    <div class="score-num">${s1} : ${s2}</div>
    <div class="match-dt">${date}<br>${time} WIB</div>
  </div>

  <div class="team-side">
    <img class="team-logo" src="https://via.placeholder.com/30">
    <span>${team2}</span>
  </div>
</div>
`;
  }

  if (currentLeague !== "") {
    html += `</div></div><!-- END BLOCK -->`;
  }

  return html;
}
