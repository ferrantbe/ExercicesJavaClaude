package be.ephec.java.enu.e04;

/** ENU.4 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Student[] etudiants = {
                new Student("Lovelace", 18),
                new Student("Turing", 10),
                new Student("Hopper", 9),
                new Student("Babbage", 14)
        };

        for (Student etudiant : etudiants) {
            System.out.printf("%-12s %2d  %s%n",
                    etudiant.nom(), etudiant.cote(),
                    etudiant.passe() ? "reussi" : "echec");
        }
    }
}
