let deferredPrompt;

// INSTALL POPUP
const popup = document.getElementById("installPopup");
const installBtn = document.getElementById("installBtnPopup");
const closeBtn = document.getElementById("closePopup");

// DETECT INSTALL
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  popup.classList.remove("hidden");
});

// CLICK INSTALL
installBtn.addEventListener("click", async () => {
  popup.classList.add("hidden");

  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  deferredPrompt = null;
});

// CLOSE POPUP
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});


// ==========================
// DIALER LOGIC
// ==========================

// true = Italiano → Napoletano
// false = Napoletano → Italiano
let italianoToNapoletano = true;

// Crea automaticamente il dizionario inverso
const dizionarioInverso = {};

for (const chiave in dizionario) {
  dizionarioInverso[dizionario[chiave]] = chiave;
}

function normalizzaTesto(testo) {
  return testo.toLowerCase().trim();
}

function traduci() {

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let testo = normalizzaTesto(input.value);

  const diz = italianoToNapoletano
    ? dizionario
    : dizionarioInverso;

  // Controlla prima se esiste tutta la frase
  if (diz[testo]) {
    output.innerText = diz[testo];
    return;
  }

  // Altrimenti traduce parola per parola
  const parole = testo.split(" ");
  const risultato = [];

  for (const parola of parole) {

    if (diz[parola]) {
      risultato.push(diz[parola]);
    } else {
      risultato.push(parola);
    }

  }

  output.innerText = risultato.join(" ");

}

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

function scambiaLingue() {

  italianoToNapoletano = !italianoToNapoletano;

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const temp = input.value;
  input.value = output.innerText;
  output.innerText = "";

  if (italianoToNapoletano) {
    input.placeholder = "Scrivi in
