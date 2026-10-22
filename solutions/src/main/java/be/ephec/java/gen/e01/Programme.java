package be.ephec.java.gen.e01;

/** GEN.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Paire<Integer> notes = new Paire<>(12, 16);
        Paire<Double> mesures = new Paire<>(1.5, 2.5);

        System.out.println(notes);
        System.out.println(mesures);

        // Aucun transtypage : getPremier() retourne deja un Integer.
        System.out.println("Somme des notes : " + (notes.getPremier() + notes.getSecond()));

        // La ligne suivante ne compile pas, et c'est le service rendu :
        // Paire<Integer> melange = new Paire<>(12, "seize");
    }
}
