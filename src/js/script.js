 const image = document.getElementById('image');
  const container = document.getElementById('container');
  const words = ["Magique", "Créativité", "Pixel", "Onde", "Inspiration", "Liberté"];

  // Fonction qui applique la formule de la parabole
  const calculateY = (x, a, c, baseY) => {
    return baseY + a * Math.pow(x, 2) + c; // Calcul de y avec la fonction parabolique
  };

  image.addEventListener('click', () => {
    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2; // Centre de la div
    const baseY = rect.top + rect.height;  // Le bas de la div de l'image

    container.innerHTML = ""; // Réinitialise le conteneur des mots à chaque clic

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      container.appendChild(span);

      // Initialisation des paramètres pour la parabole avec des valeurs réduites pour l et c
      const l = Math.random() * 0.5 - 0.25;  // Valeur de l entre -0.25 et 0.25 (plus petite plage)
      const c = 0.1 + Math.random() * (0.4); // Valeur de c entre 0.1 et 0.5 (plus petite plage)
      const a = -4 * c / (l * l); // Calcul du coefficient a

      // Initialisation de la position du mot au bas de l'image
      span.style.left = `${centerX}px`; 
      span.style.top = `${baseY}px`;  // On commence au bas de l'image
      span.style.opacity = 1;  // Rendre les mots visibles immédiatement

      let radius = 0;

      // Fonction d'animation
      const animate = () => {
        radius += 2; // Incrémente le rayon pour l'animation
        const x = radius * Math.cos(index * (Math.PI * 2 / words.length)); // Calcul de X selon l'index du mot
        const y = calculateY(x, a, c, baseY); // Calcul de Y avec la parabole

        // Limiter la position Y pour ne pas dépasser l'écran
        const screenHeight = window.innerHeight;
        const constrainedY = Math.max(0, Math.min(screenHeight, y));  // Empêcher le mot de sortir de l'écran

        // Déplacement des mots en X et Y
        span.style.left = `${centerX + x}px`;
        span.style.top = `${constrainedY}px`;   // Applique la position calculée en Y

        // Continue l'animation tant que le rayon est inférieur à 200
        if (radius < 200) {
          requestAnimationFrame(animate);
        } else {
          span.style.opacity = 0;  // On fait disparaître les mots après l'animation
        }
      };

      animate(); // Lancer l'animation pour chaque mot
    });
  });