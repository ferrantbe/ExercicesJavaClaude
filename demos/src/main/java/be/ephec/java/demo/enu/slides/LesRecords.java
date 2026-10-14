package be.ephec.java.demo.enu.slides;

/**
 * Slides « Une donnee, et rien d'autre », « Ce que le compilateur ecrit »,
 * « Ajouter une methode » et « Valider a la construction » (ENU, section 7).
 */
public class LesRecords {

    public static void main(String[] args) {
        Point origine = new Point(0, 0);
        System.out.println(origine.x());   // 0

        Point a = new Point(1, 2);
        Point b = new Point(1, 2);
        System.out.println(a);             // Point[x=1, y=2]
        System.out.println(a.equals(b));   // true
        System.out.println(a == b);        // false : deux objets distincts

        System.out.println(new Rectangle(3, 4).aire());
        try {
            new Rectangle(3, -4);
        } catch (IllegalArgumentException e) {
            System.out.println("Refus : " + e.getMessage());
        }
    }

    /* Sortie attendue :
    0
    Point[x=1, y=2]
    true
    false
    12
    Refus : dimensions positives
    */
}
