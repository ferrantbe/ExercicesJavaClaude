package be.ephec.java.lam.e01;

/**
 * LAM.1 — CORRIGE.
 *
 * Le tableau de calculateurs est le point de l'exercice. On y range des
 * COMPORTEMENTS comme on rangerait des nombres, et le programme les applique
 * sans savoir ce qu'ils font.
 *
 * C'est exactement ce que faisait ITF.1 avec ses classes Addition et
 * Multiplication. La difference tient a l'ecriture : quatre lignes ici, contre
 * quatre fichiers la-bas.
 *
 * La lambda n'apporte aucune capacite nouvelle. Elle rend seulement praticable
 * une chose qui etait deja possible mais trop couteuse a ecrire — et ce qui
 * devient praticable finit par etre fait.
 */
public class Calculs {

    public static int traite(int n, Calculateur calculateur) {
        return calculateur.calcul(n);
    }

    public static Calculateur[] calculateurs() {
        return new Calculateur[]{
                n -> n * n,
                n -> 2 * n,
                n -> -n,
                n -> n
        };
    }

    public static String tousLesCalculs(int n) {
        StringBuilder resultats = new StringBuilder();
        for (Calculateur calculateur : calculateurs()) {
            if (resultats.length() > 0) {
                resultats.append(' ');
            }
            resultats.append(traite(n, calculateur));
        }
        return resultats.toString();
    }
}
