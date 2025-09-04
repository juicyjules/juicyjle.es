console.log("animations.js loaded");
import { animate, stagger, scroll, inView } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

const randomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const interpolateRandomString = (element,targetText) => {
    let length = targetText.length;
    console.log("interpolateRandomString for:", element, "with length", length);
    return (latest) => {
        element.innerText = element.innerText.split("")
        .map((letter, index) => {
            if (latest && index/length * 100 <= latest) {
                return targetText[index];
            }
            return randomString(1);
        })
        .join("");
    }
}
const attachAnimations = () => {
    const rTexts = document.getElementsByClassName("random-text");
    for (let element of rTexts) {
        element.setAttribute("data-text", element.innerText);
    }   
    inView(rTexts, (element,i) => {
        const text = element.getAttribute("data-text");
        const a = () => {
            animate(0,100, { 
                duration: 2,
                ease: "easeInOut",
                onUpdate: interpolateRandomString(element,text),
            });
        }
        a();
        return () => { a(); }
    });
}
scroll(animate(".progress", { scaleX: [0, 1] }, { ease: "easeOut" }))
attachAnimations();