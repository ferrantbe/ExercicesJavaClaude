package be.ephec.java.demo.poo.slides;

/**
 * Slide « Un compteur d'instances » (POO, section 4).
 *
 * Le champ static est partage par tous les tickets. Notez l'ordre de la
 * sortie : declarer une variable ne cree aucun ticket, seul new le fait.
 */
public class UnCompteurDInstances {

    static class Ticket {
        private static int crees = 0;

        public Ticket() {
            crees++;
            System.out.println("Ticket " + crees + " cree");
        }
    }

    public static void main(String[] args) {
        Ticket a;
        System.out.println("main 1");
        a = new Ticket();
        System.out.println("main 2");
        Ticket b;
        System.out.println("main 3");
        b = new Ticket();
        Ticket c = new Ticket();
        System.out.println("main 4");
    }

    /* Sortie attendue :
    main 1
    Ticket 1 cree
    main 2
    main 3
    Ticket 2 cree
    Ticket 3 cree
    main 4
    */
}
