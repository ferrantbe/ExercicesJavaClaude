package be.ephec.java.exc.e03;

/**
 * EXC.3 — A COMPLETER.
 *
 * Le compte d'EXC.2, muni d'un numero de compte verifie a la construction.
 */
public class Compte {

    /** Longueur d'un IBAN belge, une fois les espaces retires. */
    public static final int LONGUEUR_IBAN = 16;

    // TODO : declarez le solde et le numero de compte.
    //        Le numero ne change jamais : final.

    /**
     * Construit un compte a partir de son numero.
     *
     * Le numero est verifie en trois temps, DANS CET ORDRE :
     *   1. une fois les caracteres non alphanumeriques retires, il fait
     *      exactement LONGUEUR_IBAN caracteres — sinon IbanLongueurException ;
     *   2. il commence par "BE" — sinon IbanPrefixeException ;
     *   3. le controle modulo 97 donne 1 — sinon IbanModuloException.
     *
     * L'ordre compte : le test verifie qu'un numero trop court leve bien
     * l'exception de longueur, meme si son prefixe est aussi mauvais.
     *
     * Le numero est memorise sous sa forme nettoyee, sans espaces.
     *
     * Les MESSAGES sont imposes, au caractere pres. Une exception dont le
     * message ne dit ni ce qui etait attendu ni ce qui a ete recu ne sert a
     * personne — voir CC-ERR.4 du memento Clean Code.
     *
     *     "L'IBAN doit contenir 16 caracteres, en contient 12"
     *     "L'IBAN doit commencer par BE, commence par FR"
     *     "Le controle modulo 97 est incorrect : 28 au lieu de 1"
     */
    public Compte(String numero) throws IbanInvalideException {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public String getNumero() {
        throw new UnsupportedOperationException("getNumero n'est pas encore implementee");
    }

    public double getSolde() {
        throw new UnsupportedOperationException("getSolde n'est pas encore implementee");
    }

    public void ajoute(double montant) {
        throw new UnsupportedOperationException("ajoute n'est pas encore implementee");
    }

    public double retire(double montant) {
        throw new UnsupportedOperationException("retire n'est pas encore implementee");
    }

    /**
     * Rend le reste de la division par 97, selon l'algorithme de controle
     * des IBAN :
     *
     *   1. retirer tout ce qui n'est ni lettre ni chiffre ;
     *   2. deplacer les quatre premiers caracteres a la fin ;
     *   3. passer en majuscules ;
     *   4. remplacer chaque lettre par sa position dans l'alphabet plus 9
     *      (A vaut 10, B vaut 11, ... Z vaut 35) ;
     *   5. prendre le reste de la division du nombre obtenu par 97.
     *
     * Le nombre depasse largement un long : utilisez java.math.BigInteger.
     *
     * Pour un IBAN valide, ce reste vaut 1.
     */
    public static int resteModulo97(String numero) {
        throw new UnsupportedOperationException("resteModulo97 n'est pas encore implementee");
    }
}
