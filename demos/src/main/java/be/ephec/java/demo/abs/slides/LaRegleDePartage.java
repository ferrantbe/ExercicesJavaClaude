package be.ephec.java.demo.abs.slides;

/**
 * Slides « La regle de partage » et « L'obligation faite aux sous-classes »
 * (ABS, section 4).
 *
 * affiche est ecrite une fois, dans Forme ; elle appelle nom, que seule la
 * fille connait. C'est la mere qui mene, la fille qui fournit le detail.
 */
public class LaRegleDePartage {

    public static void main(String[] args) {
        Forme forme = new Cercle();
        forme.affiche();
    }

    /* Sortie attendue :
    Je suis un cercle
    */
}
