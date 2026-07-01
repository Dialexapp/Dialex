
function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

// 🧠 similarità base
function similarita(a, b) {
  let max = Math.max(a.length, b.length);
  let same = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) same++;
  }

  return same / max;
}

// 🔍 trova parola simile
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

// 🚀 V3 AI: traduzione frase intelligente
function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  if (!input || !output) return;

  if (typeof dizionario === "undefined") {
    output.innerText = "Dizionario non caricato";
    return;
  }

  let testo = normalizzaTesto(input.value);

  // 1️⃣ match perfetto frase intera
  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  let parole = testo.split(" ");

  let risultato = [];

  for (let i = 0; i < parole.length; i++) {

    let parola = parole[i];

    // 2️⃣ prova dizionario diretto
    if (dizionario[parola]) {
      risultato.push(dizionario[parola]);
      continue;
    }

    // 3️⃣ prova AI simile
    let simile = trovaSimile(parola);
    if (simile) {
      risultato.push(simile);
      continue;
    }

    // 4️⃣ fallback
    risultato.push(parola);
  }

  output.innerText = risultato.join(" ");
}

// 🧹 reset
function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

// 🔁 scambio
function scambiaLingue() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let temp = input.value;
  input.value = output.innerText;
  output.innerText = temp;
}

// 🌙 dark mode
function toggleDark() {
  document.body.classList.toggle("dark");
}

// 🧠 auto-learning (stabile)
function impara() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output").innerText;

  if (!input || !output) return;

  let key = normalizzaTesto(input);

  dizionario[key] = output;

  localStorage.setItem("dizionario", JSON.stringify(dizionario));

  alert("Dialex ha imparato 😎");

  if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
  }
  
  let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // qui puoi mostrare un tuo bottone install
  console.log("App installabile pronta");
});

  const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("App installata");
  }

  deferredPrompt = null;
});

let deferredPrompt;

const popup = document.getElementById("installPopup");
const installBtn = document.getElementById("installBtn");
const closeBtn = document.getElementById("closePopup");

// quando app è installabile
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  popup.classList.remove("hidden");
});

// click installa
installBtn.addEventListener("click", async () => {
  popup.classList.add("hidden");

  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;

  deferredPrompt = null;
});

// chiudi popup
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
  
}
