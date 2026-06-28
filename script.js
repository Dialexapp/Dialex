function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

// 🔥 AI SIMILE
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

  if (!input || !output) return;

  if (!dizionario) {
    output.innerText = "Dizionario non caricato";
    return;
  }

  let testo = normalizzaTesto(input.value);

  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  let parole = testo.split(" ");

  let risultato = parole.map(p => {
    return dizionario[p] || trovaSimile(p) || p;
  });

  output.innerText = risultato.join(" ");
}

// 🧠 AUTO-LEARNING (SEPARATO E CORRETTO)
function impara() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output").innerText;

  if (!input || !output) return;

  let key = normalizzaTesto(input);

  dizionario[key] = output;

  localStorage.setItem("dizionario", JSON.stringify(dizionario));

  alert("Dialex ha imparato 😎");
}

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

function scambiaLingue() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const temp = input.value;
  input.value = output.innerText;
  output.innerText = temp;
}

function toggleDark() {
  document.body.classList.toggle("dark");
    }
