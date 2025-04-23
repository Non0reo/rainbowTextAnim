const image = document.getElementById('image');
const container = document.getElementById('container');
const words = ["Woaw", "Man !", "Wow", "Whoa", "Woahohoho", "OMG", "Wooooooow", "Aaaaaaahaaahaaaa", "Woawwwwww", "Hoooooo", "Yeaaaaaah", "Look at that"];

// Fonction pour calculer la trajectoire parabolique
const calculateY = (x, a, c, baseY) => {
  return baseY - (a * Math.pow(x, 2) + c);
};

image.addEventListener('click', () => {
  const rect = image.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const centerX = rect.left + rect.width / 2; // Centre horizontal de la div
  const baseY = rect.top + rect.height / 2;  // Centre vertical de la div

  container.innerHTML = ""; // Réinitialise le conteneur

  // Choisir un mot au hasard dans la liste
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const span = document.createElement('span');
  span.className = 'word';
  span.textContent = randomWord;
  container.appendChild(span);

<<<<<<< HEAD
  // Définir des seuils pour la largeur et la hauteur de la parabole
  const minWidth = 100; // Largeur minimale de la parabole
  const maxWidth = Math.min(screenWidth / 2 - 50, 300); // Largeur maximale visible
  const minHeight = 50;  // Hauteur minimale de la parabole
  const maxHeight = Math.min(screenHeight / 2, 400); // Hauteur maximale visible

  // Générer une largeur et une hauteur aléatoires pour la parabole
  const l = (Math.random() * (maxWidth - minWidth) + minWidth) * (Math.random() < 0.5 ? -1 : 1); // Gauche ou droite
  const c = Math.random() * (maxHeight - minHeight) + minHeight; // Hauteur de la parabole
  const a = -2 * c / (l * l); // Calcul du coefficient de la parabole

  let t = 0;
=======
    // Limite de la trajectoire pour les mots
    const maxL = Math.min(screenWidth / 2 - 50, 300);  // Limite horizontale
    const maxC = Math.min(screenHeight / 2, 400);     // Limite verticale plus grande

    const l = (Math.random() * 2 - 1) * maxL;  // Entre -maxL et +maxL
    const c = Math.random() * maxC;            // Valeur plus grande pour une parabole plus haute

    const a = -2 * c / (l * l);                 // Moins de valeur négative pour éviter d'être trop serré
>>>>>>> Nolhan

  const animate = () => {
    t += 0.01;

    const x = (t - 0.5) * 2 * l; // Mouvement horizontal
    const y = calculateY(x, a, c, baseY); // Mouvement vertical

    span.style.left = `${centerX + x}px`;
    span.style.top = `${y}px`;

    // Ajouter un effet d'opacité pour une disparition progressive
    span.style.opacity = `${1 - t}`;

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      span.remove(); // Supprime l'élément une fois l'animation terminée
    }
  };

  animate();
});