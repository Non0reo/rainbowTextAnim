
  const image = document.getElementById('image');
  const container = document.getElementById('container');
  const words = ["Magique", "Créativité", "Pixel", "Onde", "Inspiration", "Liberté"];

  const calculateY = (x, a, c, baseY) => {
    return baseY - (a * Math.pow(x, 2) + c); // y commence en bas et monte (haut = 0)
  };

  image.addEventListener('click', () => {
    const rect = image.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const centerX = rect.left + rect.width / 2;
    const baseY = rect.top + rect.height; // point de départ = bas de la div

    container.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      container.appendChild(span);

      // Valeurs bornées :
      const maxL = screenWidth / 2 - 50; // garde un peu de marge
      const maxC = screenHeight / 2;     // mots ne doivent pas dépasser la moitié de l'écran vers le haut

      const l = (Math.random() * 2 - 1) * maxL; // entre -maxL et +maxL
      const c = Math.random() * maxC;          // entre 0 et maxC
      const a = -4 * c / (l * l);               // coefficient parabolique

      let t = 0; // va de 0 à 1

      span.style.opacity = 1;

      const animate = () => {
        t += 0.01;

        const x = t * l;
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
