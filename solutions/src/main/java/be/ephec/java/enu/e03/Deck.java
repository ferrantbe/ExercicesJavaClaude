package be.ephec.java.enu.e03;

import java.util.Random;

/** ENU.3 — CORRIGE. */
public class Deck {

    public static final int NOMBRE_DE_CARTES = 52;

    private final Random hasard = new Random();
    private final Card[] cartes = new Card[NOMBRE_DE_CARTES];

    /**
     * values() retourne toutes les constantes de l'enum dans l'ordre de
     * declaration. Deux for-each imbriquees suffisent donc, et le nombre 52
     * n'apparait nulle part dans le calcul : il decoule de 4 x 13.
     */
    public Deck() {
        int position = 0;
        for (Color couleur : Color.values()) {
            for (Value valeur : Value.values()) {
                cartes[position] = new Card(valeur, couleur);
                position++;
            }
        }
    }

    public Card carteA(int position) {
        return cartes[position];
    }

    /**
     * Melange de Fisher-Yates. On parcourt le tableau de la fin vers le debut
     * et on echange chaque carte avec une carte tiree au hasard parmi celles
     * qui la precedent, elle comprise.
     *
     * Pourquoi nextInt(i + 1) et non nextInt(cartes.length) ? Parce que tirer
     * dans tout le tableau a chaque etape ne donne PAS un melange equitable :
     * certains ordres deviennent plus probables que d'autres. Le detail
     * depasse ce cours, mais la version ci-dessous est la bonne.
     */
    public void shuffle() {
        for (int i = cartes.length - 1; i > 0; i--) {
            int j = hasard.nextInt(i + 1);

            Card temporaire = cartes[i];
            cartes[i] = cartes[j];
            cartes[j] = temporaire;
        }
    }
}
