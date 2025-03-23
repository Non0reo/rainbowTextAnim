let rainbowLines = document.querySelectorAll(".rainbow-line");

rainbowLines.forEach((line) => {
    console.dir(line);
    console.log(line.getTotalLength());

    line.style.strokeDasharray = line.getTotalLength();
    line.style.strokeDashoffset = line.getTotalLength();
});


function setLines() {

    const mappedProgress = progress * 100;

    rainbowLines.forEach((line) => {
        line.style.strokeDashoffset = line.getTotalLength() - (line.getTotalLength() * progress);
    });
}