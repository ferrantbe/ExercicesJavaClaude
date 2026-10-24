package be.ephec.java.rec.e10;

import java.util.Locale;

/** REC.10 — Corrige. */
public class Programme {

    public static void main(String[] args) {
        Mediatheque mediatheque = new Mediatheque();
        mediatheque.ajouter(new Livre("Dune", 1965, Etat.BON, 688));
        mediatheque.ajouter(new Revue("Science et Vie", 2026, Etat.NEUF, 120));
        mediatheque.ajouter(new Dvd("Alien", 1979, Etat.ABIME, 117));
        mediatheque.ajouter(new JeuVideo("Tetris", 1984, Etat.ABIME, 30));

        for (String description : mediatheque.descriptions()) {
            System.out.println(description);
        }
        System.out.println("Abimes : " + mediatheque.compter(Etat.ABIME));
        System.out.printf(Locale.US, "Penalites pour 3 jours de retard : %.2f EUR%n",
                mediatheque.penalitesTotales(3));
    }
}
