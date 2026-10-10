package be.ephec.java.sta.e01;

/** STA.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        // Appelable avant qu'aucune reservation n'existe : c'est le propre
        // d'une methode de classe.
        System.out.println("Avant : " + Reservation.nombreEmises() + " reservation(s)");
        System.out.println("Capacite : " + Reservation.PLACES_MAX);

        Reservation ada = new Reservation("Ada Lovelace");
        Reservation alan = new Reservation("Alan Turing");
        Reservation grace = new Reservation("Grace Hopper");

        System.out.println(ada);
        System.out.println(alan);
        System.out.println(grace);

        System.out.println("Apres : " + Reservation.nombreEmises() + " reservation(s)");
        System.out.println("Reste de la place : " + Reservation.resteDeLaPlace());
    }
}
