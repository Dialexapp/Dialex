let italianoToNapoletano = true;

let deferredPrompt;

// ======================
// INSTALL POPUP
// ======================

const popup = document.getElementById("installPopup");
const installBtn = document.getElementById("installBtnPopup");
const closeBtn = document.getElementById("closePopup");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (popup) popup.classList.remove("hidden");
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  popup.classList.add("hidden");

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;
});

closeBtn?.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// ======================
// CHECK BASE
// ======================

window.addEventListener("load", () => {
  console.log("Dialex avviato 😎");

  if (typeof dizionario === "undefined") {
    alert("Dizionario non caricato!");
  }
});

// ======================
// NORMALIZZA
// ======================

function normalizzaTesto(testo) {
  return testo.toLowerCase().trim();
}

// ======================
// TRADUCI
// ======================

function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const diz = italianoToNapoletano
    ? dizionario
    : inverti(dizionario);

  const testo = normalizzaTesto(input.value);
  const parole = testo.split(" ");

  const risultato = parole.map(p => diz[p] || p);

  output.innerText = risultato.join(" ");
}

// ======================
// RESET
// ======================

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

// ======================
// SCAMBIA
// ======================

function scambiaLingue() {
  italianoToNapoletano = !italianoToNapoletano;

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const temp = input.value;
  input.value = output.innerText;
  output.innerText = "";

  input.placeholder = italianoToNapoletano
    ? "Scrivi in italiano..."
    : "Scrivi in napoletano...";
}

// ======================
// INVERTI DIZIONARIO
// ======================

function inverti(diz) {
  const inv = {};

  for (const k in diz) {
    inv[diz[k]] = k;
  }

  return inv;
    }
