package be.ephec.java.poo.e05;

import java.util.Scanner;

/**
 * POO.5 — Conversion depuis une base quelconque vers la base 10.
 *
 * A COMPLETER.
 *
 * Seule la methode enBase10 est testee automatiquement. C'est delibere :
 * la logique est separee du dialogue avec l'utilisateur, ce qui la retourne
 * verifiable. Le main, lui, ne fait que dialoguer.
 */
public class Base {

    /**
     * Convertit en base 10 un nombre ecrit dans une autre base.
     *
     * Exemples : enBase10("FF", 16) retourne 255
     *            enBase10("1010", 2) retourne 10
     *
     * Indice : Integer.parseInt accepte un second parametre, la base.
     *
     * @param nombre le nombre ecrit dans la base donnee
     * @param base   la base d'ecriture, entre 2 et 36
     * @return la valeur du nombre, en base 10
     */
    public static int enBase10(String nombre, int base) {
        throw new UnsupportedOperationException("enBase10 n'est pas encore implementee");
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // TODO : annoncez d'abord ce que le programme fait, avec un exemple —
        //        sans quoi l'utilisateur voit surgir une question sans savoir
        //        ce qu'on attend de lui.
        //
        //        Puis BOUCLEZ : demandez un nombre et une base, appelez
        //        enBase10, affichez le resultat, et recommencez jusqu'a ce que
        //        l'utilisateur entre -1 comme nombre.
        //
        //        UN PIEGE VOUS ATTEND. Melanger nextInt et nextLine dans une
        //        boucle fait sauter une question sur deux : nextInt laisse la
        //        fin de ligne dans le tampon, et le nextLine suivant la
        //        ramasse. Essayez, constatez, puis cherchez comment l'eviter
        //        plutot que le rattraper.

        scanner.close();
    }
}
