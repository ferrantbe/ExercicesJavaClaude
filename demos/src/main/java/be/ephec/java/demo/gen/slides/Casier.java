package be.ephec.java.demo.gen.slides;

/**
 * Slides « Declarer un parametre, le fixer a l'usage » (section 1) et « Une
 * methode statique declare son T » (section 5) de GEN.
 */
public class Casier<T> {

    private T contenu;

    public void deposer(T objet) {
        contenu = objet;
    }

    public T retirer() {
        T objet = contenu;
        contenu = null;
        return objet;
    }

    public static <T> Casier<T> contenant(T objet) {
        Casier<T> casier = new Casier<>();
        casier.deposer(objet);
        return casier;
    }
}
