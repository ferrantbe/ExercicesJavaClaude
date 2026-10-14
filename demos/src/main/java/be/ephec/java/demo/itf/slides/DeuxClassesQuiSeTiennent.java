package be.ephec.java.demo.itf.slides;

/**
 * Slide « Deux classes qui se tiennent » (ITF, section 4).
 *
 * Le controleur ne peut parler qu'a une GUI : pour l'essayer en console, ou
 * dans un test, il faudrait le modifier. Comparez avec UneInterfaceEntreLesDeux.
 */
public class DeuxClassesQuiSeTiennent {

    static class GUI {
        void affiche(String message) {
            System.out.println("[fenetre] " + message);
        }
    }

    static class Controleur {
        private GUI afficheur;

        public void setAfficheur(GUI afficheur) {
            this.afficheur = afficheur;
        }

        public void annoncer(String evenement) {
            afficheur.affiche("Evenement : " + evenement);
        }
    }

    public static void main(String[] args) {
        Controleur controleur = new Controleur();
        controleur.setAfficheur(new GUI());
        controleur.annoncer("bouton presse");
    }

    /* Sortie attendue :
    [fenetre] Evenement : bouton presse
    */
}
