package be.ephec.java.demo.enu.slides;

import java.util.Random;
import java.util.StringJoiner;

/**
 * Slides « Tirer un nombre au hasard » et « Assembler un String avec un
 * separateur » (ENU, section 6).
 *
 * Le jeu de cartes de la slide est l'exercice ENU.3 : ici, des des et des
 * mots. Le Random recoit une graine, 42, pour que le tirage soit le meme a
 * chaque lancement ; sans graine, il change a chaque fois.
 */
public class HasardEtStringJoiner {

    public static void main(String[] args) {
        Random hasard = new Random(42);
        String[] mots = { "pique", "coeur", "carreau", "trefle" };

        StringJoiner des = new StringJoiner(", ");
        for (int k = 0; k < 5; k++) {
            int de = hasard.nextInt(6) + 1;            // 1 a 6
            des.add(String.valueOf(de));
        }
        System.out.println(des);

        int rang = hasard.nextInt(mots.length);        // 0 a mots.length - 1
        System.out.println("Tire : " + mots[rang]);

        StringJoiner texte = new StringJoiner(", ");
        for (String mot : mots) {
            texte.add(mot);
        }
        System.out.println(texte);
    }

    /* Sortie attendue :
    3, 4, 1, 3, 1
    Tire : trefle
    pique, coeur, carreau, trefle
    */
}
