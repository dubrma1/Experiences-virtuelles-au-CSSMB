/*
 * =====================================================================================
 * MODULE DEMARRE : Chargement des ressources et initialisation du jeu
 * -------------------------------------------------------------------------------------
 * Rôle : Ce module est responsable de :
 * 1. Définir et exporter la fonction principale de démarrage du jeu.
 * 2. Gérer le chargement de toutes les images.
 * 3. Initialiser l'état du jeu et créer les objets une fois le chargement terminé.
 * =====================================================================================
 */

// --- IMPORTATIONS DES DÉPENDANCES ---
// On importe la classe Bacille car ce module est responsable de sa création.
import { Bacille } from './classes/Bacille.js';

// --- VARIABLES GLOBALES DU MODULE ---
// Ces variables étaient globales, elles sont maintenant contenues dans la portée de ce module.
// D'autres modules ne peuvent pas y accéder directement, ce qui est plus sécurisé.
var modeCollege;
var nbImagesChargees = 0;
export var tImages = []; // Exporter pour que d'autres modules (comme canvas.js) puissent y accéder
export var tImg = [];    // Exporter pour que d'autres modules puissent y accéder
var timerAnim;
var timerResize;
var PI = Math.PI;
export var gameObjects = []; // Exporter pour que anim.js puisse l'utiliser pour la boucle de jeu

// --- STRUCTURES DE DONNÉES DE L'ANCIEN SYSTÈME ---
// Ces tableaux seront progressivement vidés au fur et à mesure de la création de nouvelles classes.
export const nTObj = 13;
export var tObj = [];
for (var i = 0; i < nTObj; i++) { tObj[i] = []; }
export var cObj = [];
for (var i = 0; i < nTObj; i++) {
    cObj[i] = new Object();
    cObj[i].n = 0;
}
cObj[0].nIm=0; cObj[0].sel=true;
cObj[1].nIm=1; cObj[1].sel=false; // bacille ac
cObj[2].nIm=2; cObj[2].sel=true; // monocyte
cObj[3].nIm=3; cObj[3].sel=true; // mastocyte
cObj[4].nIm=4; cObj[4].sel=false;  // bacille
cObj[5].nIm=5; cObj[5].sel=false;
cObj[6].nIm=6; cObj[6].sel=false; // hématie
cObj[7].nIm=21; cObj[7].sel=false; // bacille mort
cObj[8].nIm=22; cObj[8].sel=true; // plasmo sang
cObj[9].nIm=22; cObj[9].sel=true; // plasmo tissus
cObj[10].nIm=23; cObj[10].sel=false; // leuco mort
cObj[11].nIm=30; cObj[11].sel=false;    // treponeme
cObj[12].nIm=31; cObj[12].sel=false;    // treponeme ac


// --- FONCTIONS DE CHARGEMENT DES IMAGES ---

/**
 * Appelée à chaque fois qu'une image a fini de se charger.
 * Met à jour la barre de progression et lance le jeu quand tout est prêt.
 */
function imageChargee() {
    nbImagesChargees++;
    // On suppose que 'ctx' et 'canv' sont disponibles (ils le seront via des imports plus tard)
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(canv.width * 0.1, canv.height / 40, canv.width * 0.8, canv.height / 40);
    ctx.fillStyle = "black";
    ctx.fillRect(canv.width * 0.1, canv.height / 40, canv.width * 0.8 * nbImagesChargees / tImages.length, canv.height / 40);

    // Quand toutes les images sont chargées, on passe à l'initialisation du jeu.
    if (nbImagesChargees >= tImages.length) {
        setupGame();
    }
}

/**
 * Charge une image de manière asynchrone.
 * @param {number} i - L'index de l'image à charger dans le tableau tImages.
 */
function chargeUneImage(i) {
    var o = tImages[i];
    // Sécurité pour éviter une erreur si un indice du tableau est manquant.
    if (!o || !o.src) {
        console.error(`Aucune image définie pour l'index ${i}`);
        imageChargee(); // On appelle quand même pour ne pas bloquer le chargement
        return;
    }
    
    tImg[i] = new Image();
    if (modeCollege) {
        if (o.src == "plasmoac.jpg") { o.src = "plasmoac2.jpg"; }
        if (o.src == "exocytose.jpg") { o.src = "exocytose2.jpg"; }
        if (o.src == "infla.jpg") { o.src = "infla2.jpg"; }
    }
    tImg[i].src = "images/" + o.src;
    tImg[i].onload = imageChargee;
    
    // Appel récursif avec un délai pour charger la suivante
    i++;
    if (i < tImages.length) { 
        setTimeout(function () { chargeUneImage(i) }, 1);
    }
}

/**
 * Définit la liste de toutes les images nécessaires au jeu et lance le chargement.
 */
function chargeImages() {
    tImages[0] = { nom: "macrophage", src: "macrophage0.png", tRel: 1 };
    tImages[1] = { nom: "bacille ac", src: "bacille_ac.png", tRel: 0.35 };
    tImages[2] = { nom: "monocyte", src: "monocyte.png", tRel: 0.8 };
    tImages[3] = { nom: "mastocyte", src: "mastocyte.png", tRel: 0.9 };
    tImages[4] = { nom: "bacille", src: "bacille.png", tRel: 0.3 };
    tImages[5] = { nom: "cellule endothéliale", src: "endoth.png", tRel: 2 };
    tImages[6] = { nom: "hématie", src: "hematie.png", tRel: 0.3 };
    tImages[7] = { nom: "texture cellules", src: "cells-5.jpg", tRel: 1 };
    tImages[8] = { nom: "texture cellules", src: "cells-red.jpg", tRel: 1 };
    tImages[9] = { nom: "macrophage1", src: "macrophage1.png", tRel: 1 };
    tImages[10] = { nom: "macrophage2", src: "macrophage2.png", tRel: 1 };
    tImages[11] = { nom: "macrophage3", src: "macrophage3.png", tRel: 1 };
    tImages[12] = { nom: "macrophage4", src: "macrophage4.png", tRel: 1 };
    tImages[13] = { nom: "macrophage5", src: "macrophage5.png", tRel: 1 };
    tImages[14] = { nom: "mastocyte", src: "mastocyte1.png", tRel: 0.9 };
    tImages[15] = { nom: "mastocyte", src: "mastocyte2.png", tRel: 0.9 };
    tImages[16] = { nom: "mastocyte", src: "mastocyte3.png", tRel: 0.9 };
    tImages[17] = { nom: "mastocyte", src: "mastocyte4.png", tRel: 0.9 };
    tImages[18] = { nom: "mastocyte", src: "mastocyte5.png", tRel: 0.9 };
    tImages[19] = { nom: "mastocyte", src: "mastocyte6.png", tRel: 0.9 };
    tImages[20] = { nom: "mastocyte", src: "mastocyte7.png", tRel: 0.9 };
    tImages[21] = { nom: "bacille mort", src: "bacille_mort.png", tRel: 0.4 };
    tImages[22] = { nom: "plasmocyte", src: "plasmocyte.png", tRel: 0.8 };
    tImages[23] = { nom: "leucocyte mort", src: "leucomort.png", tRel: 1 };
    tImages[24] = { nom: "inflammation", src: "infla.jpg", tRel: 1 };
    tImages[25] = { nom: "tue bactéries", src: "tuebacteries.jpg", tRel: 1 };
    tImages[26] = { nom: "controle macro", src: "controlemacro.jpg", tRel: 1 };
    tImages[27] = { nom: "controle macro", src: "exocytose.jpg", tRel: 1 };
    tImages[28] = { nom: "plasmo ac", src: "plasmoac.jpg", tRel: 1 };
    tImages[29] = { nom: "bouton", src: "bouton.png", tRel: 1 };
    tImages[30] = { nom: "treponeme", src: "treponeme.png", tRel: 0.4 };
    tImages[31] = { nom: "treponeme_ac", src: "treponeme_ac.png", tRel: 0.4 };
    tImages[32] = { nom: "trepo", src: "trepo.jpg", tRel: 1 };
    tImages[33] = { nom: "mort", src: "mort.jpg", tRel: 1 };
    tImages[34] = { nom: "arc en ciel", src: "rainbow.jpg", tRel: 1 };
    tImages[35] = { nom: "fond microbes", src: "fondmicrobes.jpg", tRel: 1 };
    tImages[36] = { nom: "antibiotique", src: "antibio.jpg", tRel: 1 };
    tImages[37] = { nom: "switch", src: "switch.png", tRel: 1 };
    tImages[38] = { nom: "switch2", src: "switch2.png", tRel: 1 };

    chargeUneImage(0);
}


// --- FONCTION PRINCIPALE EXPORTÉE ---

/**
 * Point d'entrée du module de démarrage.
 * Est appelée par main.js pour lancer tout le processus.
 */
export function demarrerLeJeu() {
    // Logique qui était dans le HTML : gestion des paramètres d'URL.
    const urlParams = parseURLParams(window.location.href) || [];
    const urlParamMode = urlParams["mode"] || "lycee";
    modeCollege = (urlParamMode == "college");
    document.ontouchmove = function (e) { e.preventDefault(); };

    // On suppose que redimCanvas() est globale pour l'instant
    redimCanvas();
    // Lance le processus de chargement des images.
    chargeImages();
}


// --- FONCTION D'INITIALISATION DU JEU ---

/**
 * Contient toute la logique d'initialisation du jeu qui doit s'exécuter
 * APRÈS que toutes les images ont été chargées.
 */
function setupGame() {
    // On suppose que ces fonctions sont globales pour l'instant
    timerResize = setInterval(testRedim, 1000);
    assignEvent();

    // Création des objets "classiques" (ceux qui n'ont pas encore de classe)
    for (var i = 0; i < 100; i++) {
        creeNouveauObj(6); //hématies
    }

    // Création des nouveaux objets Bacille en utilisant la classe
    for (let i = 0; i < nMaxBac; i++) {
        let newCanvas = document.createElement('canvas');
        document.getElementById('divcanvas').appendChild(newCanvas);
        let newCtx = newCanvas.getContext('2d');
        newCanvas.style.position = "absolute";
        newCanvas.style.zIndex = 5;

        let x = Math.random() * lTerr;
        let y = Math.random() * yMax;
        let angle = Math.random() * 2 * PI;
        let nouveauBacille = new Bacille(x, y, angle, newCanvas, newCtx);
        gameObjects.push(nouveauBacille);
    }

    // On cache une partie des bacilles au départ en utilisant leur méthode .cache()
    for (let i = Math.floor(nMaxBac / 4); i < gameObjects.length; i++) {
        gameObjects[i].cache();
    }

    // Initialisation du reste du jeu
    creeVaisseau();
    fond();
    initAntibio();
    etape = 0;
    pause = false;
    afficheAuteur();
    anim();
    afficheEtape();
}


// --- FONCTION UTILITAIRE ---

/**
 * Analyse les paramètres dans l'URL de la page.
 * @param {string} url - L'URL à analyser.
 * @returns {Object} Un objet contenant les paramètres.
 */
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return {};
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
