// export permet à cette classe d'être utilisée dans d'autres fichiers
export class GameObject {
    constructor(x, y, angle, canvas, ctx) {
        // --- Propriétés de base ---
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.age = 0;
        this.visible = false; // Par défaut, un objet n'est pas visible à sa création

        // --- Propriétés de mouvement ---
        this.vx = 0; // Vitesse sur l'axe x
        this.vy = 0; // Vitesse sur l'axe y
        this.dangle = 0; // Vitesse de rotation

        // --- Références au Canvas ---
        // Chaque objet garde une référence à son propre élément canvas et son contexte
        this.canv = canvas;
        this.ctx = ctx;

        // --- Propriétés de jeu ---
        this.sang = false;  // Est-ce que l'objet est dans le sang ?
        this.tissus = true; // Est-ce que l'objet est dans les tissus ?

        // --- Propriétés pour la sélection/interaction ---
        this.sel = false; // Est-ce que l'objet est sélectionnable ?
        this.lastClic = 0;
        this.fleche = { v: false, x: 0, y: 0 }; // L'objet flèche de direction
    }

    // Affiche le canvas de l'objet et le rend "actif"
    revele() {
        this.visible = true;
        this.canv.style.display = "block";
    }

    // Cache le canvas de l'objet et le rend "inactif"
    cache() {
        this.visible = false;
        this.canv.style.display = "none";
        cObj[this.c].n--; // Attention : cette ligne devra être adaptée
    }

    // Méthode pour mettre à jour la position de l'objet (sera appelée à chaque frame)
    update(deltaTime) {
        // Cette méthode est vide pour l'instant, mais les classes enfants (Bacille, etc.)
        // la rempliront avec leur propre logique de mouvement.
    }

    // Méthode pour dessiner l'objet (sera appelée à chaque frame)
    draw(zF, xDec, yDec) {
        if (!this.visible) return; // Ne rien faire si l'objet est caché

        // Met à jour la position du canvas sur la page HTML
        this.canv.style.left = Math.round((this.x - xDec) * zF - this.canv.width / 2) + "px";
        this.canv.style.top = Math.round((this.y - yDec) * zF - this.canv.height / 2) + "px";
    }
}