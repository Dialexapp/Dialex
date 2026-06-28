// 🌍 Dialex - SCRIPT FINALE
console.log("DIZIONARIO CARICATO");
function traduci() {
  let input = document.getElementById("input");
  let output = document.getElementById("output");

  if (!input || !output) return;

  let testo = input.value.toLowerCase().trim();

  // usa il dizionario globale
  if (typeof dizionario === "undefined") {
    output.innerText = "Dizionario non caricato";
    return;
  }

  let risultato = dizionario[testo];

  output.innerText = risultato ? risultato : "Non trovato";
}

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

function scambiaLingue() {
  let input = document.getElementById("input");
  let output = document.getElementById("output");

  let temp = input.value;
  input.value = output.innerText;
  output.innerText = temp;
}

// 🌙 Dark mode
function toggleDark() {
  document.body.classList.toggle("dark");
}

// 🌊 Ripple effect
function addRipple(e) {
  const btn = e.currentTarget;

  let ripple = document.createElement("span");
  ripple.classList.add("ripple");

  let rect = btn.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left) + "px";
  ripple.style.top = (e.clientY - rect.top) + "px";

  btn.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}
