package be.ephec.java.lam.e02;

/**
 * LAM.2 — CORRIGE.
 *
 * La methode ne connait pas le critere : elle le recoit. Elle fonctionne donc
 * avec des filtres qui n'existaient pas quand elle a ete ecrite — le test lui
 * en passe quatre differents.
 */
public class Affichage {

    public static String selectionner(int[] tableau, Filtrage filtre) {
        StringBuilder retenus = new StringBuilder();

        for (int valeur : tableau) {
            if (filtre.test(valeur)) {
                if (retenus.length() > 0) {
                    retenus.append(' ');
                }
                retenus.append(valeur);
            }
        }
        return retenus.toString();
    }
}
