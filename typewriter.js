const textTime = 1000;
const pause = 100;
const delay = 1500;

function attachTypeWrite(julesText,pause=100,textTime=1000) {
    julesText.innerHTML = "";
    document.title = window.location.hostname;

    const jules = [
        "jules",
        "JuicyJules",
        "Tsuls",
        "Jewlz",
        "JuiciestJules",
        "Julsy",
        "Juls",
        "Tsulz",
        "Dschuls",
        "Dschoolz",
        "Dschulz",
        "Julian",
        "Jules",
        "Ligma",
        "Leander"
    ]



    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function typewrite(word) {
        let i = 0;
        let wordLength = word.length;
        let interval = setInterval(() => {
            julesText.innerHTML += word[i];
            i++;
            if (i === wordLength) {
                clearInterval(interval);
            }
        }, pause);
    }

    function undoTypewrite() {
        let word = julesText.innerHTML;
        let i = word.length;
        let interval = setInterval(() => {
            if (i === 0) {
                clearInterval(interval);
            }
            julesText.innerHTML = word.slice(0, i);
            i--;
        }, pause);
    }

    function doWrite(word) {
        typewrite(word);
        let prom = new Promise(r => setTimeout(() => {
            undoTypewrite();
        }, word.length * pause + textTime));
        return prom;
    }

    async function typeLoop() {
        let random = Math.floor(Math.random() * jules.length);
        let word = jules[random];
        let ret = doWrite(word);
        await sleep(textTime * 1.7 + 2 * word.length * pause);
        typeLoop();
    }
    return typeLoop;
}
let typewriterElements = document.getElementsByClassName("typewriter")
// Add typewriter effect to footer
for (let element of typewriterElements){
    let typeLoop = attachTypeWrite(element);
    setTimeout(() => typeLoop(), delay * (0.5 + Math.random()));
}