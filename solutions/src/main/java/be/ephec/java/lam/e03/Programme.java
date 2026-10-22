package be.ephec.java.lam.e03;

/** LAM.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        int[] tableau = {1, 4, -9, 5, -7, -3, 2};

        System.out.println(Affichage.rapport(tableau));

        // Les deux ecritures sont interchangeables : meme resultat, meme type.
        System.out.println(Affichage.selectionner(tableau, e -> e > 0));
        System.out.println(Affichage.selectionner(tableau, Affichage::estPositif));
    }
}
