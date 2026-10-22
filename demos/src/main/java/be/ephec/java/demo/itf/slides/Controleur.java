package be.ephec.java.demo.itf.slides;

/**
 * Slide « Une interface entre les deux » (ITF, section 4) : le controleur ne
 * depend plus que du contrat Afficheur.
 */
public class Controleur {

    private Afficheur afficheur;

    public void setAfficheur(Afficheur afficheur) {
        this.afficheur = afficheur;
    }

    public void annoncer(String evenement) {
        afficheur.affiche("Evenement : " + evenement);
    }
}
