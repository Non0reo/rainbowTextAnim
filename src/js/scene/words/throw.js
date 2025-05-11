const imageObject = document.getElementById('ccss');
const image = imageObject.contentDocument.getElementById('human');

const imageObject = document.getElementById('ccss');
const image = imageObject.contentDocument.getElementById('human');

const container = document.getElementById('container');
const words = ["Woaw", "Man !", "Wow", "Whoa", "Woahohoho", "OMG", "Wooooooow", "Aaaaaaahaaahaaaa", "Woawwwwww", "Hoooooo", "Yeaaaaaah", "Look at that"];

image.addEventListener('click', () => {
    console.log("click");

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const startPosition = screenWidth / 2;
    
    //new Word("Woaw", startPosition, endPosition(), 1000);

    /* for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const l1 = startPosition;
        const l2 = startPosition + (Math.random() < 0.5 ? -1 : 1) * ((Math.random() * screenWidth * 3 / 4) + screenWidth / 4);
        const c = Math.random() * screenHeight / 2 + screenHeight / 4; // Valeur plus grande pour une parabole plus haute

        new Word(word, l1, l2, c);
    } */



    new Word(
        words[Math.floor(Math.random() * words.length)],
        startPosition,
        startPosition + (Math.random() < 0.5 ? -1 : 1) * ((Math.random() * screenWidth * 3 / 4) + screenWidth / 4),
        Math.random() * screenHeight / 2 + screenHeight / 4
    );
});


class Word {

    /*
    l1: begin posistion
    l2: end position
    c: height of the parabola
    */
    constructor(word, l1, l2, c) {
        this.t = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.x = 0;
        this.y = 0;
        //this.yOffset = window.innerHeight - image.getBoundingClientRect().top;
        this.yOffset = image.getBoundingClientRect().top;
        console.log(window.innerHeight, image.getBoundingClientRect().top, this.yOffset);
        //this.yOffset = 0;
        this.word = word;
        this.l1 = l1;
        this.l2 = l2;
        this.c = c;

        this.element = document.createElement('span');
        this.element.className = 'word';
        this.element.textContent = word;
        container.appendChild(this.element);

        this.deltaL = l2 - l1;  

        this.a = -4 * c / (this.deltaL ** 2); // Moins de valeur négative pour éviter d'être trop serré
        this.delta = -4 * this.a * c;

        this.p = (this.deltaL > 0 ? 1 : -1) * Math.sqrt(this.delta) / (2 * this.a); // deltaL > 0 => parabola vers le bas

        this.animate();
    }


    calculateY(x) {
        return this.a * (x + this.p - this.l1) ** 2 + this.c; // y commence en bas et monte
    }

    animate() {
        this.t += 0.004;
        //this.t += 0.001;

        this.x = this.t * this.deltaL + this.l1; // va de -l à +l
        this.y = this.calculateY(this.x);

        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y +  this.yOffset}px`;

        //rotate word using lastX and lastY
        const dx = this.x - this.lastX;
        const dy = this.y - this.lastY;
        const angle = -Math.atan2(dy, dx) * 180 / Math.PI + (this.deltaL > 0 ? 0 : 180);
        this.element.style.transform = `rotate(${angle}deg)`;

        this.lastX = this.x;
        this.lastY = this.y;
        this.element.style.opacity = 1 - this.t * 1.5; // Fade out effect

        if (this.t < 1) {
            window.requestAnimationFrame(this.animate.bind(this));
        } else {
            this.remove();
        }
    }

    remove() {
        this.element.remove();
    }
}