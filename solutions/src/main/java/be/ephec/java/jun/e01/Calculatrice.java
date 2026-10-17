package be.ephec.java.jun.e01;

/**
 * JUN.1 — CORRIGE.
 *
 * Le code est trivial, et c'est voulu : l'exercice ne porte pas sur la
 * difficulte du calcul, mais sur la lecture d'un test comme specification.
 *
 * Deux choses etaient a deduire de CalculatriceTest, et de nulle part
 * ailleurs :
 *
 *   la division entiere TRONQUE vers zero — 11 / 4 vaut 2, pas 3 ;
 *
 *   la division par zero doit LAISSER PASSER l'ArithmeticException. Le
 *   reflexe de retourner 0 ou d'attraper l'exception aurait fait echouer le
 *   test, et pour une bonne raison : retourner 0 ferait passer une erreur pour
 *   un resultat.
 */
public class Calculatrice {

    public int addition(int a, int b) {
        return a + b;
    }

    public int soustraction(int a, int b) {
        return a - b;
    }

    public int multiplication(int a, int b) {
        return a * b;
    }

    /**
     * Aucun test, aucun try : la JVM leve elle-meme l'ArithmeticException
     * quand b vaut zero, et c'est exactement ce que le test attend.
     *
     * Ajouter  if (b == 0) throw new ArithmeticException(...)  ne serait pas
     * faux, mais ce serait redondant.
     */
    public int division(int a, int b) {
        return a / b;
    }
}
