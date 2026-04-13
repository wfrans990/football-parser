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

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    if (!line.match(/\d{2}\/\d{2}/)) {
      if (currentLeague !== "") {
        html += `</div></div>`;
      }

      currentLeague = line;
      matchIndex = 0;

      html += `
<div class="league-block">
<h3>${currentLeague}</h3>
`;
      return;
    }

    const regex = /(\d{2}\/\d{2}) (\d{2}:\d{2}) WIB (.+) VS (.+) (\d+) : (\d+)/;
    const match = line.match(regex);

    if (!match) return;

    let [, date, time, team1, team2, score1, score2] = match;

    team1 = team1.replace(/\[\d+\]\s*/g, "");
    team2 = team2.replace(/\[\d+\]\s*/g, "");

    const cardClass = matchIndex % 2 === 0 ? "even" : "odd";
    matchIndex++;

    html += `
<div class="match-card ${cardClass}">
<span>${team1}</span>
<strong>${score1} : ${score2}</strong>
<span>${team2}</span>
</div>
`;
  });

  html += `</div>`;
  return html;
}