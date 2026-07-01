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


// ===== DIALER LOGIC =====

function normalizzaTesto(testo) {
  return testo.toLowerCase().trim();
}

function traduci() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  let testo = normalizzaTesto(input.value);

  if (dizionario[testo]) {
    output.innerText = dizionario[testo];
  } else {
    output.innerText = testo;
  }
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
