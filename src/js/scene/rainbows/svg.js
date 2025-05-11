let rainbowLines = document.querySelectorAll(".rainbow-line");
const textRainbow = document.querySelector("#text-rainbow0");

rainbowLines.forEach((line, i) => {
    // console.dir(line);
    // console.log(line.getTotalLength());

    line.style.strokeDasharray = line.getTotalLength();
    line.style.strokeDashoffset = line.getTotalLength();
    line.id = "rainbow-line" + i;
});


function setLines() {


    rainbowLines.forEach((line) => {

        line.style.strokeDashoffset = line.getTotalLength() - Math.max(line.getTotalLength() * progress, 10);
        //textRainbow.setAttribute('startOffset', line.getTotalLength() * progress * 2);
        textRainbow.setAttribute('textLength', line.getTotalLength() * progress * 2);
        //textRainbow.textContent = Math.round(progress * 100) + "%";
    });
}