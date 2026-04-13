function generateHTML(data) {
  const lines = data.split("\n");
  let html = "";
  let currentLeague = "";
  let matchIndex = 0;

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Jika bukan baris match = anggap nama liga
    if (!line.match(/\d{2}\/\d{2}/)) {
      // tutup block sebelumnya
      if (currentLeague !== "") {
        html += `
</div>
</div>
<!-- END BLOCK -->\n`;
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
      return;
    }

    // ===== PARSE MATCH =====
    const regex = /(\d{2}\/\d{2}) (\d{2}:\d{2}) WIB (.+) VS (.+) (\d+) : (\d+)/;
    const match = line.match(regex);

    if (!match) return;

    let [, date, time, team1, team2, score1, score2] = match;

    // hapus ranking [xx]
    team1 = team1.replace(/\[\d+\]\s*/g, "");
    team2 = team2.replace(/\[\d+\]\s*/g, "");

    // class ganjil/genap
    const cardClass = matchIndex % 2 === 0 ? "even" : "odd";
    matchIndex++;

    html += `
<div class="match-card ${cardClass}">
<div class="team-side left">
<img class="team-logo" src="https://via.placeholder.com/30">
<span class="team-name">${team1}</span>
</div>

<div class="score-center">
<div class="score-num">${score1} : ${score2}</div>
<div class="match-dt">${date}<br>${time} WIB</div>
</div>

<div class="team-side right">
<img class="team-logo" src="https://via.placeholder.com/30">
<span class="team-name">${team2}</span>
</div>
</div>
`;
  });

  // tutup terakhir
  html += `
</div>
</div>
<!-- END BLOCK -->`;

  return html;
}
