
let italianoToNapoletano = true;

// ======================
// CHECK BASE
// ======================

window.addEventListener("load", () => {

  console.log("Dialex JS avviato 😎");

  if (typeof dizionario === "undefined") {
    alert("ERRORE: dizionario.js non caricato");
  }

});


// ======================
// NORMALIZZA
// ======================

function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim();
}


// ======================
// TRADUCI (SAFE)
// ======================

function traduci() {

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  if (!input || !output) return;

  if (typeof dizionario === "undefined") {
    output.innerText = "Errore: dizionario non caricato";
    return;
  }

  const dizInverso = inverti(dizionario);

  const diz = italianoToNapoletano
    ? dizionario
    : dizInverso;

  const testo = normalizzaTesto(input.value);

  const parole = testo.split(" ");
  const risultato = [];

  for (const p of parole) {
    risultato.push(diz[p] || p);
  }

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

  input.value = output.innerText;
  output.innerText = "";

  input.placeholder = italianoToNapoletano
    ? "Scrivi in italiano..."
    : "Scrivi in napoletano...";
}


// ======================
// INVERTE DIZIONARIO
// ======================

function inverti(diz) {

  const inv = {};

  for (const k in diz) {
    inv[diz[k]] = k;
  }

  return inv;
}
