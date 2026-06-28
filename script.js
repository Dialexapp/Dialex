
function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

function trovaSimile(parola) {
  if (!dizionario) return null;

  let miglioreMatch = null;
  let migliorScore = 0;

  for (let key in dizionario) {
    let score = similarita(parola, key);

    if (score > migliorScore) {
      migliorScore = score;
      miglioreMatch = key;
    }
  }

  // soglia minima per evitare errori
  if (migliorScore >= 0.6) {
    return dizionario[miglioreMatch];
  }

  return null;
}

// 🔥 algoritmo di somiglianza (AI base)
function similarita(a, b) {
  let maxLen = Math.max(a.length, b.length);
  let same = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) same++;
  }

  return same / maxLen;
}

function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  if (!input || !output) return;

  if (!dizionario) {
    output.innerText = "Dizionario non caricato";
    return;
  }

  let testo = normalizzaTesto(input.value);

  // 1️⃣ match perfetto
  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  // 2️⃣ match AI (simile)
  let parole = testo.split(" ");

  let risultato = parole.map(p => {
    return dizionario[p] || trovaSimile(p) || p;
  });

  output.innerText = risultato.join(" ");
}
