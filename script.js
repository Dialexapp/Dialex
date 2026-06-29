function normalizzaTesto(testo) {
  return testo
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()"']/g, "")
    .replace(/\s+/g, " ");
}

function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  if (!input || !output) return;

  if (typeof dizionario === "undefined") {
    output.innerText = "Dizionario non caricato";
    return;
  }

  let testo = normalizzaTesto(input.value);

  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  let parole = testo.split(" ");

  let risultato = parole.map(p => dizionario[p] || p);

  output.innerText = risultato.join(" ");
}

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

function scambiaLingue() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let temp = input.value;
  input.value = output.innerText;
  output.innerText = temp;
}

function toggleDark() {
  document.body.classList.toggle("dark");
      }
