package be.ephec.java.enu.e03;

import java.util.StringJoiner;

/**
 * ENU.3 — CORRIGE.
 *
 * POURQUOI UN StringJoiner PLUTOT QU'UNE BOUCLE D'AFFICHAGE.
 *
 * Afficher une liste separee par des virgules pose toujours la meme
 * question : ou mettre le separateur sans en laisser un a la fin ? On
 * s'en tire d'ordinaire par un test sur l'indice, qui encombre la
 * boucle.
 *
 * StringJoiner repond une fois pour toutes : on lui donne le separateur,
 * on ajoute les elements, et il place les virgules ENTRE eux. Il connait
 * aussi un prefixe et un suffixe, si l'on veut des crochets.
 *
 * Le gain n'est pas la longueur du code — c'est qu'il n'y a plus de
 * condition a lire, donc plus d'endroit ou se tromper.
 */
public class Programme {

    public static void main(String[] args) {
        Deck jeu = new Deck();

        System.out.println("--- jeu neuf ---");
        System.out.println(enTexte(jeu));

        jeu.shuffle();

        System.out.println();
        System.out.println("--- apres melange ---");
        System.out.println(enTexte(jeu));
    }

    /** Les 52 cartes a la suite, separees par des virgules. */
    private static String enTexte(Deck jeu) {
        StringJoiner cartes = new StringJoiner(", ");
        for (int i = 0; i < Deck.NOMBRE_DE_CARTES; i++) {
            cartes.add(jeu.carteA(i).toString());
        }
        return cartes.toString();
    }
}
