package be.ephec.java.exc.e04;

import java.util.Scanner;

/** EXC.4 — A COMPLETER. */
public class Programme {

    private static final int QUITTER = -6;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // TODO : annoncez d'abord a l'utilisateur ce que le programme fait
        //        et ce qui peut mal tourner — sans quoi il voit surgir deux
        //        questions sans savoir ce qu'on attend de lui.
        //
        //        Demandez la taille UNE SEULE FOIS, puis BOUCLEZ sur la
        //        position jusqu'a QUITTER, en affichant a chaque tour le
        //        compte-rendu retourne par placerDouze. Rappelez les positions
        //        valides et la facon de sortir.
        //
        //        La boucle n'est pas un ornement : c'est elle qui permet
        //        d'essayer plusieurs positions dans le meme tableau, et donc
        //        de voir ou sont les limites.
        //
        //        AVANT d'ecrire placerDouze, ecrivez une premiere version SANS
        //        aucun try : donnez une taille negative, puis une position
        //        hors limites, et lisez les deux messages d'erreur. C'est en
        //        les lisant que vous saurez quelles exceptions attraper.
        //        Vous constaterez aussi que le programme s'arrete net — la
        //        boucle ne repart pas. C'est ce que les try vont changer.

        scanner.close();
    }
}
