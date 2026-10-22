package be.ephec.java.demo.jun;

/**
 * DEMO JUN — etat final de la demonstration du cours.
 *
 * Cette classe a ete construite en direct, test apres test. Elle a
 * commence par un simple  return 1;  et chaque ligne qu'elle contient
 * aujourd'hui a ete ajoutee parce qu'un test l'exigeait.
 *
 * Le point a retenir : la regle soustractive de la ligne finale — IV vaut
 * 4 et non 6 — n'a pas ete prevue. C'est en cherchant quoi tester qu'elle
 * est apparue.
 *
 * La classe de test construite en meme temps se trouve sous
 * demos/src/test/java, dans le meme package. Relisez-la : l'ordre de ses
 * methodes raconte l'ordre dans lequel le code est ne.
 */
public class Demo {

    public static void main(String[] args) {
        for (String chiffre : new String[]{"I", "V", "II", "IV", "IX", "MCMXCIV"}) {
            System.out.printf("%-8s -> %d%n", chiffre, Romain.enChiffres(chiffre));
        }
    }
}
