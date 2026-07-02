let italianoToNapoletano = true;

function normalizzaTesto(testo){
return testo.toLowerCase().trim();
}

function traduci(){

const input = document.getElementById("input");
const output = document.getElementById("output");

if(!window.dizionario){
output.innerText="Dizionario non caricato";
return;
}

const diz = italianoToNapoletano ? dizionario : inverti(dizionario);

const testo = normalizzaTesto(input.value);
const parole = testo.split(" ");

output.innerText = parole.map(p => diz[p] || p).join(" ");

}

function reset(){
document.getElementById("input").value="";
document.getElementById("output").innerText="";
}

function scambiaLingue(){

italianoToNapoletano = !italianoToNapoletano;

const input = document.getElementById("input");

input.placeholder = italianoToNapoletano
? "Scrivi in italiano..."
: "Scrivi in napoletano...";

}

function inverti(d){
const inv={};
for(const k in d){
inv[d[k]]=k;
}
return inv;
}
