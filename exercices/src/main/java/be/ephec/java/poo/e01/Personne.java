package be.ephec.java.poo.e01;

/**
 * POO.1 — Une premiere classe, sans encapsulation.
 *
 * A COMPLETER.
 *
 * Les quatre champs doivent etre declares public pour cet exercice-ci.
 * C'est volontairement une mauvaise pratique : POO.2 y reviendra.
 */
public class Personne {

    // TODO : declarez ici les quatre champs public demandes par l'enonce.
    //        Noms exacts attendus par les tests :
    //          nom              (String)
    //          prenom           (String)
    //          anneeDeNaissance (int)
    //          age              (int)

    /**
     * Calcule l'age de la personne a l'annee donnee.
     * Une simple soustraction, sans traitement particulier.
     *
     * @param annee l'annee a laquelle on veut connaitre l'age
     * @return annee moins l'annee de naissance
     */
    public int computeAge(int annee) {
        throw new UnsupportedOperationException("computeAge n'est pas encore implementee");
    }

    /** Affiche les proprietes de la personne sur la console. Format libre. */
    public void display() {
        throw new UnsupportedOperationException("display n'est pas encore implementee");
    }
}
