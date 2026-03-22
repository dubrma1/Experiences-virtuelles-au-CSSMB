// On importe la classe mère pour pouvoir en hériter
import { GameObject } from './GameObject.js';
// On importera plus tard la configuration du jeu
// import { GAME_CONFIG } from '../config.js';

// Notre nouvelle classe Bacille qui "étend" GameObject
export class Bacille extends GameObject {
    constructor(x, y, angle, canvas, ctx) {
        // super() appelle le constructeur de la classe mère (GameObject)
        // C'est obligatoire et c'est la première chose à faire.
        super(x, y, angle, canvas, ctx);

        // On peut ajouter des propriétés spécifiques aux bacilles ici
        this.type = 'bacille'; // Utile pour l'identification
        this.sel = false; // Un bacille n'est pas sélectionnable par le joueur
    }

    // On transforme la fonction globale "divisionB" en une méthode de classe.
    // Une méthode est une fonction qui appartient à une classe.
    seDiviser() {
        // La condition de division
        if (this.age > 950) { // Plus tard, on remplacera 950 par GAME_CONFIG.AGE_DIVISION_BACILLE
            this.age = 0; // On réinitialise l'âge du parent

            // La logique pour créer un nouveau bacille sera gérée par la classe principale du jeu
            console.log("Un bacille se divise ! Il faut en créer un nouveau.");
            return true; // On retourne 'true' pour indiquer qu'une division doit avoir lieu
        }
        return false;
    }

    // Chaque classe aura sa propre logique de mise à jour
    update(deltaTime) {
        this.age++; // L'âge augmente à chaque "tick" du jeu

        // On appelle la logique de division
        if (this.seDiviser()) {
            // Le gestionnaire principal du jeu créera un nouveau bacille
        }

        // Ici, on ajoutera la logique de mouvement du bacille,
        // reprise de la fonction "bougeObjets" du fichier anim.js
        this.angle += this.dangle;
        this.x += this.vx;
        this.y += this.vy;
    }
}