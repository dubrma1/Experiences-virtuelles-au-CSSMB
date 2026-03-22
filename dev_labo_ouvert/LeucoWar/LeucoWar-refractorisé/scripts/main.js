import { demarrerLeJeu } from './demarre.js';
// On importe les fonctions de gestion du clavier
import { handleKeyDown, wheel } from './clavier.js';

// On attache les événements globaux ici
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

// On lance le jeu
demarrerLeJeu();