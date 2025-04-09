const image = document.getElementById('image');
const container = document.getElementById('container');
const words = ["Woaw", "Man !", "Wow", "Whoa", "Woahohoho", "OMG", "Wooooooow", "Aaaaaaahaaahaaaa", "Woawwwwww", "Hoooooo", "Yeaaaaaah", "Look at that"];

const calculateY = (x, a, c, baseY) => {
  return baseY - (a * Math.pow(x, 2) + c); // y commence en bas et monte
};

image.addEventListener('click', () => {
  const rect = image.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const centerX = rect.left + rect.width / 2;
  const baseY = rect.top + rect.height - 220; // Ajuste pour commencer légèrement au-dessus du bas

  container.innerHTML = "";

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    container.appendChild(span);

    // Limite de la trajectoire pour les mots
   const maxL = Math.min(screenWidth / 2 - 50, 300);  // Limite horizontale
  const maxC = Math.min(screenHeight / 2, 400);     // Limite verticale plus grande

  const l = (Math.random() * 2 - 1) * maxL;  // Entre -maxL et +maxL
  const c = Math.random() * maxC;            // Valeur plus grande pour une parabole plus haute

  const a = -2 * c / (l * l);                 // Moins de valeur négative pour éviter d'être trop serré

    let t = 0;

    const animate = () => {
      t += 0.01;

      const x = (t - 0.5) * 2 * l; // va de -l à +l
      const y = calculateY(x, a, c, baseY);

      span.style.left = `${centerX + x}px`;
      span.style.top = `${y}px`;

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        span.style.opacity = 0;
      }
    };

    animate();
  });
});
