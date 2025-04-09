const image = document.getElementById('image');
const container = document.getElementById('container');
const words = ["Woaw", "Man !", "Wow", "Whoa", "Woahohoho", "OMG", "Wooooooow", "Aaaaaaahaaahaaaa", "Woawwwwww", "Hoooooo", "Yeaaaaaah", "Look at that"];

image.addEventListener('click', () => {
    
});


class Word {

    /*
    l1: begin posistion
    l2: end position
    c: height of the parabola
    */
    constructor(word, l1, l2, c) {
        this.t = 0;
        this.word = word;
        this.l1 = l1;
        this.l2 = l2;
        this.c = c;

        this.element = document.createElement('span');
        this.element.className = 'word';
        this.element.textContent = word;
        container.appendChild(span);

        this.deltaL = l2 - l1;  

        this.a = -4 * c / (this.deltaL ** 2); // Moins de valeur négative pour éviter d'être trop serré
        this.delta = -4 * a * c;

        this.p = this.deltaL > 0 ? Math.sqrt(this.delta) / 2 * a : -Math.sqrt(this.delta) / 2 * a; // deltaL > 0 => parabola vers le bas
    }


    calculateY(x) {
        return a * (x + this.p - this.l1) ** 2 + this.c; // y commence en bas et monte
    }

    animate() {
        this.t += 0.01;

        const x = this.t * this.deltaL + this.l1; // va de -l à +l
        const y = this.calculateY(x);

        this.element.style.left = `${x}px`;
        this.element.style.bottom = `${y}px`;

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            this.element.style.opacity = 0;
        }
    }
}