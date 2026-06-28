function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

// 🔥 trova parola simile (AI base migliorata)
function similarita(a, b) {
  let max = Math.max(a.length, b.length);
  let same = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) same++;
  }

  return same / max;
}

function trovaSimile(parola) {
  let best = null;
  let scoreMax = 0;

  for (let key in dizionario) {
    let score = similarita(parola, key);
    if (score > scoreMax) {
      scoreMax = score;
      best = key;
    }
  }

  if (scoreMax >= 0.6) return dizionario[best];
  return null;
}

function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let testo = normalizzaTesto(input.value);

  if (!dizionario) {
    output.innerText = "Dizionario non caricato";
    return;
  }

  // 1️⃣ frase completa
  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  // 2️⃣ AI parola per parola
  let parole = testo.split(" ");

  let risultato = parole.map(p => {
    return dizionario[p] || trovaSimile(p) || p;
  });

  output.innerText = risultato.join(" ");
}
