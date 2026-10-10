package be.ephec.java.lam.e01;

/**
 * LAM.1 — A COMPLETER.
 *
 * Une lambda est l'ecriture abregee d'une implementation d'interface
 * fonctionnelle. Ces trois lignes font exactement la meme chose :
 *
 *     new Calculateur() {                        // classe anonyme
 *         public int calcul(int n) { return n * n; }
 *     }
 *
 *     (int n) -> { return n * n; }               // lambda complete
 *
 *     n -> n * n                                 // lambda abregee
 *
 * On peut omettre le type du parametre, les parentheses s'il est unique, les
 * accolades et le return si le corps tient en une expression.
 */
public class Calculs {

    /** Applique le calculateur au nombre et rend le resultat. */
    public static int traite(int n, Calculateur calculateur) {
        throw new UnsupportedOperationException("traite n'est pas encore implementee");
    }

    /**
     * Rend un TABLEAU de calculateurs, dans cet ordre exact, defini a l'aide
     * d'expressions lambda :
     *
     *   0. le carre
     *   1. le double
     *   2. l'oppose
     *   3. la valeur inchangee
     *
     * Un tableau de calculateurs peut surprendre : on y range des
     * COMPORTEMENTS, comme on rangerait des nombres.
     */
    public static Calculateur[] calculateurs() {
        throw new UnsupportedOperationException("calculateurs n'est pas encore implementee");
    }

    /**
     * Applique tous les calculateurs au nombre et rend les resultats separes
     * par une espace : pour 3, "9 6 -3 3".
     */
    public static String tousLesCalculs(int n) {
        throw new UnsupportedOperationException("tousLesCalculs n'est pas encore implementee");
    }
}
