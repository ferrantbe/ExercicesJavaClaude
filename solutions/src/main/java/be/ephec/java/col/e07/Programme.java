package be.ephec.java.col.e07;

/** COL.7 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Inscriptions inscriptions = new Inscriptions();

        inscriptions.inscrire("Turing", "Java");
        inscriptions.inscrire("Lovelace", "Java");
        inscriptions.inscrire("Lovelace", "Algebre");
        inscriptions.inscrire("Lovelace", "Java");      // sans effet : deja inscrite
        inscriptions.inscrire("Hopper", "Compilation");

        System.out.println(inscriptions.rapport());

        System.out.println("\nCours de Babbage : " + inscriptions.coursDe("Babbage")
                + "   (un ensemble vide, pas null)");
    }
}
