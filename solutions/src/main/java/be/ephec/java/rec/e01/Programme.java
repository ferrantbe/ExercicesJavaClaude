package be.ephec.java.rec.e01;

/**
 * REC.1 — Corrige.
 *
 * A remarquer : un seul try englobe toute la suite d'operations, parce que
 * si la premiere horloge ne peut pas etre creee, rien de ce qui suit n'a de
 * sens. La tentative volontairement fausse a son propre try, pour que le
 * lecteur voie qu'elle est attendue.
 */
public class Programme {

    public static void main(String[] args) {
        try {
            Horloge24h horloge = new Horloge24h(23, 50);
            System.out.println("Depart        : " + horloge);

            horloge.ajouter(0, 20);
            System.out.println("Apres 0:20    : " + horloge);

            Horloge24h duree = new Horloge24h(1, 15);
            horloge.ajouter(duree);
            System.out.println("Apres " + duree + "   : " + horloge);
        } catch (HeureInvalideException e) {
            System.out.println("Heure refusee : " + e.getMessage());
        }

        try {
            new Horloge24h(24, 0);
            System.out.println("Pas normal : 24:00 a ete accepte");
        } catch (HeureInvalideException e) {
            System.out.println("Comme prevu   : " + e.getMessage());
        }
    }
}
