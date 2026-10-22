package be.ephec.java.tmp.e02;

import java.time.LocalDate;

/** TMP.2 — CORRIGE du programme fourni. */
public class Programme {

    public static void main(String[] args) {
        LocalDate rendezVous = LocalDate.of(2027, 1, 19);

        System.out.println("Rendez-vous initial : " + rendezVous);

        // La ligne fautive etait : rendezVous.plusWeeks(1);
        // Le resultat doit etre recupere.
        rendezVous = Agenda.dansUneSemaine(rendezVous);

        System.out.println("Apres report d'une semaine : " + rendezVous);
    }
}
