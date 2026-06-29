
function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

// 🧠 similarità base (anti-errori)
function similarita(a, b) {
  let max = Math.max(a.length, b.length);
  let same = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) same++;
  }

  return same / max;
}

// 🔍 trova parola simile nel dizionario
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

  if (scoreMax >= 0.65) return dizionario[best];
  return null;
}

// 🚀 TRADUZIONE PRINCIPALE (V2)
function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  if (!input || !output) return;

  if (typeof dizionario === "undefined") {
    output.innerText = "Dizionario non caricato";
    return;
  }

  let testo = normalizzaTesto(input.value);

  // 1️⃣ frase completa
  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  // 2️⃣ parola per parola + AI fallback
  let parole = testo.split(" ");

  let risultato = parole.map(p => {
    return dizionario[p] || trovaSimile(p) || p;
  });

  output.innerText = risultato.join(" ");
}

// 🧹 RESET
function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

// 🔁 SCAMBIO
function scambiaLingue() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let temp = input.value;
  input.value = output.innerText;
  output.innerText = temp;
}

// 🌙 DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}

// 🧠 AUTO-LEARNING STABILE
function impara() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output").innerText;

  if (!input || !output) return;

  let key = normalizzaTesto(input);

  dizionario[key] = output;

  localStorage.setItem("dizionario", JSON.stringify(dizionario));

  alert("Dialex ha imparato 😎");
      }
