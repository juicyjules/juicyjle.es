const julesText = document.getElementById('typewriter');
julesText.innerHTML = "";

const textTime = 1000;
const pause = 100;
const delay = 1500;

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

const parallaxElems = document.getElementsByClassName("parallax");

function parallax(elements) {
    for (let element of elements) {
        var scrolled = window.pageYOffset;

        var coords = (scrolled * 0.4) + 'px'
        element.style.transform = 'translateY(' + coords + ')';
    }
}
// Add typewriter effect to footer
setTimeout(() => typeLoop(), delay);
// Apply parallax to parallax Elements
// Ensure that underline animation only plays after load
const hoverElements = document.querySelectorAll(".underline-in-out");
hoverElements.forEach((element) => {
    console.log(element)
    if (!element.classList.contains("hovered")) {
        element.classList.add("hovered")
    }
});
// Do circle things :>
const circles = document.querySelectorAll(".overlay-circle");
scrollCircle = (elems) => {
        elems.forEach((elem) => {
            var scrolled = window.pageYOffset;

            var coords = (scrolled * 0.22)
            elem.style.transform = 'scale(' + coords + ')';
            console.log(elem.getBoundingClientRect().width)
        });
    }
    // set scroll event listener
window.onscroll = () => {
    parallax(parallaxElems)
    scrollCircle(circles);
}