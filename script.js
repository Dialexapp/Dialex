function traduci() {
  let testo = document.getElementById("input").value.toLowerCase().trim();

  if (dizionario[testo]) {
    document.getElementById("output").innerText = dizionario[testo];
  } else {
    document.getElementById("output").innerText = "Non trovato";
  }
}

function reset() {
  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
}

function scambiaLingue() {
  alert("Funzione swap da implementare");
}

function addRipple() {}

function toggleDark() {
  document.body.classList.toggle("dark");
}
