function animateText() {
  // Sélectionne la div avec l'ID 'imposante_animation'
  const container = document.getElementById('imposante_animation');
  
  // Vérifie que la div existe
  if (!container) {
    console.error("L'élément avec l'ID 'imposante_animation' est introuvable !");
    return;
  }

  // Crée un élément div pour afficher le texte
  const textElement = document.createElement('div');
  textElement.innerText = "Ceci est une phrase animée !";
  textElement.style.position = 'absolute';
  textElement.style.left = '50%';
  textElement.style.top = '50%';
  textElement.style.transform = 'translate(-50%, -50%)';
  textElement.style.fontSize = '20px';
  textElement.style.fontWeight = 'bold';
  textElement.style.color = 'black';
  textElement.style.transition = 'transform 1.5s ease-out, font-weight 0.5s ease-out, color 0.5s ease-out, text-shadow 0.5s ease-out';

  console.log("Texte ajouté à la div.");

  // Ajoute l'élément à la div 'imposante_animation'
  container.appendChild(textElement);

  // Animation initiale : la phrase apparaît et gonfle légèrement
  setTimeout(() => {
    textElement.style.transform = 'translate(-50%, -50%) scale(1.5)';
    console.log("Premier gonflement.");
  }, 100);

  // Pause pour lecture (3 secondes)
  setTimeout(() => {
    // Gonfle encore plus
    textElement.style.transform = 'translate(-50%, -50%) scale(3)';
    console.log("Second gonflement.");
  }, 3100);

  // Explosion : agrandissement, gras fortement augmenté, effet 3D et disparition rapide
  setTimeout(() => {
    textElement.style.transform = 'translate(-50%, -50%) scale(5)';
    textElement.style.fontWeight = '1200'; // Gras maximum
    textElement.style.color = 'red'; // Change la couleur pour un effet d'explosion
    textElement.style.textShadow = `
      4px 4px 10px rgba(0, 0, 0, 0.5),
      -4px -4px 10px rgba(255, 0, 0, 0.7)
    `;
    console.log("Explosion !");
  }, 4600);

  // Suppression totale de l'élément après l'explosion
  setTimeout(() => {
    textElement.remove(); // Supprime l'élément du DOM
    console.log("Texte supprimé.");
  }, 5600); // Laisse le temps à l'explosion de se produire
}

// Ajoute un écouteur d'événement pour appeler la fonction au clic
document.addEventListener('click', animateText);