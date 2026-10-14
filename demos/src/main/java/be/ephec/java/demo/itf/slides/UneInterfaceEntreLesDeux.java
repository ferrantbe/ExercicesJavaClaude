package be.ephec.java.demo.itf.slides;

/**
 * Slide « Une interface entre les deux » (ITF, section 4).
 *
 * Le meme controleur, sans une ligne de change, parle a deux afficheurs
 * differents : la console, et un afficheur qui retient les messages, comme
 * le ferait un test.
 */
public class UneInterfaceEntreLesDeux {

    static class AfficheurConsole implements Afficheur {
        @Override
        public void affiche(String message) {
            System.out.println("[console] " + message);
        }
    }

    static class AfficheurQuiRetient implements Afficheur {
        String dernier;

        @Override
        public void affiche(String message) {
            dernier = message;
        }
    }

    public static void main(String[] args) {
        Controleur controleur = new Controleur();

        controleur.setAfficheur(new AfficheurConsole());
        controleur.annoncer("bouton presse");

        AfficheurQuiRetient memoire = new AfficheurQuiRetient();
        controleur.setAfficheur(memoire);
        controleur.annoncer("fenetre fermee");
        System.out.println("Retenu : " + memoire.dernier);
    }

    /* Sortie attendue :
    [console] Evenement : bouton presse
    Retenu : Evenement : fenetre fermee
    */
}
