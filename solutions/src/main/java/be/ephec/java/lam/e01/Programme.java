package be.ephec.java.lam.e01;

/** LAM.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        for (int n : new int[]{-2, 0, 3, 7}) {
            System.out.printf("%3d  ->  %s%n", n, Calculs.tousLesCalculs(n));
        }

        // Une lambda ecrite a la volee, qui n'existait pas dans le tableau :
        System.out.println("cube de 3 : " + Calculs.traite(3, n -> n * n * n));
    }
}
