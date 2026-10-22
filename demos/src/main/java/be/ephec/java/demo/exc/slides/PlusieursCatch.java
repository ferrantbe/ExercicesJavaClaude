package be.ephec.java.demo.exc.slides;

/**
 * Slide « Plusieurs catch, ou un seul » (EXC, section 3).
 *
 * Un catch par traitement different. Deux exceptions qui se traitent de la
 * meme facon partagent un seul catch, separees par une barre verticale.
 */
public class PlusieursCatch {

    private final Ascenseur ascenseur = new Ascenseur(5);
    private final Porte porte = new Porte();

    void aller(int etage) {
        try {
            ascenseur.appeler(etage);
            porte.ouvrir();
        } catch (EtageInaccessibleException e) {
            afficher("Etage refuse : " + e.getMessage());
        } catch (PorteBloqueeException | CoupureException e) {
            signalerPanne(e.getMessage());
        }
    }

    void afficher(String message) {
        System.out.println(message);
    }

    void signalerPanne(String message) {
        System.out.println("Panne signalee : " + message);
    }

    public static void main(String[] args) {
        PlusieursCatch cabine = new PlusieursCatch();
        cabine.aller(3);              // tout va bien
        cabine.aller(9);              // premier catch
        cabine.porte.bloquer();
        cabine.aller(2);              // second catch, porte bloquee
        cabine.porte.couperLeCourant();
        cabine.aller(1);              // second catch, coupure
    }

    /* Sortie attendue :
    Porte ouverte
    Etage refuse : Etage 9 hors de l'intervalle 0 a 5
    Panne signalee : La porte est bloquee
    Panne signalee : Plus de courant pour ouvrir la porte
    */
}
