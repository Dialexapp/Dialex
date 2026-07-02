let deferredPrompt;
let italianoToNapoletano = true;

// ==========================
// INSTALL POPUP SAFE INIT
// ==========================

window.addEventListener("load", () => {

  const popup = document.getElementById("installPopup");
  const installBtn = document.getElementById("installBtnPopup");
  const closeBtn = document.getElementById("closePopup");

  if (!popup || !installBtn || !closeBtn) return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    popup.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    popup.classList.add("hidden");

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

});


// ==========================
// SAFE DIZIONARIO CHECK
// ==========================

function getDizionario() {
  if (typeof dizionario === "undefined") {
    console.error("❌ dizionario.js non caricato");
    return null;
  }
  return dizionario;
}

function normalizzaTesto(testo) {
  return testo.toLowerCase().trim();
}


// ==========================
// TRADUZIONE SICURA
// ==========================

function traduci() {

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const diz = getDizionario();
  if (!diz) {
    output.innerText = "Errore: dizionario non caricato";
    return;
  }

  let testo = normalizzaTesto(input.value);

  const dizAttivo = italianoToNapoletano ? diz : invertiDizionario(diz);

  const parole = testo.split(" ");
  const risultato = [];

  for (const parola of parole) {
    risultato.push(dizAttivo[parola] || parola);
  }

  output.innerText = risultato.join(" ");
}


// ==========================
// INVERSIONE SICURA
// ==========================

function invertiDizionario(diz) {
  const inv = {};
  for (const k in diz) {
    inv[diz[k]] = k;
  }
  return inv;
}


// ==========================
// RESET
// ==========================

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}


// ==========================
// SCAMBIO LINGUE
// ==========================

function scambiaLingue() {

  italianoToNapoletano = !italianoToNapoletano;

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  input.value = output.innerText;
  output.innerText = "";

  input.placeholder = italianoToNapoletano
    ? "Scrivi in italiano..."
    : "Scrivi in napoletano...";
}
