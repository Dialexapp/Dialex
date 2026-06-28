console.log(dizionario);
let modalita = "it-nap";

// demo dizionario base (puoi ampliarlo dopo)
let dizionario = {
    "ciao": "uè",
    "come": "cumme",
    "stai": "staie",
    "bello": "bell",
    "ragazzo": "guaglione"
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
