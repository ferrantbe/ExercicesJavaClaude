package be.ephec.java.demo.exc.slides;

/**
 * Slide « Un catch fait quelque chose » (EXC, section 3).
 *
 * Le catch ne se contente pas d'afficher : il aide l'utilisateur a
 * corriger, ici en proposant les etages valides.
 */
public class UnCatchFaitQuelqueChose {

    public static void main(String[] args) {
        Ascenseur ascenseur = new Ascenseur(5);
        Ecran ecran = new Ecran(ascenseur);
        int etage = 9;
        try {
            ascenseur.appeler(etage);
        } catch (EtageInaccessibleException e) {
            System.out.println("Refus : " + e.getMessage());
            ecran.proposerEtagesValides();
        }
    }

    /* Sortie attendue :
    Refus : Etage 9 hors de l'intervalle 0 a 5
    Etages possibles : de 0 a 5
    */
}
