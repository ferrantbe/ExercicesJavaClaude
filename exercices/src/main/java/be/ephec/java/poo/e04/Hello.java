package be.ephec.java.poo.e04;

import java.util.Scanner;

/**
 * POO.4 — Saisie au clavier avec Scanner, et passage de parametres.
 *
 * A COMPLETER.
 *
 * Cet exercice n'a pas de classe de test : un programme pilote au clavier
 * ne s'automatise pas simplement. Vous le verifiez en l'executant.
 */
public class Hello {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // TODO : annoncez d'abord ce que le programme fait, puis demandez le nom, le prenom et l'annee de naissance,
        //        creez une Personne, renseignez-la, puis appelez display().

        // TODO : declarez ensuite un int, appelez modifie(...) en lui passant
        //        ce int et votre Personne, puis reaffichez les deux.
        //        Qu'est-ce qui a change ? Qu'est-ce qui n'a pas change ?

        scanner.close();
    }

    /**
     * Cette methode modifie ses deux parametres.
     * Observez ce qui subsiste de ces modifications apres son retour.
     */
    private static void modifie(int nombre, Personne personne) {
        nombre = 7;
        personne.setNom("Terieur");
        personne.setPrenom("Alex");
    }
}
