package be.ephec.java.demo.exc.slides;

/**
 * Slide « Ce que le try saute » (EXC, section 3).
 *
 * Au premier throw, le reste du try est abandonne. Le catch s'execute,
 * puis tout ce qui le suit. Le premier appel, lui, a bien eu lieu.
 */
public class CeQueLeTrySaute {

    public static void main(String[] args) {
        Ascenseur ascenseur = new Ascenseur(5);
        try {
            ascenseur.appeler(2);
            ascenseur.appeler(9);              // leve l'exception
            System.out.println("Arrive");      // jamais affiche
        } catch (EtageInaccessibleException e) {
            System.out.println("Refus : " + e.getMessage());
        }
        System.out.println("Fin");             // toujours affiche
        System.out.println("Etage courant : " + ascenseur.etageCourant());
    }

    /* Sortie attendue :
    Refus : Etage 9 hors de l'intervalle 0 a 5
    Fin
    Etage courant : 2
    */
}
