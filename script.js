console.log(dizionario);
let modalita = "it-nap";

// demo dizionario base (puoi ampliarlo dopo)
let dizionario = {
     "ciao": "uè",
  "come stai": "come staje",
  "sto bene": "stong' bbuon",
  "tutto bene": "tutt'apposto",
  "che fai": "che staie facenno",
  "dove vai": "addò vaie",
  "non lo so": "nun 'o ssaccio",
  "grazie": "grazie",
  "prego": "prego",
  "scusa": "scusame",
  "buongiorno": "buongiorno",
  "buonasera": "buonasera",
  "quanto costa": "quanto costa",
  "ho fame": "tengo fame",
  "ho sete": "tengo sete",
  "sono stanco": "sto stanco",
  "vieni qui": "vieni ccà",
  "andiamo": "jamm",
  "non capisco": "nun capisco",
  "è bello": "è bbello",
  "è brutto": "è bbrutto",
  "che succede": "che succede",
  "tutto ok": "tutto bbuon",
  "va bene": "va bbuon"

  // 🟢 SALUTI
  "come va": "comm' va",
  "sto male": "non sto bbuon",
  "arrivederci": "ce verimm",
  "a dopo": "a ddoppo",
  "ci vediamo": "c'amma vedé",
  "ok": "va bbuon",
  "va bene": "apposto",

  // 🔵 EMOZIONI
  "sono felice": "sto cuntento",
  "sono triste": "sto triste",
  "sono arrabbiato": "sto arraggiato",
  "mi piace": "me piace",
  "non mi piace": "nun me piace",
  "che bello": "che bbello",
  "che brutto": "che bbrutto",

  // 🟡 AZIONI
  "aiutami": "ajùtame",
  "aspetta": "aspiett",
  "guarda": "guàrd",
  "ascolta": "ascuta",
  "scrivi": "scrive",
  "leggi": "legge",

  // 🔴 QUOTIDIANO
  "ragazzo": "uaglione",
  "ragazza": "uagliona",
  "madre": "mamma",
  "padre": "papà",
  "soldi": "sorde",
  "casa": "a casa",
  "scuola": "a scola",
  "lavoro": "o lavoro",
  "giorno": "o juorno",
  "tempo": "o tiempo",

  // ⚫ EXTRA
  "sempre": "sempre",
  "mai": "maje",
  "subito": "subbito",
  "forse": "forse",
  "oggi": "ogge",
  "domani": "dimane",
  "ieri": "ajere",
  "devo andare": "aggia jì",
  "sono qui": "stong ccà"
};

// =====================
// TRADUCI
// =====================
function traduci() {

    let input = document.getElementById("input").value.toLowerCase().trim();
    let output = document.getElementById("output");

    if (!input) {
        output.innerText = "";
        return;
    }

    let parole = input.split(" ");

    if (modalita === "it-nap") {

        output.innerText = parole.map(p => dizionario[p] || p).join(" ");

    } else {

        let reverse = {};
        for (let k in dizionario) {
            reverse[dizionario[k]] = k;
        }

        output.innerText = parole.map(p => reverse[p] || p).join(" ");
    }
}

// =====================
// SCAMBIA LINGUE
// =====================
function scambiaLingue() {

    modalita = (modalita === "it-nap") ? "nap-it" : "it-nap";

    document.getElementById("output").innerText =
        "Modalità: " + modalita;
}

// =====================
// RESET
// =====================
function reset() {

    document.getElementById("input").value = "";
    document.getElementById("output").innerText = "";
}

// =====================
// RIPPLE EFFECT
// =====================
function addRipple(event) {

    let button = event.currentTarget;

    let circle = document.createElement("span");

    let size = Math.max(button.offsetWidth, button.offsetHeight);

    let rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = size + "px";

    circle.style.left = (event.clientX - rect.left - size / 2) + "px";
    circle.style.top = (event.clientY - rect.top - size / 2) + "px";

    circle.classList.add("ripple");

    let old = button.querySelector(".ripple");
    if (old) old.remove();

    button.appendChild(circle);
}

// =====================
// DARK MODE
// =====================
function toggleDark() {
    document.body.classList.toggle("dark");
}
