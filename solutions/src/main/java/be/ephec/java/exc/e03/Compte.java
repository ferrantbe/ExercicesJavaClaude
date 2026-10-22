package be.ephec.java.exc.e03;

import java.math.BigInteger;

/**
 * EXC.3 — CORRIGE.
 *
 * Trois choses meritent d'etre relevees.
 *
 * 1. La validation est dans le CONSTRUCTEUR. Un objet mal forme ne peut donc
 *    pas exister : il n'y a aucun moment ou un Compte porterait un numero
 *    invalide. C'est plus sur qu'une methode valider() que l'appelant
 *    pourrait oublier d'appeler.
 *
 * 2. Les trois controles s'enchainent dans un ordre precis, et chacun sort
 *    par une exception. Pas de else, pas de drapeau : quand une verification
 *    echoue, la suite n'a plus de sens.
 *
 * 3. Chaque message dit ce qui etait attendu ET ce qui a ete recu. « IBAN
 *    invalide » n'aiderait personne a corriger sa saisie. Voir CC-ERR.4.
 */
public class Compte {

    public static final int LONGUEUR_IBAN = 16;

    private static final int RESTE_ATTENDU = 1;
    private static final BigInteger QUATRE_VINGT_DIX_SEPT = BigInteger.valueOf(97);

    private final String numero;
    private double solde = 0;

    public Compte(String numero) throws IbanInvalideException {
        String propre = numero.replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

        if (propre.length() != LONGUEUR_IBAN) {
            throw new IbanLongueurException("L'IBAN doit contenir " + LONGUEUR_IBAN
                    + " caracteres, en contient " + propre.length());
        }
        if (!propre.startsWith("BE")) {
            throw new IbanPrefixeException("L'IBAN doit commencer par BE, commence par "
                    + propre.substring(0, 2));
        }
        int reste = resteModulo97(propre);
        if (reste != RESTE_ATTENDU) {
            throw new IbanModuloException("Le controle modulo 97 est incorrect : "
                    + reste + " au lieu de " + RESTE_ATTENDU);
        }

        this.numero = propre;
    }

    public String getNumero() {
        return numero;
    }

    public double getSolde() {
        return solde;
    }

    public void ajoute(double montant) {
        solde += montant;
    }

    public double retire(double montant) {
        double retire = Math.min(montant, solde);
        solde -= retire;
        return retire;
    }

    /**
     * Le nombre obtenu depasse tres largement un long : un IBAN belge donne
     * dix-huit chiffres ou plus, la ou un long s'arrete a dix-neuf chiffres
     * et un int a dix. BigInteger n'a pas cette limite.
     */
    public static int resteModulo97(String numero) {
        String propre = numero.replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

        // Les quatre premiers caracteres passent a la fin.
        String deplace = propre.substring(4) + propre.substring(0, 4);

        StringBuilder chiffres = new StringBuilder();
        for (char caractere : deplace.toCharArray()) {
            if (Character.isDigit(caractere)) {
                chiffres.append(caractere);
            } else {
                // A vaut 10, B vaut 11, et ainsi de suite.
                chiffres.append(caractere - 'A' + 10);
            }
        }

        return new BigInteger(chiffres.toString()).mod(QUATRE_VINGT_DIX_SEPT).intValue();
    }
}
