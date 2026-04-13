function convertData() {
  const data = document.getElementById("inputData").value;
  const result = generateHTML(data);

  document.getElementById("outputHTML").value = result;
  document.getElementById("preview").innerHTML = result;
}

function generateHTML(data) {
  const lines = data.split("\n");

  let html = "";
  let currentLeague = "";
  let matchIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;

    // 🟦 DETEKSI LIGA (baris tanpa jam)
    if (!line.match(/\d{2}\/\d{2}/)) {

      // tutup block sebelumnya
      if (currentLeague !== "") {
        html += `
</div>
</div>
<!-- END BLOCK -->
`;
      }

      currentLeague = line;
      matchIndex = 0;

      html += `
<div class="league-block" data-league="${currentLeague}">
<div class="league-inner">

<div class="league-crown">
<div class="crown-name">🏆 ${currentLeague} 🏆</div>
</div>
`;

      continue;
    }

    // 🟩 PARSE MATCH
    const regex = /(\d{2}\/\d{2}) (\d{2}:\d{2}) WIB (.+) VS (.+) (\d+) : (\d+)/;
    const match = line.match(regex);

    if (!match) continue;

    let [, date, time, team1, team2, score1, score2] = match;

    // hapus ranking [21]
    team1 = team1.replace(/\[\d+\]\s*/g, "");
    team2 = team2.replace(/\[\d+\]\s*/g, "");

    const cardClass = matchIndex % 2 === 0 ? "even" : "odd";
    matchIndex++;

    // 🟨 logo default (biar tidak kosong)
    const logoLeft = "https://via.placeholder.com/30";
    const logoRight = "https://via.placeholder.com/30";

    html += `
<div class="match-card ${cardClass}">
<div class="team-side left">
<img class="team-logo" src="${logoLeft}">
<span class="team-name">${team1}</span>
</div>

<div class="score-center">
<div class="score-num">${score1} : ${score2}</div>
<div class="match-dt">${date}<br>${time} WIB</div>
</div>

<div class="team-side right">
<img class="team-logo" src="${logoRight}">
<span class="team-name">${team2}</span>
</div>
</div>
`;
  }

  // tutup terakhir
  if (currentLeague !== "") {
    html += `
</div>
</div>
<!-- END BLOCK -->
`;
  }

  return html;
}
