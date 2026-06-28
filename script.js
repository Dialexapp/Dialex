// 🌍 Dialex - SCRIPT FINALE

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

  // Traduzione diretta
  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
    return;
  }

  // Traduzione parola per parola
  let parole = testo.split(" ");
  let tradotte = parole.map(parola => {
    return dizionario[parola] || parola;
  });

  output.innerText = tradotte.join(" ");
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

function addRipple(e) {
  const btn = e.currentTarget;

  const ripple = document.createElement("span");
  ripple.className = "ripple";

  const rect = btn.getBoundingClientRect();

  ripple.style.left = (e.clientX - rect.left) + "px";
  ripple.style.top = (e.clientY - rect.top) + "px";

  btn.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}
