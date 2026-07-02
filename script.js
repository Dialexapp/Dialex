let deferredPrompt;

// ==========================
// INSTALL POPUP
// ==========================

const popup = document.getElementById("installPopup");
const installBtn = document.getElementById("installBtnPopup");
const closeBtn = document.getElementById("closePopup");

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


// ==========================
// DIALEX LOGIC
// ==========================

let italianoToNapoletano = true;

const dizionarioInverso = {};

for (const chiave in dizionario) {
  dizionarioInverso[dizionario[chiave]] = chiave;
}

function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

function similarita(a, b) {
  let uguali = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) uguali++;
  }

  return uguali / Math.max(a.length, b.length);
}

function trovaSimile(parola, diz) {
  let migliore = null;
  let punteggio = 0;

  for (const chiave in diz) {
    const s = similarita(parola, chiave);

    if (s > punteggio) {
      punteggio = s;
      migliore = chiave;
    }
  }

  if (punteggio >= 0.70) return diz[migliore];
  return null;
}

function traduci() {

  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let testo = normalizzaTesto(input.value);

  const diz = italianoToNapoletano
    ? dizionario
    : dizionarioInverso;

  if (diz[testo]) {
    output.innerText = diz[testo];
    return;
  }

  const parole = testo.split(" ");
  const risultato = [];

  for (const parola of parole) {

    if (diz[parola]) {
      risultato.push(diz[parola]);
    } else {
      const simile = trovaSimile(parola, diz);
      if (simile) {
        risultato.push(simile);
      } else {
        risultato.push(parola);
      }
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

  input.value = output.innerText;
  output.innerText = "";

  if (italianoToNapoletano) {
    input.placeholder = "Scrivi in italiano...";
  } else {
    input.placeholder = "Scrivi in napoletano...";
  }
}
