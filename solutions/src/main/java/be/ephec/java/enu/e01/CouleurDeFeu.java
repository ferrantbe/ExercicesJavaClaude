package be.ephec.java.enu.e01;

/**
 * ENU.1 — CORRIGE.
 *
 * L'ordre de declaration compte : c'est celui que rend ordinal(), et c'est
 * celui de values(). Ici, il correspond au cycle du feu, ce qui permettra de
 * calculer la couleur suivante sans ecrire une seule condition.
 */
public enum CouleurDeFeu {
    VERT, ORANGE, ROUGE
}
