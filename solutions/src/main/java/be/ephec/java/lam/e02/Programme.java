package be.ephec.java.lam.e02;

/** LAM.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        int[] tableau = {1, 4, -9, 5, -7, -3, 2};

        System.out.println("Les positifs: " + Affichage.selectionner(tableau, e -> e > 0));

        // L'interface du JDK qui fait le meme travail que Filtrage est
        // java.util.function.IntPredicate : elle declare exactement
        // boolean test(int). LAM.3 s'en sert, et Filtrage disparait.
    }
}
