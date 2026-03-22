/*
 * =====================================================================================
 * MODULE CANVAS : Le coeur de l'affichage et de l'interaction
 * -------------------------------------------------------------------------------------
 * Rôle : Ce module est responsable de :
 * 1. Créer et gérer toutes les variables des éléments <canvas> et de leurs contextes 2D.
 * 2. Définir et exporter les dimensions clés du jeu (taille de l'écran, taille du terrain).
 * 3. Centraliser la logique de redimensionnement de la fenêtre.
 * 4. Préparer les images pour le dessin (fonction creeTCanv).
 * 5. Dessiner le fond du jeu.
 * =====================================================================================
 */

// --- IMPORTATIONS DES DÉPENDANCES ---
// On importe les fonctions des autres modules dont ce fichier a besoin.
// Note : Ces fichiers devront aussi être transformés en modules avec "export".
import { anim, startAnim } from './anim.js';
import { afficheEtape } from './etapes.js';
import { doTouchStart, doTouchMove, clicLeve, clicSouris, survolSorti, survolCanvas } from './clic.js';
import { admAntibio, survolAntibio } from './antibio.js';
import { redrawAllCanv } from './objets.js';

// --- VARIABLES GLOBALES DU MODULE ---
// On exporte les variables qui doivent être accessibles par les autres modules.

// Éléments Canvas et leurs Contextes 2D
export const canv = document.getElementById("canv");
export const ctx = canv.getContext("2d");
export const canvI = document.getElementById("canvI");
export const ctxI = canvI.getContext("2d");
export const canvAuteur = document.getElementById("canvAuteur");
export const ctxAuteur = canvAuteur.getContext("2d");
export const canvClic = document.getElementById("canvClic");
export const ctxClic = canvClic.getContext("2d");
export const canvF = document.getElementById("canvF");
export const ctxF = canvF.getContext("2d");
export const canvM = document.getElementById("canvM");
export const ctxM = canvM.getContext("2d");
export const canvD = document.getElementById("canvD");
export const ctxD = canvD.getContext("2d");
export const canvA = document.getElementById("canvA");
export const ctxA = canvA.getContext("2d");
export const canvT = document.getElementById("canvT");
export const ctxT = canvT.getContext("2d");

// Dimensions de l'écran et du terrain de jeu
export let lCanv = window.innerWidth;
export let hCanv = window.innerHeight;
export let hTerr = Math.round(hCanv * 1.15);
export let lTerr = Math.round(hTerr * 4);
export let xMax = lTerr;
export let yMax = hTerr;
export let zF = hTerr / yMax; // Facteur de zoom
export let tBase = yMax / 15; // Taille de base pour les objets
export let vit = tBase / 30; // Vitesse de base

// Variables de jeu
export const mFont = "Trebuchet MS";
export const nTObj = 13; // Le nombre total de types d'objets (pour l'ancien système)

// Un tableau pour stocker les canvas pré-dessinés des images
export let tCanv = [];

/**
 * Prépare les images du jeu en les dessinant sur des canvas intermédiaires.
 * Cela permet d'appliquer des effets (comme un léger flou pour l'antialiasing) une seule fois.
 * @param {boolean} cree - Faut-il créer les éléments canvas ou juste les redessiner.
 * @param {Array} tImages - Le tableau de configuration des images.
 * @param {Array} tImg - Le tableau des objets Image chargés.
 */
export function creeTCanv(cree, tImages, tImg) {
    for (let nIm = 0; nIm < tImages.length; nIm++) {
        if (cree) { tCanv[nIm] = document.createElement('canvas'); }
        if (!tImg[nIm] || !tImages[nIm]) continue; // Sécurité pour éviter les erreurs

        const l = tBase * zF * tImages[nIm].tRel;
        const h = l * tImg[nIm].height / tImg[nIm].width;
        const tCtx = tCanv[nIm].getContext('2d');

        tCtx.clearRect(0, 0, tCanv[nIm].width, tCanv[nIm].height);
        tCanv[nIm].width = l;
        tCanv[nIm].height = h;

        // Antialiasing "maison" en dessinant l'image plusieurs fois avec un léger décalage
        const margel = l / 10;
        const margeh = h / 10;
        const innerL = l - margel * 2;
        const innerH = h - margeh * 2;
        const d = hTerr / 1500;

        tCtx.globalAlpha = 0.25;
        tCtx.drawImage(tImg[nIm], 0, 0, tImg[nIm].width, tImg[nIm].height, margel + d, margeh + d, innerL, innerH);
        tCtx.drawImage(tImg[nIm], 0, 0, tImg[nIm].width, tImg[nIm].height, margel - d, margeh - d, innerL, innerH);
        tCtx.globalAlpha = 1;
        tCtx.drawImage(tImg[nIm], 0, 0, tImg[nIm].width, tImg[nIm].height, margel, margeh, innerL, innerH);
    }
}

/**
 * Dessine le fond du jeu, incluant les tissus et le vaisseau sanguin.
 * @param {Array} tImg - Le tableau des objets Image chargés.
 * @param {Array} yVaiss - Le tableau des coordonnées Y du vaisseau sanguin.
 * @param {number} xDec - Le décalage horizontal de la caméra.
 * @param {number} yDec - Le décalage vertical de la caméra.
 */
export function fond(tImg, yVaiss, xDec, yDec) {
    ctx.clearRect(0, 0, lCanv, hCanv);
    ctx.save();
    ctx.translate(-xDec * zF, -yDec * zF);

    // Fond des tissus
    ctx.fillStyle = ctx.createPattern(tImg[7], "repeat");
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, lTerr, hTerr);

    // Fond du vaisseau sanguin
    ctx.beginPath();
    ctx.moveTo(lTerr, hTerr);
    ctx.lineTo(0, hTerr);
    for (let i = 0; i <= 100; i++) {
        const x = i / 100 * lTerr;
        const y = yVaiss[i] * zF;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = ctx.createPattern(tImg[8], "repeat");
    ctx.fill();
    ctx.restore();
}


/**
 * Redimensionne tous les canvas pour qu'ils s'adaptent à la nouvelle taille de la fenêtre.
 */
export function redimCanvas() {
    lCanv = window.innerWidth;
    hCanv = window.innerHeight;
    
    canv.width = lCanv;
    canv.height = hCanv;
    canvClic.width = lCanv;
    canvClic.height = hCanv;
    canvF.width = lCanv;
    canvF.height = hCanv;
    canvM.width = lCanv;
    canvM.height = hCanv;

    // Redimensionnement du canvas des popups (étapes)
    canvT.width = lCanv * 0.95;
    canvT.height = canvT.width * 3 / 4;
    while (canvT.height > hCanv * 0.95) {
        canvT.width *= 0.98;
        canvT.height = canvT.width * 3/4;
    }
    canvT.style.top = Math.round((hCanv - canvT.height) / 2) + "px";
    canvT.style.left = Math.round((lCanv - canvT.width) / 2) + "px";

    // Recalcul des dimensions du terrain
    hTerr = Math.round(hCanv * 1.15);
    lTerr = Math.round(hTerr * 4);
    zF = hTerr / yMax;
}

/**
 * Attache tous les écouteurs d'événements nécessaires aux éléments du canvas.
 */
export function assignEvent() {
    // Événements sur le canvas principal pour le clic et le mouvement
    canvClic.addEventListener("touchstart", doTouchStart, false);
    canvClic.addEventListener("touchmove", doTouchMove, false);
    canvClic.addEventListener("touchend", clicLeve, false);
    canvClic.addEventListener("mousedown", clicSouris, false);
    canvClic.addEventListener("mouseup", clicLeve, false);
    document.addEventListener("mouseout", survolSorti, false);
    canvClic.addEventListener("mousemove", survolCanvas, false);

    // Événements sur le canvas de l'antibiotique
    canvA.addEventListener("touchstart", admAntibio, false);
    canvA.addEventListener("mousedown", admAntibio, false);
    canvA.addEventListener("mousemove", survolAntibio, false);
}

// --- LOGIQUE DE REDIMENSIONNEMENT (intégrée depuis resize.js) ---

let redimEnCours = false;

/**
 * Vérifie périodiquement si la fenêtre a été redimensionnée.
 */
export function testRedim() {
    if (!redimEnCours && (lCanv !== window.innerWidth || hCanv !== window.innerHeight)) {
        redim();
    }
}

/**
 * Lance le processus de redimensionnement en affichant un message de patience.
 */
function redim() {
    redimEnCours = true;
    stopAnim(); // On met l'animation en pause
    
    // Affichage du message "Veuillez patienter"
    ctxT.clearRect(0,0,canvT.width,canvT.height);
    ctxT.fillStyle = "white";
    ctxT.fillRect(0,0,canvT.width,canvT.height);
    ctxT.fillStyle = "black";
    ctxT.font = `bold italic 20px ${mFont}`;
    ctxT.textAlign = "center";
    ctxT.fillText("Redimensionnement en cours...", canvT.width / 2, canvT.height / 2);
    canvT.style.display = "block";

    // On lance le redimensionnement réel après un court délai pour laisser le message s'afficher
    setTimeout(redim2, 50); 
}

/**
 * Effectue les calculs lourds de redimensionnement et relance le jeu.
 */
function redim2() {
    redimCanvas();
    creeTCanv(false, window.tImages, window.tImg); // On passe les tableaux globaux en attendant mieux
    redrawAllCanv();
    
    canvT.style.display = "none";
    fond(window.tImg, window.yVaiss, window.xDec, window.yDec);
    // ... relancer d'autres éléments graphiques si nécessaire (barres, etc.)

    if (window.etapeAffiche) { // Utilise les variables globales en attendant de passer par un objet "gameState"
        afficheEtape();
    } else {
        startAnim();
    }
    redimEnCours = false;
}
